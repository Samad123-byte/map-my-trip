import React, { useState, useEffect, useRef } from 'react';
import { chatbotService } from '../services/api';
import './ChatbotUI.css';
import { useTranslation } from 'react-i18next';

const ChatbotUI = ({ onNewMessage, currentLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const [hasInitialMessage, setHasInitialMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const notificationSoundRef = useRef(null);
  const { t } = useTranslation();
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showFeedbackDetail, setShowFeedbackDetail] = useState(false);
  const [feedbackSelected, setFeedbackSelected] = useState(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Voice-to-text states and refs
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Text-to-Speech states and refs
  const [ttsSupported, setTtsSupported] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [ttsVoices, setTtsVoices] = useState([]);
  const currentUtteranceRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      // Set language based on currentLanguage prop
      const getRecognitionLanguage = (lang) => {
        const languageMap = {
          'en': 'en-US',
          'es': 'es-ES',
          'fr': 'fr-FR',
          'de': 'de-DE',
          'zh': 'zh-CN',
           'ur': 'ur-PK' 
        };
        const baseLanguage = lang?.split('-')[0]?.toLowerCase() || 'en';
        return languageMap[baseLanguage] || 'en-US';
      };
      
      recognition.lang = getRecognitionLanguage(currentLanguage);
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prevInput => prevInput + (prevInput ? ' ' : '') + transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Show user-friendly error messages
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access to use voice input.');
        } else if (event.error === 'no-speech') {
          // Don't show alert for no-speech, just stop listening
        } else {
          console.log('Speech recognition error:', event.error);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
    }
    
    // Update recognition language when currentLanguage changes
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Initialize Text-to-Speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setTtsSupported(true);
      
      // Load available voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        setTtsVoices(voices);
      };
      
      // Load voices initially
      loadVoices();
      
      // Some browsers load voices asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (currentUtteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Update recognition language when currentLanguage changes
  useEffect(() => {
    if (recognitionRef.current && speechSupported) {
      const getRecognitionLanguage = (lang) => {
        const languageMap = {
          'en': 'en-US',
          'es': 'es-ES',
          'fr': 'fr-FR',
          'de': 'de-DE',
          'zh': 'zh-CN'
        };
        const baseLanguage = lang?.split('-')[0]?.toLowerCase() || 'en';
        return languageMap[baseLanguage] || 'en-US';
      };
      
      recognitionRef.current.lang = getRecognitionLanguage(currentLanguage);
    }
  }, [currentLanguage, speechSupported]);

  // Voice input handlers
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Text-to-Speech handlers
  const getTtsLanguage = (lang) => {
    const languageMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'zh': 'zh-CN',
      'ur': 'ur-PK' 
    };
    const baseLanguage = lang?.split('-')[0]?.toLowerCase() || 'en';
    return languageMap[baseLanguage] || 'en-US';
  };

  const getBestVoice = (targetLang) => {
    if (!ttsVoices.length) return null;
    
    const baseLang = targetLang.split('-')[0].toLowerCase();
    
    // Filter voices by language first
    const languageMatchingVoices = ttsVoices.filter(voice => 
      voice.lang.toLowerCase().startsWith(baseLang)
    );
    
    // If no language match, use all voices
    const voicesToSearch = languageMatchingVoices.length > 0 ? languageMatchingVoices : ttsVoices;
    
    // Preferred female voice names by language
    const femaleVoicePreferences = {
      'en': ['Samantha', 'Alex', 'Victoria', 'Karen', 'Susan', 'Moira', 'Fiona', 'Tessa', 'Veena', 'Zuzana'],
      'es': ['Monica', 'Paulina', 'Marisol', 'Esperanza', 'Angelica', 'Lucia'],
      'fr': ['Amelie', 'Virginie', 'Audrey', 'Marie', 'Celine'],
      'de': ['Anna', 'Helena', 'Petra', 'Steffi', 'Marlene'],
      'zh': ['Ting-Ting', 'Sin-ji', 'Mei-Jia', 'Li-mu'],
       'ur': ['Kiran', 'Rahat', 'Mehak', 'Sadia', 'Farah'] 
    };
    
    const preferredNames = femaleVoicePreferences[baseLang] || femaleVoicePreferences['en'];
    
    // Try to find preferred female voices by name
    for (const preferredName of preferredNames) {
      const voice = voicesToSearch.find(v => 
        v.name.toLowerCase().includes(preferredName.toLowerCase())
      );
      if (voice) return voice;
    }
    
    // Look for voices with "female" in the name or description
    const femaleVoice = voicesToSearch.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('girl')
    );
    if (femaleVoice) return femaleVoice;
    
    // Look for common female voice patterns
    const commonFemaleVoice = voicesToSearch.find(voice => {
      const name = voice.name.toLowerCase();
      return name.includes('sara') || name.includes('emma') || name.includes('alice') ||
             name.includes('jane') || name.includes('lisa') || name.includes('mary') ||
             name.includes('anna') || name.includes('eva') || name.includes('sofia') ||
             name.includes('maria') || name.includes('julia') || name.includes('laura');
    });
    if (commonFemaleVoice) return commonFemaleVoice;
    
    // Prefer voices that are NOT explicitly male
    const nonMaleVoice = voicesToSearch.find(voice => {
      const name = voice.name.toLowerCase();
      return !name.includes('male') && !name.includes('man') && !name.includes('boy') &&
             !name.includes('daniel') && !name.includes('david') && !name.includes('john') &&
             !name.includes('thomas') && !name.includes('james') && !name.includes('robert');
    });
    if (nonMaleVoice) return nonMaleVoice;
    
    // Fallback to first available voice
    return voicesToSearch[0] || ttsVoices.find(voice => voice.default) || ttsVoices[0];
  };

  const speakText = (text, messageId) => {
    if (!ttsSupported || !text) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = getTtsLanguage(currentLanguage);
    const voice = getBestVoice(targetLang);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = targetLang;
    utterance.rate = 0.85; // Slightly slower for more natural, conversational pace
    utterance.pitch = 1.1; // Slightly higher pitch for more feminine tone
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
    };
    
    utterance.onend = () => {
      setSpeakingMessageId(null);
      currentUtteranceRef.current = null;
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setSpeakingMessageId(null);
      currentUtteranceRef.current = null;
    };
    
    currentUtteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setSpeakingMessageId(null);
      currentUtteranceRef.current = null;
    }
  };

  const toggleSpeech = (text, messageId) => {
    if (speakingMessageId === messageId) {
      stopSpeaking();
    } else {
      speakText(text, messageId);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Play sound when new bot message arrives
  const playNotificationSound = () => {
    if (notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(error => {
        // Silently handle autoplay restrictions
        console.log('Sound could not be played:', error);
      });
    }
  };

  useEffect(() => {
    // Only auto-scroll if user is near bottom or a new bot message arrived
    const isUserNearBottom = messagesContainerRef.current && 
      (messagesContainerRef.current.scrollHeight - messagesContainerRef.current.scrollTop <= 
      messagesContainerRef.current.clientHeight + 150);
    
    const isNewBotMessage = messages.length > 0 && messages[messages.length - 1]?.type === 'bot';
    
    if (isUserNearBottom || isNewBotMessage || messages.length <= 1) {
      scrollToBottom();
    }

    // Play sound for new bot messages, but not for the initial greeting
    if (isNewBotMessage && messages.length > 1 && !isLoading) {
      playNotificationSound();
    }
  }, [messages, isLoading]);

  // Add initial welcome message only once when component mounts
  useEffect(() => {
    if (!hasInitialMessage) {
      // Translate welcome message based on current language
      const welcomeMessage = getWelcomeMessage(currentLanguage);
      setMessages([{
        type: 'bot',
        content: welcomeMessage,
        source: 'greeting'
      }]);
      setHasInitialMessage(true);
    }
  }, [hasInitialMessage, currentLanguage]);

  // Get welcome message based on language
  const getWelcomeMessage = (language) => {
    // Basic welcome messages for supported languages
    const welcomeMessages = {
      'en': "Hi there! 👋 Welcome to Map My Trip! I'm your personal travel assistant for exploring Northern Pakistan. How can I help you plan your adventure today?",
      'es': "¡Hola! 👋 ¡Bienvenido a Map My Trip! Soy tu asistente personal de viajes para explorar el norte de Pakistán. ¿Cómo puedo ayudarte a planificar tu aventura hoy?",
      'fr': "Bonjour! 👋 Bienvenue sur Map My Trip! Je suis votre assistant personnel de voyage pour explorer le nord du Pakistan. Comment puis-je vous aider à planifier votre aventure aujourd'hui?",
      'de': "Hallo! 👋 Willkommen bei Map My Trip! Ich bin Ihr persönlicher Reiseassistent für die Erkundung Nordpakistans. Wie kann ich Ihnen heute bei der Planung Ihres Abenteuers helfen?",
      'zh': "你好! 👋 欢迎来到Map My Trip! 我是您探索巴基斯坦北部的个人旅行助手。今天我能如何帮助您规划冒险之旅?",
        'ur': "السلام علیکم! 👋 Map My Trip میں خوش آمدید! میں شمالی پاکستان کی تلاش کے لیے آپ کا ذاتی سفری معاون ہوں۔ آج میں آپ کی مہم کی منصوبہ بندی میں کیسے مدد کر سکتا ہوں؟"
    };
    
    // Get message for current language, fallback to English if not available
    const baseLanguage = language.split('-')[0].toLowerCase();
    return welcomeMessages[baseLanguage] || welcomeMessages['en'];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Stop listening if currently active
    if (isListening) {
      stopListening();
    }

    // Stop any current speech
    if (speakingMessageId) {
      stopSpeaking();
    }

    const userMessage = { type: 'user', content: input.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const userId = localStorage.getItem('userId') || 'anonymous'; 
      // Use the passed-in language prop
      const language = currentLanguage || 'en';
      
      const response = await chatbotService.sendMessage(currentInput, userId, language);
      setCurrentQueryId(response.queryId);
      
      // Store detected language if returned from backend
      if (response.detectedLanguage) {
        console.log(`Backend detected language: ${response.detectedLanguage}`);
      }
      
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        content: response.reply,
        source: response.source,
        queryId: response.queryId
      }]);
      
      // Reset feedback states for new message
      setFeedbackSelected(null);
      setShowFeedbackDetail(false);
      setFeedbackComment('');
      
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSelection = (helpful) => {
    setFeedbackSelected(helpful);
    // Show feedback detail immediately on selection
    setShowFeedbackDetail(helpful === false || true);
  };

  const sendFeedback = async () => {
    if (!currentQueryId || feedbackSelected === null) return;
    
    try {
      setIsSubmittingFeedback(true);
      const userId = localStorage.getItem('userId') || 'anonymous';
      
      // Ensure we're passing the right data format to the API
      const response = await chatbotService.sendFeedback(
        currentQueryId, 
        userId, 
        feedbackSelected, 
        feedbackComment
      );
      
      console.log('Feedback submitted successfully:', response);
      
      // Add confirmation message
      setMessages(prev => [...prev, {
        type: 'system',
        content: "Thank you for your feedback! It helps us improve."
      }]);
      
      // Reset feedback states
      setCurrentQueryId(null);
      setFeedbackComment('');
      setShowFeedbackDetail(false);
      setFeedbackSelected(null);
    } catch (error) {
      console.error('Error sending feedback:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        type: 'system',
        content: "Sorry, there was an issue submitting your feedback. Please try again."
      }]);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };
  
  // Cancel feedback and reset state
  const cancelFeedback = () => {
    setShowFeedbackDetail(false);
    setFeedbackComment('');
    setFeedbackSelected(null);
  };

  // Display source info for interested users
  const getSourceLabel = (source) => {
    const sourceLabels = {
      'knowledge_base': 'From our travel guide',
      'knowledge_base_enhanced': 'From our travel guide (enhanced)',
      'fallback': 'General information',
      'enhanced_info': 'Travel information',
      'gemini_ai': 'AI-assisted response',
      'hybrid_approach': 'Combined knowledge sources',
      'greeting': 'Welcome message'
    };
    
    return sourceLabels[source] || '';
  };

  return (
    <div className="chatbot-container">
      {/* Audio element for notification sound */}
      <audio ref={notificationSoundRef} preload="auto">
        <source src="/sounds/zapsplat_multimedia_game_sound_8_bit_blip_beeping_pop_112006.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="chatbot-header">
        <h2>Map My Trip Assistant</h2>
      </div>
      
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.type} ${message.isError ? 'error' : ''}`}
          >
            {message.type === 'bot' && <div className="bot-icon">🤖</div>}
            <div className="message-content">
              {message.content}
              {message.source && (
                <div className="message-source">
                  {getSourceLabel(message.source)}
                </div>
              )}
              {/* Text-to-Speech button for bot messages */}
              {message.type === 'bot' && ttsSupported && (
                <button
                  className={`tts-button ${speakingMessageId === index ? 'speaking' : ''}`}
                  onClick={() => toggleSpeech(message.content, index)}
                  title={speakingMessageId === index ? 'Stop speaking' : 'Read message aloud'}
                >
                  {speakingMessageId === index ? '⏹️' : '🔊'}
                </button>
              )}
            </div>
            {message.type === 'user' && <div className="user-icon">👤</div>}
            {message.type === 'system' && <div className="system-icon">ℹ️</div>}
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="bot-icon">🤖</div>
            <div className="loading-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        
        {currentQueryId && !isLoading && !feedbackSelected && (
          <div className="feedback-container">
            <p>Was this response helpful?</p>
            <div className="feedback-buttons">
              <button 
                onClick={() => handleFeedbackSelection(true)}
                className={feedbackSelected === true ? 'selected' : ''}
                disabled={isSubmittingFeedback}
              >
                Yes
              </button>
              <button 
                onClick={() => handleFeedbackSelection(false)}
                className={feedbackSelected === false ? 'selected' : ''}
                disabled={isSubmittingFeedback}
              >
                No
              </button>
            </div>
          </div>
        )}
        
        {showFeedbackDetail && (
          <div className="feedback-detail">
            <textarea 
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder={feedbackSelected ? "What did you find helpful? (Optional)" : "How can we improve this answer?"}
              rows={3}
              disabled={isSubmittingFeedback}
            />
            <div className="feedback-actions">
              <button 
                onClick={sendFeedback} 
                className="submit-btn"
                disabled={isSubmittingFeedback}
              >
                {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button 
                onClick={cancelFeedback} 
                className="cancel-btn"
                disabled={isSubmittingFeedback}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chatbot-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about destinations, activities, or travel tips..."
          disabled={isLoading}
        />
        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            disabled={isLoading}
            className={`voice-button ${isListening ? 'listening' : ''}`}
            title={isListening ? 'Stop voice input' : 'Start voice input'}
          >
            {isListening ? '⏹️' : '🎤'}
          </button>
        )}
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;