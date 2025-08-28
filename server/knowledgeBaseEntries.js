



const knowledgeBaseEntries = [
    // Booking related entries
    {
      question: "How do I book a trip?",
      answer: "To book a trip with Map My Trip, browse our destinations, select your preferred location, choose your travel dates and accommodation preferences, and complete the checkout process with payment. Your booking will be confirmed after successful payment. For assistance with booking, you can also contact our customer service team.",
      category: "bookings",
      tags: ["booking", "reservation", "trip", "travel", "book a trip", "make booking", "reserve", "how to book", "booking process", "payment", "checkout", "confirmation"]
    },
    {
      question: "What services does Map My Trip offer?",
      answer: "Map My Trip specializes in Pakistan travel and offers: customized travel packages to northern Pakistan destinations (Hunza, Skardu, Swat, Fairy Meadows), accommodation booking services, guided tours with experienced local guides, transportation arrangements, visa assistance, specialized adventure activities, and custom itinerary planning. We also offer seasonal promotions and group discounts.",
      category: "general",
      tags: ["services", "offerings", "packages", "what you offer", "travel services", "tours", "what services", "northern pakistan", "destinations", "activities"]
    },
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking by logging into your account, navigating to 'My Bookings', selecting the booking you wish to cancel, and clicking the 'Cancel Booking' button. Cancellation policies vary based on how close the cancellation is to your travel date.",
      category: "bookings",
      tags: ["cancellation", "refund", "booking"]
    },
    
    // Destinations related entries
    {
      question: "What destinations do you offer?",
      answer: "We offer a wide range of destinations across the globe. You can browse all available destinations on our 'Destinations' page, which includes detailed information about each location, pricing, and highlights.",
      category: "destinations",
      tags: ["locations", "countries", "cities", "places"]
    },
    {
      question: "What's included in the destination price?",
      answer: "The price typically includes accommodation and basic amenities. Depending on the package, it may also include guided tours, meals, and transportation. Each destination page specifies what's included in the price. Additional services can be added during the booking process.",
      category: "destinations",
      tags: ["pricing", "inclusions", "package", "cost"]
    },
    
    // Payment related entries
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit and debit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway. You'll see all available payment options during the checkout process.",
      category: "payments",
      tags: ["payment", "credit card", "debit card", "PayPal"]
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, all payment information is encrypted and processed through secure payment gateways. We do not store your full credit card details on our servers. Our payment processing complies with PCI DSS standards.",
      category: "payments",
      tags: ["security", "encryption", "safety", "PCI"]
    },
    {
      question: "When will I be charged for my booking?",
      answer: "You'll be charged immediately when you complete your booking. The charge will appear on your statement as 'Travel Booking System'. For certain destinations, we may offer a deposit payment option with the remaining balance due before your travel date.",
      category: "payments",
      tags: ["charges", "billing", "payment timing"]
    },
    
    // Account related entries
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Register' button in the top navigation bar. You'll need to provide your name, email address, and create a password. After submitting the form, your account will be created instantly.",
      category: "account",
      tags: ["registration", "signup", "new user"]
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "You can reset your password by clicking on the 'Forgot Password?' link on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      category: "account",
      tags: ["password", "reset", "forgot", "login"]
    },
    
    // General entries
    {
      question: "What is your customer support contact information?",
      answer: "Our customer support team is available 24/7. You can reach us via email at support@travelbooking.example.com or by phone at +1-234-567-8900. You can also use the live chat feature on our website for immediate assistance.",
      category: "general",
      tags: ["support", "contact", "help", "assistance"]
    },
    {
      question: "Do I need travel insurance?",
      answer: "While travel insurance is not mandatory, we strongly recommend it to protect against unforeseen circumstances such as trip cancellations, medical emergencies, or lost luggage. You can add travel insurance during the booking process.",
      category: "general",
      tags: ["insurance", "protection", "coverage", "safety"]
    },
    {
      question: "What are the best northern areas to visit in Pakistan?",
      answer: "Pakistan's northern areas offer breathtaking landscapes including Hunza Valley, Skardu, Swat Valley, Naltar Valley, Fairy Meadows, Naran Kaghan, Murree, and Neelum Valley. Each destination features unique attractions from glaciers and lakes to lush meadows and historic forts.",
      category: "destinations",
      tags: ["northern areas", "hunza", "skardu", "swat", "kaghan", "murree"]
    },
    {
      question: "When is the best time to visit northern Pakistan?",
      answer: "The best time to visit northern Pakistan is from May to October. Summer (May-August) offers pleasant weather for most destinations. September-October is ideal for autumn colors. Winter (November-February) is perfect for snow enthusiasts but many roads may be closed. The monsoon season (July-August) can cause landslides in some areas.",
      category: "destinations",
      tags: ["seasons", "weather", "best time", "northern pakistan"]
    },
    
    // Transportation
    {
      question: "How do I reach northern areas of Pakistan?",
      answer: "You can reach northern Pakistan by air, road, or a combination. Flights operate to Gilgit, Skardu, and Chitral from major cities. For road travel, well-maintained highways connect from Islamabad through the Karakoram Highway (KKH). Our packages include transportation options with experienced drivers familiar with mountain roads.",
      category: "bookings",
      tags: ["transportation", "travel", "flights", "road trips"]
    },
    {
      question: "Do I need a special permit to visit northern areas?",
      answer: "Most northern areas like Hunza, Skardu, and Swat are open to tourists without special permits. However, areas close to borders may require a No Objection Certificate (NOC). International tourists should carry their passport and visa. Our booking team can arrange necessary permits when you book your tour.",
      category: "bookings",
      tags: ["permits", "documentation", "travel requirements", "NOC"]
    },
    
    // Specific Destinations
    {
      question: "What are the must-visit attractions in Hunza Valley?",
      answer: "Hunza Valley offers iconic attractions including Baltit Fort, Altit Fort, Eagle's Nest viewpoint, Attabad Lake, Passu Cones, Hussaini Suspension Bridge, and ancient rock carvings. The valley is also known for its apricot blossoms in spring and traditional Hunza culture. Our Hunza packages include guided tours to these attractions.",
      category: "destinations",
      tags: ["hunza", "attractions", "baltit fort", "attabad lake"]
    },
    {
      question: "What activities can I do in Skardu?",
      answer: "Skardu offers diverse activities including trekking to Concordia and K2 base camp, jeep safaris to Deosai Plains, boat rides on Upper Kachura Lake, camping at Shigar Fort, and exploring the Cold Desert. In winter, skiing opportunities are available. Our Skardu packages can be customized based on your adventure preferences.",
      category: "destinations",
      tags: ["skardu", "activities", "trekking", "deosai", "k2"]
    },
    {
      question: "Is Fairy Meadows worth visiting?",
      answer: "Fairy Meadows is absolutely worth visiting for its spectacular views of Nanga Parbat (the 9th highest mountain in the world). The journey involves a jeep ride followed by a trek or horseback ride. The meadow offers camping, hiking, and photography opportunities. Our packages include accommodation in wooden cabins or luxury glamping tents.",
      category: "destinations",
      tags: ["fairy meadows", "nanga parbat", "camping", "trekking"]
    },
    
    // Accommodation
    {
      question: "What types of accommodation are available in northern Pakistan?",
      answer: "Northern Pakistan offers diverse accommodation options including luxury hotels in major towns, boutique heritage properties (like Serena Shigar Fort), mid-range hotels, local guesthouses, mountain huts, and camping sites. Many locations offer unique experiences like stays in traditional homes. Our packages include vetted accommodations with reliable amenities.",
      category: "bookings",
      tags: ["accommodation", "hotels", "camping", "guesthouses"]
    },
    
    // Cultural Information
    {
      question: "What cultural experiences can I have in northern Pakistan?",
      answer: "Northern Pakistan offers rich cultural experiences including traditional music performances (Silk Route Festival), craft demonstrations (Hunza embroidery and woodwork), local cuisine tastings, visits to ancient mosques and monasteries, and opportunities to learn about diverse ethnic groups like Kalash, Wakhi, and Balti people. Our cultural tours include interactions with local communities.",
      category: "destinations",
      tags: ["culture", "traditions", "festivals", "local experiences"]
    },
    
    // Practical Information
    {
      question: "What should I pack for a trip to northern Pakistan?",
      answer: "For northern Pakistan, pack layers regardless of season. Essential items include sturdy hiking shoes, sunglasses, sunscreen (high altitude UV is intense), hat, lightweight rain jacket, warm jacket (even in summer for high altitudes), basic medications, power bank, and modest clothing for cultural sites. In winter, add thermal layers, snow boots, and heavy outerwear.",
      category: "general",
      tags: ["packing", "essentials", "clothing", "preparation"]
    },
    {
      question: "Is there reliable internet and mobile connectivity in northern areas?",
      answer: "Mobile and internet connectivity varies across northern Pakistan. Major towns like Gilgit, Hunza center, Skardu city, and Murree have reliable 4G coverage. Remote areas may have limited or no connectivity. SCOM, Jazz, and Zong work best in northern regions. Our tour details specify connectivity expectations for each destination, and guides carry satellite phones for emergencies.",
      category: "general",
      tags: ["connectivity", "internet", "mobile", "communication"]
    },
    
    // Safety
    {
      question: "How safe is traveling in northern Pakistan?",
      answer: "Northern Pakistan is generally safe for tourists with extremely hospitable locals. The region has seen significant security improvements in recent years. We recommend traveling with reputable tour operators, respecting local customs, dressing modestly, and following guide advice for mountain safety. Our packages include comprehensive insurance and experienced guides trained in first aid and emergency response.",
      category: "general",
      tags: ["safety", "security", "travel advice"]
    },
    
    // Special Packages
    {
      question: "Do you offer photography-focused tours in northern Pakistan?",
      answer: "Yes, we offer specialized photography tours led by professional photographers familiar with northern Pakistan. These packages include visits during optimal lighting conditions, extended stays at scenic viewpoints, and guidance on capturing the unique landscapes, culture, and wildlife. Equipment rental and drone permission assistance are available upon request.",
      category: "bookings",
      tags: ["photography", "specialized tours", "drone", "cameras"]
    },
    {
      question: "What is special about Neelum Valley in Kashmir?",
      answer: "Neelum Valley is known as the 'Paradise on Earth' with its lush green meadows, pine forests, and the Neelum River flowing through. Key attractions include Shounter Lake, Ratti Gali Lake, Kutton Waterfall, and Keran village. The area is famous for its distinctive Kashmiri culture, traditional wooden houses, and panoramic views. Our Neelum Valley packages include stays in riverside accommodations and cultural experiences.",
      category: "destinations",
      tags: ["neelum valley", "kashmir", "azad kashmir", "lakes"]
    },
    {
      question: "Tell me about Kalash Valley and its unique culture",
      answer: "Kalash Valley in Chitral is home to the ancient Kalash tribe, one of Pakistan's smallest ethnic minorities with pre-Islamic traditions. They celebrate colorful festivals like Chilam Joshi (spring), Uchau (autumn), and Chaomos (winter) with traditional music, dance, and rituals. The valley features unique architecture with wooden houses built on hillsides. Our Kalash cultural tours are designed with respect for local customs and include participation in seasonal festivities.",
      category: "destinations",
      tags: ["kalash", "chitral", "culture", "festivals", "tribe"]
    },
    {
      question: "What makes Deosai National Park special?",
      answer: "Deosai National Park, known as 'Land of Giants,' is one of the world's highest plateaus at 4,114 meters. The park spans 3,000 sq km of wildflower meadows surrounded by snow-capped mountains. It's home to Himalayan brown bears, golden marmots, and rare butterflies. Sheosar Lake ('Blind Lake') is its crown jewel. Our Deosai packages include wildlife safaris, camping experiences, and photography expeditions during the June-September access window.",
      category: "destinations",
      tags: ["deosai", "national park", "wildlife", "sheosar lake", "skardu"]
    },
    
    // Trekking and Adventure
    {
      question: "What are the best trekking routes in northern Pakistan?",
      answer: "Northern Pakistan offers world-class trekking routes including K2 Base Camp trek (14-21 days), Fairy Meadows to Nanga Parbat Base Camp (3-5 days), Rakaposhi Base Camp trek (2-3 days), Naltar Valley trek (3-4 days), Minapin to Rush Lake trek (5-7 days), and Shimshal Pass trek (10-12 days). Our guided treks include permits, equipment rental, porters, and emergency evacuation services if needed.",
      category: "activities",
      tags: ["trekking", "hiking", "base camp", "adventure", "mountaineering"]
    },
    {
      question: "What adventure activities can I do in Pakistan's northern areas?",
      answer: "Pakistan's northern areas offer diverse adventure activities including white water rafting on Indus River, paragliding in Hunza and Kalam, rock climbing in Trango Towers, mountain biking along the Karakoram Highway, skiing in Malam Jabba and Naltar, fly fishing in Kaghan Valley, and 4x4 jeep safaris to mountain passes. Our adventure packages include certified instructors and safety equipment.",
      category: "activities",
      tags: ["adventure", "rafting", "paragliding", "skiing", "rock climbing"]
    },
    {
      question: "Is mountaineering permitted in northern Pakistan?",
      answer: "Yes, mountaineering is permitted and Pakistan hosts 5 of the world's 14 eight-thousanders including K2, Nanga Parbat, and Gasherbrum I & II. Climbers need permits from the Alpine Club of Pakistan and Ministry of Tourism. Fees vary based on peak height, with royalty fees for major peaks plus per person climbing fees. Our mountaineering expeditions include permit processing, liaison officers, high-altitude porters, and base camp setup.",
      category: "activities",
      tags: ["mountaineering", "climbing", "permits", "k2", "expedition"]
    },
    
    // Accommodation Details
    {
      question: "What luxury accommodation options exist in northern Pakistan?",
      answer: "Luxury accommodations in northern Pakistan include Serena Hotels in Gilgit and Shigar Fort, Luxus Hunza Resort, Pakistan Air Force's Shangrila Resort in Skardu, Highland Resort in Naran, and Pearl Continental Muzaffarabad. These properties offer premium amenities, traditional architecture with modern comforts, fine dining with local cuisine, and spectacular views. Our luxury packages include private transportation and personalized concierge services.",
      category: "bookings",
      tags: ["luxury", "accommodation", "hotels", "resorts", "premium"]
    },
    {
      question: "What unique accommodation experiences can I have in northern Pakistan?",
      answer: "Unique accommodation experiences include glamping at Fairy Meadows facing Nanga Parbat, staying in traditional wooden houses in Hunza with panoramic mountain views, yurt camping on Deosai Plains under starlit skies, houseboat stays on Attabad Lake, heritage stays in restored 400-year-old Baltit Fort, and eco-lodges in remote valleys. Our specialty accommodation packages include cultural activities and locally-sourced meals.",
      category: "bookings",
      tags: ["unique stays", "glamping", "yurts", "heritage", "eco-lodges"]
    },
    
    // Food and Cuisine
    {
      question: "What local foods should I try in northern Pakistan?",
      answer: "Northern Pakistani cuisine varies by region: try Hunza's apricot soup and walnut bread; Gilgit's chapshuro (meat-filled bread) and trout fish; Baltistan's mantou (meat dumplings) and harissa (meat porridge); Chitral's shurasht (meat soup) and khyaber (meat pilaf). Don't miss traditional teas like salty Kashmiri chai and butter tea. Our culinary tours include cooking demonstrations and meals with local families.",
      category: "general",
      tags: ["food", "cuisine", "local dishes", "culinary", "traditional food"]
    },
    
    // Festivals and Events
    {
      question: "What are the major festivals celebrated in northern Pakistan?",
      answer: "Major festivals in northern Pakistan include the Shandur Polo Festival (world's highest polo tournament), Silk Route Festival showcasing regional cultures, Basant (spring) celebrations in Gilgit, Harvest festivals in Hunza, Chilam Joshi in Kalash Valley, and winter snow festivals in Malam Jabba and Naltar. Our festival tour packages include VIP seating, cultural performances, and photography opportunities with traditional performers.",
      category: "destinations",
      tags: ["festivals", "events", "polo", "culture", "celebrations"]
    },
    
    // Transportation Details
    {
      question: "What is the Karakoram Highway and why is it famous?",
      answer: "The Karakoram Highway (KKH) is the highest paved international road in the world, connecting Pakistan to China at Khunjerab Pass (4,693m). Built between 1959-1979, this engineering marvel cuts through three mountain ranges: Karakoram, Himalaya, and Hindu Kush. Key attractions along the route include Passu Cones, glaciers, ancient rock art, and the confluence of three mighty mountain ranges. Our KKH tours include stops at panoramic viewpoints and historical sites.",
      category: "general",
      tags: ["karakoram highway", "kkh", "khunjerab", "silk road", "china border"]
    },
    {
      question: "Are there helicopter tours available in northern Pakistan?",
      answer: "Yes, helicopter tours are available for destinations like K2 Base Camp, Concordia, Deosai Plains, and remote valleys. These tours provide spectacular aerial views of mountains, glaciers, and landscapes unreachable by road. Helicopter services must be booked well in advance and are weather-dependent. Our premium packages offer helicopter transfers as optional add-ons for adventurers with limited time or those seeking exclusive experiences.",
      category: "bookings",
      tags: ["helicopter", "aerial tours", "k2", "luxury transport", "remote access"]
    },
    
    // Seasonal Information
    {
      question: "What is special about visiting northern Pakistan in autumn?",
      answer: "Autumn (September-October) transforms northern Pakistan with spectacular colors as forests turn gold, red, and orange. Hunza Valley is famous for its golden apricot and poplar trees against white mountain backdrops. The season offers clear skies perfect for photography, mild temperatures for comfortable trekking, harvest festivals, and fewer tourists. Our autumn packages feature photography guides and unique harvest-time cultural experiences.",
      category: "destinations",
      tags: ["autumn", "fall colors", "photography", "harvest", "foliage"]
    },
    {
      question: "What winter activities are available in northern Pakistan?",
      answer: "Winter in northern Pakistan (November-February) offers skiing and snowboarding at Malam Jabba and Naltar resorts, ice skating on frozen lakes, snowshoeing in Hunza and Skardu, hot spring visits in Gilgit-Baltistan, snow festivals with competitions, and wildlife tracking in snow. Winter also means stunning views of snow-covered peaks without summer haze. Our winter packages include cold-weather equipment and experienced guides familiar with winter conditions.",
      category: "activities",
      tags: ["winter", "skiing", "snow", "ice skating", "cold weather"]
    },
    
    // Special Interest
    {
      question: "What opportunities exist for wildlife photography in northern Pakistan?",
      answer: "Northern Pakistan offers exceptional wildlife photography opportunities including snow leopards in Khunjerab National Park, markhor (national animal) in Chitral Gol, Himalayan ibex in Hunza, brown bears in Deosai, migratory birds at Satpara Lake, and golden eagles in highland areas. Our specialized wildlife photography tours include expert trackers, hides/blinds for observation, and long lenses rental options.",
      category: "activities",
      tags: ["wildlife", "photography", "animals", "birds", "nature"]
    },
    {
      question: "Are there hot springs in northern Pakistan?",
      answer: "Yes, northern Pakistan has several natural hot springs known for therapeutic properties. Notable ones include Chutzoro Hot Springs near Gilgit (rich in minerals), Murtazabad Hot Springs in Hunza Valley (with mountain views), Tato Hot Springs in Skardu (accessible year-round), and Garam Chashma in Chitral (traditional bathing facilities). Our wellness tours include visits to these springs with private bathing arrangements and thermal spa treatments.",
      category: "destinations",
      tags: ["hot springs", "thermal", "wellness", "spa", "healing"]
    },
    {
      question: "What medical facilities are available in northern Pakistan?",
      answer: "Major towns like Gilgit, Skardu, and Chitral have government and private hospitals for basic treatment. However, facilities are limited compared to major cities. Travelers should bring personal medications and a basic first aid kit. For serious medical emergencies, evacuation to Islamabad may be necessary. Our premium tour packages include emergency evacuation insurance and guides trained in wilderness first aid.",
      category: "general",
      tags: ["medical", "healthcare", "hospitals", "emergency", "safety"]
    },
    {
      question: "Do I need altitude sickness medication for northern Pakistan?",
      answer: "Altitude sickness can occur as many destinations are above 2,500 meters. Consider preventive medication like Diamox after consulting your doctor. More importantly, allow proper acclimatization by ascending gradually, staying hydrated, avoiding alcohol, and planning rest days. Symptoms like headache and nausea should not be ignored. Our high-altitude trekking packages include acclimatization days and oxygen supplies for emergencies.",
      category: "general",
      tags: ["altitude sickness", "health", "mountains", "medication", "acclimatization"]
    },
    {
      question: "Is water safe to drink in northern Pakistan?",
      answer: "Always drink bottled, filtered, or boiled water. While glacial streams may look pristine, they can contain harmful bacteria. Most hotels provide bottled water, but carrying water purification tablets or a portable filter is recommended for remote areas. Our tour packages include daily bottled water, and our guides carry purification equipment for emergencies.",
      category: "general",
      tags: ["water", "drinking", "safety", "hygiene", "health"]
    },
    
    // Logistics
    {
      question: "How reliable is the electricity in northern Pakistan?",
      answer: "Electricity supply in northern Pakistan can be inconsistent, especially in remote areas. Major towns usually have electricity but may experience scheduled load-shedding (power cuts) for several hours daily. Most hotels have backup generators for essential services. We recommend bringing power banks, solar chargers, and spare batteries for electronics. Our accommodations are selected for reliable power arrangements.",
      category: "general",
      tags: ["electricity", "power", "infrastructure", "charging", "electronics"]
    },
    {
      question: "What banking and ATM facilities are available in northern Pakistan?",
      answer: "ATMs are available in major towns like Gilgit, Skardu, Hunza Center (Karimabad), and Chitral, but can be unreliable or run out of cash. It's advisable to carry sufficient Pakistani rupees from major cities like Islamabad. Credit cards are accepted at high-end hotels but not widely elsewhere. Our tour packages clarify where ATMs are accessible and include assistance with currency exchange.",
      category: "general",
      tags: ["atm", "banking", "money", "currency", "cash"]
    },
    {
      question: "Can I use my drone in northern Pakistan?",
      answer: "Drone usage is restricted in Pakistan, especially near military installations, airports, and border areas, which includes many northern regions. Prior permission from the Pakistan Civil Aviation Authority and additional security clearances may be required. Unauthorized drone usage can result in confiscation and legal issues. Our photography tours include guidance on drone regulations and permit acquisition assistance when possible.",
      category: "general",
      tags: ["drone", "photography", "regulations", "permits", "aerial"]
    },
    
    // Cultural Tips
    {
      question: "What cultural sensitivities should I be aware of when visiting northern Pakistan?",
      answer: "Northern Pakistan is culturally diverse but generally conservative. Respect local customs by dressing modestly (shoulders and knees covered for all genders), asking permission before photographing people, removing shoes when entering homes or religious buildings, using right hand for eating or passing items, and avoiding public displays of affection. During Ramadan, avoid eating, drinking, or smoking in public during daylight hours.",
      category: "general",
      tags: ["culture", "etiquette", "customs", "respect", "traditions"]
    },
    {
      question: "What languages are spoken in northern Pakistan?",
      answer: "Northern Pakistan has remarkable linguistic diversity. While Urdu (national language) and English are understood in tourist areas, regional languages include Shina in Gilgit, Burushaski and Wakhi in Hunza, Balti in Skardu, Khowar in Chitral, and Kohistani in Swat. Learning basic greetings in local languages is appreciated. Our guides are multilingual and can help with translations during community interactions.",
      category: "general",
      tags: ["language", "communication", "phrases", "greetings", "local dialects"]
    },
    
    // Booking Tips
    {
      question: "How far in advance should I book my trip to northern Pakistan?",
      answer: "For summer trips (June-August peak season), book 3-6 months in advance for best accommodation options. Festivals and major events require 6+ months advance booking. Winter trips, except for New Year, can be arranged with 1-2 months notice. Last-minute bookings may be accommodated during shoulder seasons, but with limited options. Early booking discounts are available for reservations made 6+ months in advance.",
      category: "bookings",
      tags: ["reservation", "planning", "advance booking", "availability", "schedule"]
    },
    {
      question: "Do you offer customized itineraries for northern Pakistan?",
      answer: "Yes, we specialize in customized itineraries based on your interests, time constraints, budget, and physical capabilities. Whether you're interested in cultural experiences, adventure activities, photography, or spiritual journeys, we can create a personalized trip plan. Customization options include private transportation, special dietary arrangements, birthday/anniversary celebrations, and exclusive cultural performances.",
      category: "bookings",
      tags: ["custom", "personalized", "tailor-made", "bespoke", "private tour"]
    },
    
    // Special Interest
    {
      question: "Can I visit traditional handicraft workshops in northern Pakistan?",
      answer: "Northern Pakistan has rich craft traditions including Hunza's woodcarving and embroidery, Chitral's Shu (woolen fabric) weaving, Gilgit's gemstone cutting, Baltistan's stone carving, and Swat's jewelry making. We arrange visits to artisan workshops with demonstrations and hands-on experiences. Our cultural tours include meetings with master craftspeople and opportunities to purchase authentic handicrafts directly from creators.",
      category: "activities",
      tags: ["handicrafts", "artisans", "souvenirs", "traditional crafts", "workshops"]
    },
    {
      question: "What archaeological sites can I visit in northern Pakistan?",
      answer: "Northern Pakistan has fascinating archaeological sites including 8th-century Buddha carvings near Skardu, 1000+ year old rock inscriptions along the Karakoram Highway, ancient Gandhara Buddhist sites near Swat, prehistoric petroglyphs at Chaghdo in Skardu, and medieval forts like Altit (1100 years old). Our archaeology-focused tours are led by guides with historical expertise and include access to sites not on typical tourist routes.",
      category: "destinations",
      tags: ["archaeology", "history", "ancient", "petroglyphs", "heritage"]
    },
    {
      question: "Are there star-gazing opportunities in northern Pakistan?",
      answer: "Northern Pakistan offers exceptional stargazing due to high altitude, clean air, and minimal light pollution. Prime locations include Deosai Plains, Fairy Meadows, Naltar Valley, and Concordia (K2 Base Camp area). The Milky Way is clearly visible and meteor showers are spectacular. Our astronomy tours include telescope equipment, expert guides who can identify celestial objects, and photography assistance for night sky shots.",
      category: "activities",
      tags: ["stargazing", "astronomy", "night sky", "milky way", "stars"]
    },
  ];
  
  module.exports = knowledgeBaseEntries;