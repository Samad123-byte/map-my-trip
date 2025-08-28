const express = require("express");
const axios = require("axios");
const KnowledgeBase = require("../models/KnowledgeBase");
const Feedback = require("../models/Feedback");
require("dotenv").config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const ADDITIONAL_INFO_URL = process.env.ADDITIONAL_INFO_URL || "https://northernpakistan-travel-api.example.com/info";
const USE_EXTERNAL_INFO = process.env.USE_EXTERNAL_INFO === "true";

// Pakistan Travel Website context for AI
const WEBSITE_CONTEXT = `
You are a helpful AI assistant for a travel website specializing in Pakistan travel, particularly the northern areas.
The website offers:
- Customized travel packages to northern Pakistan destinations
- Booking services for accommodations and activities
- Information about destinations, including Hunza, Skardu, Swat, Fairy Meadows, and more
- Practical travel advice for visitors to Pakistan

Only answer questions related to travel in Pakistan, with a focus on the northern areas. If asked about other travel destinations or unrelated topics, politely explain that you specialize in Pakistan travel information.

Always be polite, helpful, and provide accurate information based on the knowledge base. Avoid giving incorrect information or making up facts.

Answer as if you're an expert on Pakistan travel with extensive knowledge of the region's geography, culture, accommodations, and activities.

Be conversational and friendly. Give concise but complete answers that showcase your expertise on Pakistan travel.

When information is sourced from the web, make sure to synthesize it properly and avoid copying directly. Only use reliable information related to Pakistan travel.
`;

// Simplified language code mappings - keeping only specified languages
const LANGUAGE_NAMES = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French', 
  'de': 'German',
  'zh': 'Chinese',
   'ur': 'Urdu', 
  
  'en-US': 'English',
  'es-ES': 'Spanish',
  'fr-FR': 'French',
  'de-DE': 'German',
  'zh-CN': 'Chinese',
  'zh-TW': 'Chinese',
  'ur-PK': 'Urdu' 
};

// Enhanced semantic search function with better word embedding simulation
function calculateRelevance(entry, query) {
    // Normalize text for better matching
    const normalizedQuery = query.toLowerCase().trim();
    const normalizedQuestion = entry.question.toLowerCase().trim();
    const normalizedAnswer = entry.answer.toLowerCase().trim();
    
    // Create word sets for semantic matching
    const queryWords = new Set(normalizedQuery.split(/\s+/).filter(word => word.length > 2));
    const questionWords = new Set(normalizedQuestion.split(/\s+/).filter(word => word.length > 2));
    const answerWords = new Set(normalizedAnswer.split(/\s+/).filter(word => word.length > 2));
    const tagWords = new Set(entry.tags.map(tag => tag.toLowerCase().trim()));
    
    let score = 0;
    
    // Check for exact or substring matches with high weights
    if (normalizedQuestion.includes(normalizedQuery)) {
        // Weight higher if it's at the beginning of the question
        score += normalizedQuestion.startsWith(normalizedQuery) ? 20 : 15;
    }
    
    if (normalizedAnswer.includes(normalizedQuery)) {
        score += 8;
    }
    
    // Perfect match has maximum priority
    if (normalizedQuestion === normalizedQuery) {
        score += 30;
    }
    
    // Calculate word overlap coefficient for semantic similarity
    const queryArray = Array.from(queryWords);
    
    // Semantic matching with question text
    for (const qWord of queryArray) {
        // Direct word matches in question
        if (questionWords.has(qWord)) {
            score += 3; 
        }
        
        // Check for partial word matches in question
        for (const word of questionWords) {
            // Skip already counted exact matches
            if (word === qWord) continue;
            
            // Check for partial matches with different weights based on match quality
            if (word.includes(qWord) && qWord.length > 3) {
                score += 1.5;
            } else if (qWord.includes(word) && word.length > 3) {
                score += 1;
            } else if (getLevenshteinDistance(word, qWord) <= 2 && qWord.length > 3) {
                // Similar words with small edit distance
                score += 1;
            }
        }
        
        // Direct word matches in answer
        if (answerWords.has(qWord)) {
            score += 1;
        }
        
        // Tag matching (highest weight for category matches)
        if (tagWords.has(qWord)) {
            score += 3;
        }
        
        // Category matching (important for domain context)
        if (entry.category.toLowerCase().includes(qWord)) {
            score += 2.5;
        }
    }
    
    // Phrase matching for multi-word semantic understanding
    const queryPhrases = extractPhrases(normalizedQuery);
    const questionPhrases = extractPhrases(normalizedQuestion);
    
    // Weight multi-word phrase matches higher
    for (const phrase of queryPhrases) {
        if (phrase.split(' ').length < 2) continue; // Skip single words
        
        if (normalizedQuestion.includes(phrase)) {
            score += 3 * phrase.split(' ').length;
        }
        
        if (normalizedAnswer.includes(phrase)) {
            score += 2 * phrase.split(' ').length;
        }
    }
    
    // Question phrases found in query
    for (const phrase of questionPhrases) {
        if (phrase.split(' ').length < 2) continue; // Skip single words
        
        if (normalizedQuery.includes(phrase)) {
            score += 2 * phrase.split(' ').length;
        }
    }
    
    return score;
}

// Helper function for semantic similarity - Levenshtein distance calculation
function getLevenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    
    // Create distance matrix
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize first row and column
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,      // deletion
                dp[i][j - 1] + 1,      // insertion
                dp[i - 1][j - 1] + cost  // substitution
            );
        }
    }
    
    return dp[m][n];
}

// Extract meaningful phrases for semantic matching
function extractPhrases(text) {
    const words = text.split(/\s+/);
    const phrases = [];
    
    // Get phrases of different lengths for better matching
    for (let i = 0; i < words.length; i++) {
        for (let len = 2; len <= 4 && i + len <= words.length; len++) {
            phrases.push(words.slice(i, i + len).join(' '));
        }
    }
    
    return phrases;
}

// Enhanced common fallback responses
const fallbackResponses = {
  "greeting": {
    "en": "Hello! Welcome to Map My Trip Pakistan Travel. How can I help you plan your journey through the beautiful northern areas of Pakistan today?",
    "es": "¡Hola! Bienvenido a Map My Trip Pakistan Travel. ¿Cómo puedo ayudarte a planificar tu viaje por las hermosas áreas del norte de Pakistán hoy?",
    "fr": "Bonjour! Bienvenue sur Map My Trip Pakistan Travel. Comment puis-je vous aider à planifier votre voyage dans les magnifiques régions du nord du Pakistan aujourd'hui?",
    "de": "Hallo! Willkommen bei Map My Trip Pakistan Travel. Wie kann ich Ihnen heute bei der Planung Ihrer Reise durch die wunderschönen nördlichen Gebiete Pakistans helfen?",
    "zh": "你好！欢迎来到Map My Trip巴基斯坦旅行。今天我如何帮助您规划穿越巴基斯坦美丽北部地区的旅程？",
    "ur": "السلام علیکم! Map My Trip پاکستان ٹریول میں خوش آمدید۔ آج میں آپ کو پاکستان کے خوبصورت شمالی علاقوں کے سفر کی منصوبہ بندی میں کیسے مدد کر سکتا ہوں؟"
  },
  "thanks": {
    "en": "You're welcome! I'm happy to help with your Pakistan travel plans. Is there anything else you'd like to know about destinations, accommodations, or activities?",
    "es": "¡De nada! Me alegra ayudarte con tus planes de viaje a Pakistán. ¿Hay algo más que te gustaría saber sobre destinos, alojamientos o actividades?",
    "fr": "De rien! Je suis heureux de vous aider avec vos projets de voyage au Pakistan. Y a-t-il autre chose que vous aimeriez savoir sur les destinations, l'hébergement ou les activités?",
    "de": "Gern geschehen! Ich helfe gerne bei Ihren Pakistan-Reiseplänen. Gibt es noch etwas, was Sie über Reiseziele, Unterkünfte oder Aktivitäten wissen möchten?",
    "zh": "不客气！我很高兴能帮助您制定巴基斯坦旅行计划。您还想了解目的地、住宿或活动的其他信息吗？",
    "ur": "آپ کا شکریہ! میں آپ کے پاکستان کے سفری منصوبوں میں مدد کرنے میں خوش ہوں۔ کیا آپ مقامات، رہائش، یا سرگرمیوں کے بارے میں کچھ اور جاننا چاہتے ہیں؟"
  },
  "goodbye": {
    "en": "Thank you for chatting with us about Pakistan travel. Feel free to return anytime you need more information for planning your trip. Safe travels!",
    "es": "Gracias por chatear con nosotros sobre viajes a Pakistán. Siéntete libre de volver cuando necesites más información para planificar tu viaje. ¡Buen viaje!",
    "fr": "Merci d'avoir discuté avec nous des voyages au Pakistan. N'hésitez pas à revenir quand vous avez besoin de plus d'informations pour planifier votre voyage. Bon voyage!",
    "de": "Vielen Dank, dass Sie mit uns über Pakistan-Reisen gesprochen haben. Kommen Sie gerne jederzeit zurück, wenn Sie weitere Informationen für die Planung Ihrer Reise benötigen. Gute Reise!",
    "zh": "感谢您与我们聊天关于巴基斯坦旅行。当您需要更多信息来规划您的旅行时，请随时回来。祝您旅途愉快！",
    "ur": "پاکستان کے سفر کے بارے میں ہم سے بات کرنے کا شکریہ۔ جب بھی آپ کو اپنے سفر کی منصوبہ بندی کے لیے مزید معلومات کی ضرورت ہو تو بے جھجک واپس آئیں۔ محفوظ سفر!"
  },
  "help": {
    "en": "I can assist you with information about popular destinations in northern Pakistan like Hunza, Skardu, and Swat, booking procedures, transportation options, travel tips, itinerary planning, and more. What specific information are you looking for?",
    "es": "Puedo ayudarte con información sobre destinos populares en el norte de Pakistán como Hunza, Skardu y Swat, procedimientos de reserva, opciones de transporte, consejos de viaje, planificación de itinerarios y más. ¿Qué información específica estás buscando?",
    "fr": "Je peux vous aider avec des informations sur les destinations populaires du nord du Pakistan comme Hunza, Skardu et Swat, les procédures de réservation, les options de transport, les conseils de voyage, la planification d'itinéraires et plus encore. Quelles informations spécifiques recherchez-vous?",
    "de": "Ich kann Ihnen mit Informationen über beliebte Reiseziele in Nordpakistan wie Hunza, Skardu und Swat, Buchungsverfahren, Transportmöglichkeiten, Reisetipps, Reiseplanung und mehr helfen. Nach welchen spezifischen Informationen suchen Sie?",
    "zh": "我可以帮助您了解巴基斯坦北部热门目的地如亨扎、斯卡杜和斯瓦特的信息，预订程序，交通选择，旅行提示，行程规划等等。您在寻找什么具体信息？",
    "ur": "میں آپ کو شمالی پاکستان کی مقبول منزلوں جیسے ہنزہ، سکردو، اور سوات کے بارے میں معلومات، بکنگ کے طریقے، نقل و حمل کے اختیارات، سفری تجاویز، سفری منصوبہ بندی، اور مزید بہت کچھ میں مدد کر سکتا ہوں۔ آپ کون سی مخصوص معلومات تلاش کر رہے ہیں؟"
  },
  "contact": {
    "en": "You can reach our customer support team at support@pakistantravel.example.com or call +92-123-4567890. Our office hours are Monday to Friday, 9 AM to 6 PM Pakistan Standard Time.",
    "es": "Puedes contactar a nuestro equipo de atención al cliente en support@pakistantravel.example.com o llamar al +92-123-4567890. Nuestro horario de oficina es de lunes a viernes, de 9 AM a 6 PM, hora estándar de Pakistán.",
    "fr": "Vous pouvez contacter notre équipe de support client à support@pakistantravel.example.com ou appeler le +92-123-4567890. Nos heures de bureau sont du lundi au vendredi, de 9h à 18h, heure standard du Pakistan.",
    "de": "Sie können unser Kundensupport-Team unter support@pakistantravel.example.com erreichen oder +92-123-4567890 anrufen. Unsere Bürozeiten sind Montag bis Freitag, 9:00 bis 18:00 Uhr Pakistan-Standardzeit.",
    "zh": "您可以通过support@pakistantravel.example.com联系我们的客户支持团队，或致电+92-123-4567890。我们的办公时间是周一至周五，巴基斯坦标准时间上午9点至下午6点。",
    "ur": "آپ ہماری کسٹمر سپورٹ ٹیم سے support@pakistantravel.example.com پر رابطہ کر سکتے ہیں یا +92-123-4567890 پر کال کر سکتے ہیں۔ ہمارے دفتری اوقات پیر سے جمعہ، صبح 9 بجے سے شام 6 بجے پاکستان معیاری وقت ہیں۔"
  }
};

// Update the classifier function to handle the new response format
function classifyBasicIntent(message) {
    const text = message.toLowerCase().trim();
    
    if (text.match(/^(hi|hello|hey|greetings|howdy|hola|namaste|salam|assalam|good morning|good afternoon|good evening)/)) {
        return "greeting";
    }
    
    if (text.match(/^(thank|thanks|thx|ty|thank you|appreciated|grateful)/)) {
        return "thanks";
    }
    
    if (text.match(/^(bye|goodbye|see you|farewell|take care|cya|adios|until next time)/)) {
        return "goodbye";
    }
    
    if (text.match(/^(help|assist|support|what can you do|how can you help|what do you do|capabilities)/)) {
        return "help";
    }
    
    if (text.match(/^(contact|email|phone|call|reach|get in touch|customer service|support number|talk to human)/)) {
        return "contact";
    }
    
    return null;
}

// Enhanced helper function to translate text using Gemini API with better error handling
async function translateText(text, fromLanguage, toLanguage) {
    try {
        // Normalize language codes to handle variations
        const normalizedFrom = fromLanguage.split('-')[0].toLowerCase();
        const normalizedTo = toLanguage.split('-')[0].toLowerCase();
        
        // Check if the languages are supported
        const fromLanguageName = LANGUAGE_NAMES[normalizedFrom] || 'English';
        const toLanguageName = LANGUAGE_NAMES[normalizedTo] || 'English';
        
        console.log(`Translating from ${fromLanguageName} to ${toLanguageName}: "${text.substring(0, 50)}..."`);
        
        // Add retries for translation with exponential backoff
        let retries = 3;
        let translatedText = text;
        
        while (retries > 0) {
            try {
                const translationResponse = await axios.post(GEMINI_URL, {
                    contents: [{
                        parts: [{
                            text: `Translate the following text from ${fromLanguageName} to ${toLanguageName}. 
                            Only provide the translation, no additional text or explanations:
                            
                            "${text}"`
                        }]
                    }]
                }, {
                    headers: { "Content-Type": "application/json" },
                    timeout: 15000 // 15 second timeout for larger texts
                });
                
                translatedText = translationResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || text;
                // Clean up any quotation marks that might be in the translation
                translatedText = translatedText.replace(/^["']|["']$/g, '').trim();
                
                // Verify translation quality - check if translation is too short or contains error messages
                if (translatedText.length < text.length * 0.2 && text.length > 50) {
                    console.warn("Translation suspiciously short, retrying...");
                    retries--;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                
                // If we got a valid response, break the retry loop
                break;
            } catch (err) {
                console.error(`Translation retry ${3-retries+1} failed:`, err.message);
                retries--;
                // Wait before retrying with exponential backoff
                await new Promise(resolve => setTimeout(resolve, (3-retries) * 1500));
            }
        }
        
        return translatedText;
    } catch (error) {
        console.error("Translation error:", error.message);
        // If translation fails, return the original text
        return text;
    }
}

// Function to get additional information from knowledge repositories
async function getAdditionalInfo(query) {
    if (!USE_EXTERNAL_INFO) {
        console.log("External information source not configured, skipping");
        return null;
    }
    
    try {
        console.log(`Looking for additional information about: "${query}"`);
        
        // Option 1: Try to access your own information API
        if (ADDITIONAL_INFO_URL) {
            const response = await axios.get(ADDITIONAL_INFO_URL, {
                params: {
                    q: `${query}`,
                    limit: 3
                },
                timeout: 5000
            }).catch(e => {
                console.log("Could not reach additional info endpoint:", e.message);
                return { data: null };
            });
            
            if (response.data && response.data.results) {
                return response.data.results;
            }
        }
        
        // Option 2: Use a collection of pre-defined travel information
        // This is a fallback if you don't have an API
        const travelInfo = [
            {
                "topic": "hunza",
                "title": "Hunza Valley Travel Guide",
                "snippet": "Hunza Valley is known for its spectacular natural scenery and the warmth of its inhabitants. Famous landmarks include Baltit Fort, Altit Fort, and Attabad Lake with its turquoise waters. Best visited May-October.",
                "category": "destinations"
            },
            {
                "topic": "skardu",
                "title": "Exploring Skardu and Baltistan",
                "snippet": "Skardu is the gateway to K2 and the Karakoram Range. Visit Shangrila Resort, Kachura Lake, and Shigar Fort. Skardu offers incredible trekking opportunities and cultural experiences.",
                "category": "destinations"
            },
            {
                "topic": "fairy meadows",
                "title": "Fairy Meadows: Pakistan's Natural Wonder",
                "snippet": "Fairy Meadows offers spectacular views of Nanga Parbat, the world's ninth-highest mountain. The journey requires a jeep ride followed by a 3-hour trek. Best time to visit is summer (May-September).",
                "category": "destinations"
            },
            {
                "topic": "transportation",
                "title": "Getting Around Northern Pakistan",
                "snippet": "Transportation options include domestic flights to major cities, rental cars with driver, public buses, and jeeps for mountain roads. The Karakoram Highway is the main artery through northern areas.",
                "category": "travel tips"
            },
            {
                "topic": "weather",
                "title": "Northern Pakistan Climate Information",
                "snippet": "Northern Pakistan has distinct seasons. Summers (May-Sept) are mild and perfect for tourism. Winters (Nov-Feb) bring heavy snow. Spring and autumn offer moderate temperatures but variable conditions.",
                "category": "travel tips"
            },
            {
                "topic": "accommodation",
                "title": "Where to Stay in Northern Pakistan",
                "snippet": "Accommodation ranges from luxury resorts in Hunza and Skardu to mid-range hotels and budget guesthouses. In remote areas, locals offer homestays. Advance booking recommended during peak season.",
                "category": "accommodations"
            },
            {
                "topic": "food",
                "title": "Northern Pakistani Cuisine",
                "snippet": "Northern Pakistani cuisine features dishes like Chapshoro (meat pastry), Mamtu (dumplings), Harissa (meat porridge), and Gyal (pancakes). Don't miss local fruits like Hunza apricots and cherries.",
                "category": "food"
            },
            {
                "topic": "trekking",
                "title": "Trekking Routes in Northern Pakistan",
                "snippet": "Popular treks include K2 Base Camp, Concordia, Nanga Parbat Base Camp, Fairy Meadows, Rush Lake, and Snow Lake. Most treks require guides and permits arranged in advance.",
                "category": "activities"
            },
            {
                "topic": "permits",
                "title": "Travel Permits for Northern Pakistan",
                "snippet": "Some areas require No Objection Certificates (NOCs) or special permits. These include Chilas, parts of Gilgit-Baltistan, and areas close to borders. Apply through tour operators or government offices.",
                "category": "travel tips"
            },
            {
                "topic": "culture",
                "title": "Cultural Diversity of Northern Pakistan",
                "snippet": "Northern Pakistan is home to diverse ethnic groups including Kalash, Burusho, Wakhi, and Balti people. Each has unique traditions, festivals, music, and crafts reflecting mountain life.",
                "category": "culture"
            }
        ];
        
        // Match relevant topics from our collection
        const queryTerms = query.toLowerCase().split(/\s+/);
        const matches = travelInfo.filter(info => {
            // Check if query terms match any key fields
            return queryTerms.some(term => 
                info.topic.includes(term) || 
                info.title.toLowerCase().includes(term) ||
                info.snippet.toLowerCase().includes(term) ||
                info.category.includes(term)
            );
        });
        
        if (matches.length > 0) {
            // Return the relevant info
            return matches.slice(0, 3);
        }
        
        return null;
    } catch (error) {
        console.error("Additional info retrieval error:", error.message);
        return null;
    }
}

// Enhanced function to generate a response using Gemini with a proper prompt for refinement
async function generateEnhancedResponse(query, knowledgeBase = null, additionalInfo = null) {
    try {
        let contextPrompt = WEBSITE_CONTEXT;
        
        // Add knowledge base information if available (most important for hybrid approach)
        if (knowledgeBase && knowledgeBase.length > 0) {
            contextPrompt += "\n\n-- KNOWLEDGE BASE INFORMATION --\n";
            knowledgeBase.forEach((entry, index) => {
                contextPrompt += `Knowledge Entry ${index + 1}:\nQuestion: ${entry.question}\nAnswer: ${entry.answer}\n`;
                if (entry.category) contextPrompt += `Category: ${entry.category}\n`;
                contextPrompt += "\n";
            });
        }
        
        // Add additional information to context if available
        if (additionalInfo && additionalInfo.length > 0) {
            contextPrompt += "\n\n-- ADDITIONAL RELEVANT INFORMATION --\n";
            additionalInfo.forEach((info, index) => {
                contextPrompt += `Information ${index + 1}: ${info.title}\n${info.snippet}\n`;
                if (info.category) contextPrompt += `Category: ${info.category}\n`;
                contextPrompt += "\n";
            });
        }
        
        // Specific instructions for hybrid approach
        contextPrompt += "\n\n-- RESPONSE INSTRUCTIONS --\n";
        contextPrompt += "1. Use the knowledge base information as your primary source of truth\n";
        contextPrompt += "2. Rephrase and personalize the response to sound natural and conversational\n";
        contextPrompt += "3. Be specific and detailed using facts from the knowledge base\n";
        contextPrompt += "4. Only use additional information to complement the knowledge base, not contradict it\n";
        contextPrompt += "5. If no relevant information is found, acknowledge that you don't have specific information\n";
        contextPrompt += "6. Don't mention that you're using a knowledge base or reference these instructions\n";
        
        const response = await axios.post(GEMINI_URL, {
            contents: [{
                parts: [{ 
                    text: `${contextPrompt}\n\nUser query about Pakistan travel: ${query}\n\nYour helpful response:` 
                }]
            }]
        }, {
            headers: { "Content-Type": "application/json" },
            timeout: 15000
        });

        let generatedResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
            "Sorry, I couldn't generate a response about Pakistan travel. Please try rephrasing your question.";
            
        // Post-process to remove any AI self-references
        generatedResponse = generatedResponse.replace(/^(As an AI assistant|As an AI travel guide|I'm an AI|As a travel assistant|As a language model)[,.]?\s*/i, "");
        
        return generatedResponse;
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return "Sorry, I'm having trouble connecting to my knowledge source right now. Please try again in a moment.";
    }
}

// Main query processing route with enhanced hybrid approach
router.post("/query", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const userId = req.body.userId || 'anonymous';
        let userLanguage = req.body.language || 'en'; // Default to English if not specified
        
        // Normalize language code to handle variations
        userLanguage = userLanguage.split('-')[0].toLowerCase();
        
        // Only proceed with supported languages, otherwise default to English
        if (!LANGUAGE_NAMES[userLanguage]) {
            userLanguage = 'en';
        }
        
        console.log(`Received message in language: ${userLanguage}`);
        
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Generate a unique query ID
        const queryId = new Date().getTime().toString();

        // Only translate if language is not English
        let translatedMessage = userMessage;
        
        if (userLanguage !== 'en') {
            try {
                // Translate user message to English for processing
                translatedMessage = await translateText(userMessage, userLanguage, 'en');
                console.log(`Translated query from ${userLanguage}: "${userMessage}" -> "${translatedMessage}"`);
            } catch (error) {
                console.error("Translation error:", error.message);
                // If translation fails, proceed with the original message
            }
        }

        // Check for basic intents first (quick replies for common patterns)
    const basicIntent = classifyBasicIntent(translatedMessage);
if (basicIntent && fallbackResponses[basicIntent]) {
    // Get the response in the user's language, fallback to English
    let finalReply = fallbackResponses[basicIntent][userLanguage] || fallbackResponses[basicIntent]['en'];
    
    return res.json({ 
        reply: finalReply, 
        source: "fallback",
        queryId,
        detectedLanguage: userLanguage
    });
}

        // Step 1: Semantic Search in Knowledge Base - core of hybrid approach
        const knowledgeBaseResults = await KnowledgeBase.find({}).limit(50); // Get a larger subset to score
        
        // Apply semantic scoring to all entries
        const scoredResults = knowledgeBaseResults.map(entry => ({
            entry,
            score: calculateRelevance(entry, translatedMessage)
        }));
        
        // Sort by score in descending order
        scoredResults.sort((a, b) => b.score - a.score);
        
        // Get top matches for hybrid context
        const topMatches = scoredResults.slice(0, 3).map(item => item.entry);
        
        console.log(`Top match score: ${scoredResults[0]?.score || 0}`);
        
        // Step 2: Get additional context information
        const additionalInfo = await getAdditionalInfo(translatedMessage);
        
        // Step 3: Use Gemini for the hybrid approach (always combine KB + AI)
        // This is the core of the hybrid approach - using AI to rephrase knowledge base content
        const finalReply = await generateEnhancedResponse(translatedMessage, topMatches, additionalInfo);
        const source = "hybrid_approach";
            
        console.log("Using hybrid approach: KB + AI rephrasing");

        // Step 4: Translate the reply back to the user's language if not English
        let translatedReply = finalReply;
        if (userLanguage !== 'en' && finalReply) {
            try {
                console.log(`Translating response back to ${userLanguage}`);
                translatedReply = await translateText(finalReply, 'en', userLanguage);
                
                // If translation returned empty or very short result, use the original
                if (!translatedReply || translatedReply.length < 5) {
                    console.warn("Translation returned suspiciously short result, using English response");
                    translatedReply = finalReply;
                } else {
                    console.log(`Translated response to ${userLanguage}: "${translatedReply.substring(0, 50)}..."`);
                }
            } catch (error) {
                console.error("Response translation error:", error.message);
                translatedReply = finalReply; // If translation fails, send the English reply
            }
        }
        
        res.json({ 
            reply: translatedReply, 
            source: source, 
            queryId,
            detectedLanguage: userLanguage
        });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Feedback Route
router.post("/feedback", async (req, res) => {
    try {
        const { queryId, userId, helpful, comments } = req.body;

        if (!queryId || userId === undefined || helpful === undefined) {
            return res.status(400).json({ error: "Missing required feedback fields." });
        }

        const newFeedback = new Feedback({
            queryId,
            userId,
            helpful,
            comments,
            createdAt: Date.now()
        });

        await newFeedback.save();
        
        // If feedback is negative and we have comments, save the query to improve the knowledge base
        if (!helpful && comments) {
            // Here you could add logic to log problematic queries for later review
            // or auto-suggest additions to the knowledge base
            console.log(`Negative feedback received for query ${queryId}: ${comments}`);
        }
        
        res.json({ message: "Feedback recorded, thank you!" });
    } catch (error) {
        console.error("Feedback error:", error);
        res.status(500).json({ error: "Error recording feedback." });
    }
});

module.exports = router;