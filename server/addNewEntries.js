const mongoose = require('mongoose');
const KnowledgeBase = require('./models/KnowledgeBase');

// Use the same MongoDB Atlas connection as in your db.js
const MONGO_URI = "mongodb+srv://sammad1249:Dlsw2zV7YjPS9H2K@cluster0.nx0xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// New entries to add
const newEntries = [
  {
    question: "What wildlife can I spot in northern Pakistan?",
    answer: "Northern Pakistan is home to diverse wildlife including snow leopards, Himalayan brown bears, markhor (national animal), ibex, blue sheep, and various bird species like golden eagles and Himalayan griffon vultures. Best spotting locations include Khunjerab National Park, Deosai National Park, and Chitral Gol National Park.",
    category: "destinations",
    tags: ["wildlife", "animals", "nature", "national park", "conservation"]
  },
  {
    question: "What photography equipment should I bring for northern Pakistan?",
    answer: "For northern Pakistan, bring a DSLR/mirrorless camera with wide-angle lens (16-35mm) for landscapes, telephoto zoom (70-200mm or longer) for wildlife, tripod for low light and night photography, plenty of batteries (charging can be limited), sufficient memory cards, lens cleaning kit, waterproof camera bag, and polarizing filter for reducing glare from snow and water.",
    category: "general",
    tags: ["photography", "equipment", "camera", "gear", "travel tips"]
  },
  {
    question: "How do I book a customized tour?",
    answer: "To book a customized tour, you can use our 'Request Custom Tour' form in the main menu. Provide details about your preferred destinations, travel dates, group size, interests (trekking, culture, photography, etc.), and accommodation preferences. Our travel experts will review your request and respond within 24-48 hours with a personalized itinerary and quote. You can then refine the proposal or proceed with booking by paying a 20% deposit.",
    category: "custom-tours",
    tags: ["customized", "bespoke", "tailor-made", "personal", "custom tour"]
  },
  {
    question: "Can I create a customized tour of northern Pakistan?",
    answer: "Yes, we specialize in customized tours of northern Pakistan tailored to your preferences. Whether you want to focus on specific regions like Hunza, Skardu, or Chitral, or combine multiple areas, our local experts can design the perfect itinerary. We can customize every aspect including transportation (private vehicle, flights), accommodation level, meal options, activities, and special experiences like cultural events or photography sessions with local communities.",
    category: "custom-tours",
    tags: ["northern areas", "personalized", "custom itinerary", "bespoke tour"]
  },
  {
    question: "What information do you need for creating a custom tour?",
    answer: "To create your custom tour, we need: 1) Travel dates and duration, 2) Number of travelers and any special needs, 3) Preferred destinations or regions, 4) Accommodation preferences (luxury, mid-range, budget), 5) Main interests (trekking, culture, photography, etc.), 6) Must-see attractions, 7) Any special requirements (dietary, accessibility, etc.), and 8) Approximate budget. The more details you provide, the better we can customize your experience.",
    category: "custom-tours",
    tags: ["requirements", "custom tour planning", "information needed", "personalization"]
  },
  {
    question: "How much do customized tours cost?",
    answer: "Customized tour costs vary widely based on factors like duration, destinations, accommodation level, transportation type, and included activities. As a general guideline, budget custom tours start from $80-100 per person per day, mid-range tours from $150-200 per day, and luxury experiences from $300+ per day. Each quote is tailored to your specific requirements, and we can adjust the itinerary to meet different budget levels while preserving the most important experiences.",
    category: "custom-tours",
    tags: ["pricing", "custom tour cost", "budget", "expenses", "tour price"]
  },
  {
    question: "How far in advance should I plan a customized tour?",
    answer: "For the best experience, we recommend planning customized tours at least 2-3 months in advance, especially for peak season (May-October). This allows time to refine your itinerary, secure the best accommodations, and arrange special experiences. For complex itineraries involving remote areas or special events, 4-6 months advance planning is ideal. Last-minute custom tours (within 2-4 weeks) are sometimes possible during off-season but may have limited options.",
    category: "custom-tours",
    tags: ["planning", "advance booking", "preparation", "timeframe", "scheduling"]
  },
  {
    question: "Can I modify my customized tour after it's confirmed?",
    answer: "Yes, you can modify your customized tour after confirmation, subject to certain conditions. Minor changes (adding/removing activities or meals) can usually be accommodated up to 7 days before departure. Major changes (destinations, accommodation upgrades) require at least 14 days' notice. Changes that affect third-party bookings (flights, special permits) may incur fees. Our flexibility policy aims to accommodate changes whenever possible while ensuring quality service.",
    category: "custom-tours",
    tags: ["changes", "modifications", "flexibility", "adjustments", "itinerary changes"]
  },
  {
    question: "What makes your customized tours special?",
    answer: "Our customized tours stand out because of our deep local expertise in Pakistan's northern regions, personalized planning process, access to exclusive experiences (home stays, private cultural performances, special permits), 24/7 support during your journey, and attention to details like dietary preferences and photography opportunities. We assign dedicated trip designers who work with you from planning through completion, and all our custom tours include emergency support and flexible rescheduling options.",
    category: "custom-tours",
    tags: ["benefits", "features", "advantages", "special", "unique"]
  },
  {
    question: "Can I include special experiences in my customized tour?",
    answer: "Absolutely! We specialize in arranging special experiences for customized tours including: private meetings with local artisans, exclusive photography sessions during golden hour at scenic spots, helicopter transfers to remote locations, special celebration arrangements (birthdays, anniversaries), homestays with local families, cooking classes featuring regional cuisines, private cultural performances, and special access to festivals or events. Just mention your interests when requesting your custom tour.",
    category: "custom-tours",
    tags: ["special experiences", "unique activities", "exclusive", "private", "custom activities"]
  },
  {
    question: "Tell me about customized tour for families with children",
    answer: "Our family-focused customized tours include child-friendly accommodations, adjusted pace with shorter travel times, activities suitable for various ages (treasure hunts in ancient forts, gentle hikes, interactive cultural experiences), flexible meal options, family rooms or connecting rooms where available, and emergency medical support. We can customize based on children's ages, with special consideration for young children (altitude acclimatization, early dinners) or teenagers (adventure activities, educational components).",
    category: "custom-tours",
    tags: ["family", "children", "kids", "family-friendly", "parents"]
  },
  {
    question: "Do you offer customized photography tours?",
    answer: "Yes, we offer specialized photography tours led by local guides who know the perfect shooting locations and timing. These customized tours include: pre-dawn departures for golden hour shots, flexible schedules to capture optimal lighting, transportation configured for camera equipment, access to unique vantage points, permits for professional equipment where needed, and connections with local subjects for portrait photography. We can tailor the pace and locations based on your photography interests (landscape, culture, wildlife, etc.).",
    category: "custom-tours",
    tags: ["photography", "camera", "photo tour", "shooting", "photographers"]
  },
  {
    question: "What payment options do you offer for customized tours?",
    answer: "For customized tours, we offer flexible payment options: 1) Deposit system - 20% deposit to confirm booking, 30% three months before departure, and 50% one month before departure; 2) Monthly installment plans for bookings made 6+ months in advance; 3) Combined payment for groups where one person can handle all transactions. We accept credit/debit cards, bank transfers, and PayPal. For certain luxury customized tours, we also offer hold options with a nominal fee.",
    category: "custom-tours",
    tags: ["payment", "deposit", "installments", "booking", "finance"]
  },
  {
    question: "Can you customize accommodation on tours?",
    answer: "Yes, we can fully customize accommodations based on your preferences. Options range from luxury hotels and resorts (Serena properties, PC Hotels), boutique heritage stays, mid-range comfortable hotels, authentic guesthouses, glamping facilities, to basic mountain lodges. We can mix different accommodation types within one itinerary (e.g., luxury in cities, authentic guesthouses in remote areas). Special requests like room configurations, views, or accessibility features can be arranged based on availability.",
    category: "custom-tours",
    tags: ["accommodation", "hotels", "lodging", "stays", "rooms"]
  },
  {
    question: "Do customized tours include a private guide?",
    answer: "Yes, all our customized tours include a dedicated private guide throughout your journey. Our guides are carefully selected based on your specific interests (history, culture, trekking, photography, etc.), language requirements, and the regions visited. For specialized activities, we may arrange additional expert guides (mountaineering, wildlife, etc.) while maintaining your primary guide for continuity. All guides are locally certified with extensive knowledge of regional customs, languages, and safety protocols.",
    category: "custom-tours",
    tags: ["guide", "escort", "private guide", "tour leader", "local expert"]
  },
  {
    question: "How do I track and manage my customized tour request?",
    answer: "After submitting your customized tour request, you'll receive a confirmation email with a unique tracking ID. You can monitor your request status through your account dashboard under 'My Custom Tour Requests.' There you can view the current status (Under Review, Proposal Ready, Confirmed, etc.), communicate with your assigned trip designer, view and respond to proposals, make payments, and access final itinerary documents. You can also request modifications or updates directly through this system.",
    category: "custom-tours",
    tags: ["tracking", "status", "request", "management", "follow-up"]
  },
  {
    question: "What happens after I submit a customized tour request?",
    answer: "After submitting your request, our process includes: 1) Initial review within 24 hours and assignment of a dedicated trip designer, 2) A consultation call to discuss your vision in detail (optional but recommended), 3) Development of a preliminary itinerary within 3-5 days, 4) Refinement based on your feedback, 5) Final proposal with detailed pricing, 6) Booking confirmation once deposit is received, 7) Regular updates as your travel date approaches, and 8) Pre-departure briefing one week before your tour begins.",
    category: "custom-tours",
    tags: ["process", "procedure", "steps", "workflow", "custom booking"]
  },
  // Eid Special Offers
{
question: "Do you offer special packages for Eid holidays?",
answer: "Yes, we offer exclusive Eid holiday packages for both Eid-ul-Fitr and Eid-ul-Adha. These packages include special rates, family accommodations, festive meals, and cultural experiences celebrating the occasion. Our Eid packages typically feature 3-7 day itineraries to popular destinations with added perks like complimentary airport transfers and flexible booking terms. Book at least 1-2 months in advance as these packages sell out quickly.",
category: "special-offers",
tags: ["eid", "holiday", "festival", "special package", "discount"]
},
{
question: "What is included in your Eid family packages?",
answer: "Our Eid family packages include family-friendly accommodations with connecting rooms or larger suites, special Eid meals and festivities, guided tours adjusted for all age groups, private transportation with child seats if needed, cultural activities showing local Eid celebrations, and special arrangements for prayer times. We also offer a 'kids stay free' policy for children under 8 years and half-price activities for children aged 8-12 during Eid promotions.",
category: "special-offers",
tags: ["eid", "family", "children", "holiday package", "celebration"]
},
{
question: "Are there any discounts for Eid bookings?",
answer: "Yes, we offer several Eid booking discounts: 15-20% off on accommodation for bookings made 45+ days in advance, complimentary room upgrades when available, 3 nights for the price of 2 at select properties, free activities for children, and special group rates for families of 5 or more. Our Early Eid Booking promotion (3 months in advance) includes additional benefits like free airport transfers and welcome gifts.",
category: "special-offers",
tags: ["discount", "promotion", "early booking", "eid offer", "savings"]
},
// Basic Travel Questions
{
question: "What documents do I need for domestic travel in Pakistan?",
answer: "For domestic travel within Pakistan, adult citizens need a valid CNIC (Computerized National Identity Card). Foreign tourists require their passport with valid visa, hotel bookings, and return tickets. For northern areas, some locations may require registration at local checkpoints. We provide a complete document checklist upon booking and can assist with any registration requirements for restricted areas.",
category: "general",
tags: ["documents", "ID", "passport", "requirements", "domestic travel"]
},
{
question: "How can I check the status of my booking?",
answer: "You can check your booking status in several ways: 1) Log into your account on our website and view 'My Bookings', 2) Use the booking reference number sent to your email to check status on our homepage, 3) Contact our customer support via chat or phone with your booking reference, or 4) Check the confirmation email which contains a status tracking link. Booking statuses include Pending, Confirmed, In Progress, and Completed.",
category: "bookings",
tags: ["booking status", "confirmation", "tracking", "reservation status"]
},
{
question: "What should I do in case of an emergency during my trip?",
answer: "In case of emergency during your trip: 1) Contact your tour guide immediately, 2) Call our 24/7 emergency hotline at +92-XXX-XXXXXXX, 3) Use the emergency contact button in our mobile app. All our tours include emergency evacuation assistance, first-aid trained guides, and connections to local medical facilities. We maintain contact with local authorities and have contingency plans for natural disasters or other emergencies.",
category: "general",
tags: ["emergency", "safety", "medical help", "urgent assistance", "crisis"]
},
// Advanced Travel Requirements
{
question: "What vaccinations or health requirements are needed for northern Pakistan?",
answer: "While no specific vaccinations are mandatory for northern Pakistan, we recommend: Hepatitis A and B, Typhoid, Tetanus, COVID-19 (as per current guidelines), and standard routine vaccinations. For high-altitude trekking, consider consulting your doctor about altitude sickness prevention. Malaria prevention isn't typically necessary for northern mountainous regions but may be advised for lower elevations. Bring any personal medications and a basic first-aid kit for minor ailments.",
category: "general",
tags: ["health", "vaccination", "medical", "prevention", "medication"]
},
{
question: "What insurance coverage do you recommend for northern Pakistan trips?",
answer: "We strongly recommend comprehensive travel insurance that specifically includes: high-altitude trekking coverage (for trips above 3,000m), helicopter evacuation and repatriation services, coverage for adventure activities like paragliding or rafting if planned, trip cancellation/interruption, and medical coverage of at least $100,000. Standard travel insurance often excludes 'adventure activities' or high altitudes, so verify these are covered. We partner with several providers offering specialized policies for Pakistan's northern areas.",
category: "general",
tags: ["insurance", "coverage", "protection", "evacuation", "medical insurance"]
},
{
question: "How accessible are your tours for travelers with mobility limitations?",
answer: "We offer partially accessible tours for travelers with moderate mobility limitations, primarily in major towns and certain tourist sites. Our 'Accessible Northern Pakistan' options include: modified itineraries avoiding difficult terrain, vehicles with easy boarding capability, accommodations with accessibility features, and trained guides experienced in assisting travelers with diverse needs. We require advance information about specific requirements to properly prepare. Full wheelchair accessibility is limited due to the mountainous terrain and infrastructure challenges.",
category: "bookings",
tags: ["accessibility", "mobility", "wheelchair", "disability", "special needs"]
},
// Payment and Booking Process
{
question: "What is your cancellation and refund policy?",
answer: "Our cancellation policy provides: Full refund (minus processing fee) for cancellations 30+ days before departure, 75% refund for 15-29 days notice, 50% refund for 8-14 days notice, and no refund for cancellations within 7 days of departure. For emergency cancellations (medical/natural disaster), we offer either rescheduling without penalty or credit for future travel valid for 18 months. Special promotional packages and Eid offers may have different terms specified at booking time.",
category: "payments",
tags: ["cancellation", "refund", "policy", "booking terms", "money back"]
},
{
question: "Do you offer installment payment plans for expensive trips?",
answer: "Yes, we offer flexible installment plans for trips over $1,000: Standard Plan (40% deposit, 30% after 30 days, 30% due 30 days before departure), Extended Plan for bookings made 6+ months in advance (20% deposit, 20% per month for 4 months), and Customized Plans based on individual circumstances. All installment plans are interest-free and can be set up during the booking process. For Eid special packages, we offer reduced deposits of 25% with the remainder due 15 days before departure.",
category: "payments",
tags: ["installments", "payment plan", "deposit", "financing", "pay later"]
},
{
question: "Can I use multiple payment methods for my booking?",
answer: "Yes, you can use multiple payment methods for a single booking. Our system supports splitting payments between credit/debit cards, bank transfers, and digital wallets. This feature is especially useful for group bookings where expenses are shared or for using travel vouchers in combination with standard payment methods. To arrange split payments, select 'Multiple Payment Methods' during checkout or contact our booking team for assistance setting this up.",
category: "payments",
tags: ["split payment", "multiple cards", "payment options", "combined payment"]
},
// Group Travel and Special Requirements
{
question: "What special arrangements do you offer for senior travelers?",
answer: "For senior travelers, we offer specialized arrangements including: slower-paced itineraries with adequate rest periods, ground floor accommodations where possible, vehicles with easy boarding access, special dietary considerations, guides trained in first aid and senior care, and emergency medical contacts in all regions. We also provide detailed pre-departure information about physical requirements for each activity and can arrange oxygen supplementation for high-altitude destinations when needed.",
category: "bookings",
tags: ["seniors", "elderly", "older travelers", "accessibility", "special assistance"]
},
{
question: "Do you accommodate special dietary requirements?",
answer: "Yes, we accommodate various dietary requirements including vegetarian, vegan, halal, gluten-free, dairy-free, and allergies. Please specify your needs during booking, ideally with at least 7 days' notice for standard tours and 14 days for remote areas. In major towns, diverse options are readily available, while in remote areas, we make advance arrangements with local kitchens. For complex requirements, we can arrange for separate preparation to avoid cross-contamination.",
category: "bookings",
tags: ["dietary", "food restrictions", "allergies", "vegetarian", "special meals"]
},
{
question: "What are the benefits of your group booking discounts?",
answer: "Our group booking benefits include: 10% discount for groups of 5-9 people, 15% for 10-15 people, 20% for 16+ people, complimentary tour leader accommodation for groups of 10+, private transportation, customized departure dates, dedicated group coordinator, free airport transfers, group photo packages, and special group activities like private cultural performances. For Eid holiday periods, groups booking 3+ rooms receive additional 5% savings and priority for preferred accommodations.",
category: "bookings",
tags: ["group discount", "group travel", "team", "collective booking", "group rates"]
},
// Seasonal and Weather Information
{
question: "What is the Eid season weather like in northern Pakistan?",
answer: "Eid-ul-Fitr (typically in April/May) coincides with spring in northern Pakistan, featuring moderate temperatures (15-25°C) in valley areas, with higher elevations still experiencing cold weather and some snow. Eid-ul-Adha (typically July/August) occurs during summer, with warm valley temperatures (20-30°C) and pleasant weather in higher elevations (10-20°C). Both periods offer good weather for most activities, though summer Eid may see occasional monsoon rains in some regions. We provide seasonal packing lists with all Eid package bookings.",
category: "general",
tags: ["weather", "season", "temperature", "climate", "eid weather"]
},
{
question: "When are the peak tourist seasons and how do they affect my trip?",
answer: "Peak tourist seasons in northern Pakistan are summer (June-August) and special holiday periods including Eid. During these times: accommodations may charge 20-30% premium rates, popular destinations become crowded with domestic tourists, advance booking of 2-3 months is essential, and some locations may implement visitor quotas. Benefits include full operation of all services and activities, vibrant cultural interactions, and ideal weather for most regions. We recommend shoulder seasons (May/September) for better rates and fewer crowds.",
category: "general",
tags: ["peak season", "crowded", "tourism", "high season", "busy period"]
},
{
question: "How does the monsoon season affect northern Pakistan trips?",
answer: "The monsoon season (July-August) affects different northern regions variably: Areas like Chitral and Gilgit remain relatively dry due to mountain rain shadows, Kaghan/Naran can experience heavy rainfall and occasional landslides, Swat Valley sees moderate precipitation, and high mountain areas above 4,000m may experience afternoon storms. During monsoon, we modify itineraries to focus on drier regions, include buffer days for possible delays, arrange alternative activities during rain, and monitor road conditions daily to ensure safety.",
category: "general",
tags: ["monsoon", "rain", "wet season", "landslides", "weather conditions"]
},
// Technology and Connectivity
{
question: "Is there WiFi available in northern Pakistan hotels?",
answer: "WiFi availability varies by location and accommodation type: Luxury and mid-range hotels in major towns (Gilgit, Skardu, Hunza center) offer WiFi, though speeds are typically 1-5 Mbps. Budget accommodations may have limited or no WiFi. Remote areas rely on cellular data where available. Most hotels offer WiFi in common areas even when not available in all rooms. For work-related travel, we can arrange accommodations with the most reliable connectivity and recommend purchasing a local SIM card as backup.",
category: "general",
tags: ["wifi", "internet", "connection", "online", "hotspot"]
},
{
question: "Which mobile SIM card is best for travelers in northern Pakistan?",
answer: "SCO (Special Communications Organization) SIM cards offer the best coverage in northern mountain regions, especially Gilgit-Baltistan and Azad Kashmir. Among commercial providers, Zong and Jazz have reasonable coverage in major northern towns. We recommend purchasing a prepaid tourist SIM upon arrival in Pakistan (available at airports with passport) with at least 10GB data package. For extended remote travel, consider renting a satellite phone from our office for emergency communication where no cellular coverage exists.",
category: "general",
tags: ["sim card", "mobile", "phone", "cellular", "communication"]
},
{
question: "Do you offer real-time tracking for family members to follow my trip?",
answer: "Yes, we offer an optional TravelTracker service for all northern Pakistan tours. This feature allows you to share your journey with family members through: daily location updates on an interactive map, check-in notifications, photo sharing directly from guides at scenic points, daily status updates with brief comments on activities completed, and emergency alerts if needed. This service uses minimal data and works with intermittent connectivity. Family members receive access credentials via email after booking is confirmed.",
category: "bookings",
tags: ["tracking", "location sharing", "family updates", "safety feature", "monitoring"]
},
{
  question: "What is the step-by-step process to book a trip on your website?",
  answer: "Our booking process is simple: 1) Browse destinations and select one that interests you, 2) Choose your preferred package duration (3, 5, or 7 days), 3) Click the 'Book Now' button which redirects you to our booking page, 4) Enter your personal details, travel dates, and group size, 5) Select any additional services or customizations, 6) Review your booking summary, 7) Complete payment using your preferred method, 8) Receive an instant confirmation email with booking details and a unique reference number. You can manage your booking through your account dashboard after confirmation.",
  category: "bookings",
  tags: ["booking process", "reservation", "how to book", "step by step", "online booking"]
},
{
  question: "What happens after I make a booking?",
  answer: "After completing your booking: 1) You'll receive an immediate confirmation email with your booking reference number and trip details, 2) Within 24 hours, our customer service team will contact you to confirm all details and answer any questions, 3) Two weeks before departure, you'll receive a detailed itinerary with pickup times, guide contact information, and a packing checklist, 4) Three days before your trip, your assigned guide will personally call to introduce themselves and confirm final arrangements, 5) On your departure day, you'll be picked up at the agreed location to begin your northern Pakistan adventure.",
  category: "bookings",
  tags: ["post-booking", "confirmation", "preparation", "pre-departure", "itinerary"]
},

// Payment Policies
{
  question: "What is your payment policy?",
  answer: "Our payment policy includes: 1) 30% deposit required at the time of booking to confirm your reservation, 2) Remaining balance due 30 days before your trip departure date, 3) For bookings made within 30 days of departure, full payment is required at the time of booking, 4) Special seasonal promotions may have different payment terms clearly specified during booking, 5) Group bookings of 10+ people qualify for customized payment schedules. All payments are securely processed through our encrypted payment gateway supporting major credit cards, bank transfers, and digital wallets.",
  category: "payments",
  tags: ["payment terms", "deposit", "balance", "transaction", "fees"]
},
{
  question: "Do you charge any hidden fees?",
  answer: "We maintain a strict no hidden fees policy. The price you see includes all standard services mentioned in the package description. You'll clearly see any additional charges for: premium activities not included in the base package, special permit fees for restricted areas (if applicable), equipment rental for specialized activities, optional travel insurance, and premium transportation upgrades. All potential additional costs are transparently displayed before you confirm your booking. There are no surprise charges or mandatory tips.",
  category: "payments",
  tags: ["hidden fees", "additional charges", "transparency", "pricing", "extra costs"]
},

// Cancellation Policies
{
  question: "What is your detailed cancellation policy?",
  answer: "Our cancellation policy is designed to be fair while protecting our local service providers: 1) Cancellations 60+ days before departure receive a 90% refund (10% administrative fee), 2) 30-59 days before departure: 70% refund, 3) 15-29 days: 50% refund, 4) 7-14 days: 25% refund, 5) Less than 7 days: no refund. For emergency cancellations with documentation (medical, natural disaster, immediate family emergency), we offer either full credit toward a future trip valid for 24 months or a 70% refund regardless of timing. All cancellations must be submitted in writing via email or through your account dashboard.",
  category: "bookings",
  tags: ["cancellation", "refund", "policy", "terms", "emergency cancellation"]
},
{
  question: "Can I change my travel dates after booking?",
  answer: "Yes, you can change your travel dates subject to these terms: 1) Date changes requested 30+ days before departure: free of charge once, subject to availability, 2) Changes 15-29 days before departure: incur a rescheduling fee of $50 per person, 3) Changes 8-14 days before departure: $100 per person fee applies, 4) Changes less than 7 days before departure are treated as cancellations per our cancellation policy. All date changes are subject to availability and seasonal price differences may apply. During peak seasons (summer months and Eid holidays), flexibility may be limited due to high demand.",
  category: "bookings",
  tags: ["date change", "reschedule", "modification", "itinerary change", "flexibility"]
},

// Complex Scenarios
{
  question: "What happens if there's extreme weather or natural disaster during my trip?",
  answer: "In case of extreme weather or natural disasters: 1) Your safety is our primary concern - our guides are trained in emergency procedures and carry satellite communication devices, 2) We monitor weather conditions continuously and may proactively modify itineraries if forecasts indicate risk, 3) If an area becomes inaccessible, we'll offer alternative destinations of equal value, 4) For significant disruptions, we provide additional nights' accommodation at our expense until travel becomes safe, 5) If more than 50% of your itinerary is affected, we offer partial refunds or credit toward future trips. All our tour packages include basic emergency evacuation coverage.",
  category: "general",
  tags: ["emergency", "weather", "disaster", "safety", "contingency", "evacuation"]
},
{
  question: "What if I get altitude sickness during my trip to northern areas?",
  answer: "For altitude sickness situations: 1) All our guides are trained to recognize and respond to altitude sickness symptoms, 2) Our itineraries are designed with proper acclimatization days when visiting high elevations, 3) If mild symptoms occur, guides will assist with appropriate measures like rest, hydration, and medication, 4) For moderate symptoms, we'll reorganize your itinerary to include descent to lower elevations while maintaining quality experiences, 5) In severe cases, we arrange immediate medical evacuation to the nearest medical facility at no extra cost if you've purchased our recommended travel insurance. We carry emergency oxygen supplies on all high-altitude tours.",
  category: "general",
  tags: ["altitude sickness", "mountain sickness", "medical", "emergency", "health", "evacuation"]
},
{
  question: "How do you handle special dietary requirements in remote areas?",
  answer: "We accommodate dietary requirements even in remote areas through: 1) Advance communication with all lodging and meal providers about your specific needs, 2) Dedicated food preparation to prevent cross-contamination for allergies, 3) Supplementary food items carried by guides when local options are limited, 4) Special arrangements with local families for authentic meals meeting your requirements, 5) Detailed meal plans provided before departure so you can prepare supplements if desired. For very strict requirements (severe allergies, complex medical diets), we recommend our private tours where we have maximum control over food preparation.",
  category: "general",
  tags: ["dietary restrictions", "food allergies", "special meals", "vegan", "gluten-free", "halal"]
},

// Unique Northern Pakistan Experiences
{
  question: "Can I experience local festivals during my trip to northern Pakistan?",
  answer: "Yes, northern Pakistan has vibrant festivals throughout the year that we can incorporate into your itinerary: Shandur Polo Festival (July) features the world's highest polo tournament between Chitral and Gilgit teams, Kalash spring festival (May) celebrates with unique traditions and colorful attire, Harvest festivals in Hunza (September-October) showcase traditional dances and local foods, Snow festivals in winter feature skiing competitions and snow sculptures. We offer special festival-focused itineraries with insider access to ceremonies, VIP seating at events, and opportunities to participate in celebrations alongside locals.",
  category: "activities",
  tags: ["festivals", "cultural events", "local celebrations", "traditional", "seasonal events"]
},
{
  question: "Do you offer specialized photography tours for capturing northern landscapes?",
  answer: "Yes, our specialized photography tours are designed by professional photographers who know northern Pakistan intimately. These packages include: 1) Timing visits to coincide with optimal lighting conditions at each location, 2) Extended stays at prime photography spots during golden hours, 3) Transport vehicles modified for camera equipment with charging facilities, 4) Access to exclusive vantage points away from tourist crowds, 5) Local guides who know hidden photogenic locations, 6) Optional aerial photography sessions where permitted, 7) Accommodations chosen for their proximity to sunrise/sunset locations. These tours maintain a flexible schedule adjusting to weather conditions and creative opportunities.",
  category: "activities",
  tags: ["photography", "camera", "landscape photography", "photo tour", "golden hour"]
},
{
  question: "What cultural immersion experiences do you offer in northern Pakistan?",
  answer: "Our cultural immersion experiences include: 1) Homestays with local families in Hunza, Baltistan, and Kalash Valley where you participate in daily activities, 2) Traditional craft workshops learning embroidery, woodcarving, or instrument-making from master artisans, 3) Cooking classes featuring regional specialties using local ingredients and traditional methods, 4) Participation in seasonal agricultural activities like apricot harvesting or walnut collection, 5) Special access to community events normally closed to outsiders, 6) Language mini-lessons to learn basic greetings and cultural phrases, 7) Traditional music evenings with local musicians. Each experience is arranged with respect for local customs and fair compensation to communities.",
  category: "activities",
  tags: ["cultural immersion", "local experience", "traditional", "homestay", "authentic", "community"]
},

// Specific Northern Pakistan Locations
{
  question: "What makes Passu Cones special and how can I best experience them?",
  answer: "Passu Cones (also called Cathedral Range) are jagged, symmetric mountain peaks in Upper Hunza that create one of Pakistan's most iconic landscapes. What makes them special: 1) Their distinctive saw-tooth appearance created by millions of years of glacial erosion, 2) Dramatic color changes throughout the day from golden at sunrise to deep red at sunset, 3) Cultural significance to local Wakhi people who consider them sacred. The best experiences include: Photography from Passu Glacier viewpoint, hiking the Hussaini Suspension Bridge for unique angles, staying in Passu village for sunrise/sunset views, and taking boat rides on Attabad Lake with the cones as backdrop. Our 'Hunza Photography Special' package includes two nights in Passu with expert photography guidance.",
  category: "destinations",
  tags: ["passu cones", "cathedral range", "hunza", "mountains", "photography", "iconic"]
},
{
  question: "I'm interested in visiting Fairy Meadows - what should I know about accessibility and accommodation?",
  answer: "Fairy Meadows, offering spectacular views of Nanga Parbat, requires specific preparation: Accessibility: The journey involves a 3-hour jeep ride from Raikot Bridge on rough mountain roads, followed by a 2-3 hour moderate trek or horseback ride (additional cost). Not suitable for people with mobility issues or severe fear of heights. Accommodation: Options range from basic wooden cabins with shared facilities to premium glamping tents with private bathrooms and heating. Electricity is limited (generator hours: 6-10pm). Advance booking is essential as space is limited. Best visited June-September; in May and October prepare for cold nights. Our packages include jeep arrangements, porter service for luggage, and priority accommodation reservations even during peak season.",
  category: "destinations",
  tags: ["fairy meadows", "nanga parbat", "accessibility", "accommodation", "trekking", "jeep ride"]
},

// Group and Family Travel
{
  question: "What special arrangements do you offer for family trips with children to northern areas?",
  answer: "Our family-friendly northern Pakistan tours include: 1) Customized itineraries with appropriate hiking distances for different age groups, 2) Accommodations with family rooms or connecting options, 3) Specially trained guides experienced with children, 4) Educational components about local wildlife, geography and culture presented in engaging ways, 5) Interactive experiences like treasure hunts in historic forts, 6) Kid-friendly menu options and meal timing flexibility, 7) Vehicles with proper child safety seats, 8) Emergency medical contacts specialized in pediatric care, 9) Activity packs for long drives, and 10) Adjusted altitude acclimatization schedules suitable for children. We also offer 'Kids Explore Free' promotions during school holiday periods where children under 12 receive free accommodation when sharing with parents.",
  category: "bookings",
  tags: ["family travel", "children", "kids", "family-friendly", "educational", "child safety"]
},
{
  question: "Can you arrange special celebrations during our trip like birthdays or anniversaries?",
  answer: "Yes, we specialize in making your celebrations memorable in the breathtaking settings of northern Pakistan. Our celebration packages include: 1) Custom cake arrangements even in remote locations, 2) Special decorations at your accommodation, 3) Surprise arrangements like breakfast at panoramic viewpoints, 4) Private cultural performances by local musicians, 5) Professional photography sessions to capture your special moment with mountain backdrops, 6) Custom gifts featuring local crafts with personalized messages, 7) Private candlelit dinners at scenic locations. Please mention your celebration when booking (at least 14 days advance notice recommended) so we can make appropriate arrangements with our local partners.",
  category: "bookings",
  tags: ["celebration", "birthday", "anniversary", "special occasion", "surprise", "personalized"]
},

// Technology and Modern Travel
{
  question: "Is there reliable internet connectivity for remote work during my northern Pakistan trip?",
  answer: "Internet connectivity in northern Pakistan varies significantly: Major towns (Gilgit, Skardu, Hunza center): Reasonably reliable 4G coverage and hotel WiFi (speeds typically 1-5 Mbps, sufficient for video calls with occasional interruptions); Secondary locations (smaller towns): Intermittent 3G/4G and basic WiFi in accommodations; Remote areas and high mountain regions: Limited to no connectivity. For digital nomads, we offer our 'Work & Wander' packages featuring: Accommodations selected for best available internet, backup connectivity solutions including portable WiFi devices, itineraries with alternating work-friendly and exploration days, and designated comfortable workspaces with mountain views. Always have offline materials prepared for important work.",
  category: "general",
  tags: ["internet", "wifi", "remote work", "digital nomad", "connectivity", "online"]
},
{
  question: "Do you have a mobile app for managing my booking and trip details?",
  answer: "Yes, our mobile app 'Northern Explorer' is available for iOS and Android devices to enhance your northern Pakistan journey. App features include: 1) Digital itinerary with real-time updates and notifications, 2) Offline maps and route tracking that work without internet connection, 3) Built-in translation for common phrases in regional languages, 4) Direct messaging with your guide and support team, 5) Emergency SOS button with GPS location sharing, 6) Daily weather forecasts for each destination, 7) Photo sharing platform to connect with other travelers, 8) Digital documentation storage for permits and bookings, 9) Checklist for packing and preparation. The app can be downloaded after booking confirmation, and we provide a brief tutorial during your trip orientation.",
  category: "general",
  tags: ["mobile app", "digital tools", "itinerary", "offline maps", "travel tech", "smartphone"]
},

// Local Expert Knowledge
{
  question: "What are some hidden gems in northern Pakistan that most tourists don't know about?",
  answer: "Our local experts recommend these lesser-known treasures: 1) Broghil Valley - near the Afghan border with pristine lakes and unique Wakhi culture, accessible only by special arrangement, 2) Phander Lake in Ghizer - crystal blue waters surrounded by poplar trees without the crowds of more famous lakes, 3) Khaplu Palace - a beautifully restored 19th century royal residence now offering heritage stays, 4) Shimshal Valley - the highest settlement in Pakistan with exceptional hiking and authentic culture, 5) Rama Meadows - less visited alternative to Fairy Meadows with views of Nanga Parbat, 6) Minapin - basecamp access to Rakaposhi with stunning glacier views and few tourists, 7) Ancient rock carvings near Chilas - prehistoric art rarely visited by international travelers. Our 'Hidden Northern Pakistan' tour covers several of these locations with expert guides.",
  category: "destinations",
  tags: ["hidden gems", "off-beaten-path", "secret spots", "unexplored", "authentic", "lesser known"]
},
{
  question: "What unique wildlife watching opportunities exist in northern Pakistan?",
  answer: "Northern Pakistan offers exceptional wildlife viewing opportunities: 1) Snow leopard tracking expeditions in Khunjerab National Park (winter months provide best sighting chances), 2) Markhor (national animal) observation in Chitral Gol with specialized hides and trackers, 3) Himalayan brown bear viewing in Deosai National Park during summer months, 4) Himalayan ibex viewing in Hunza's high valleys, 5) Birdwatching for Himalayan species including golden eagle, lammergeier vulture, and Himalayan snowcock, 6) Marco Polo sheep expeditions in permitted border regions. Our wildlife tours incorporate camera traps, high-quality spotting scopes, expert naturalist guides, and accommodation in eco-lodges that support conservation efforts. Photography instruction is available for wildlife photography techniques.",
  category: "activities",
  tags: ["wildlife", "animals", "birdwatching", "nature", "snow leopard", "conservation"]
},

// Seasonal Specialties
{
  question: "When is the best time to see the autumn colors in Hunza?",
  answer: "The spectacular autumn colors in Hunza Valley typically peak between mid-October to early November, with variation based on annual weather patterns. This transformation creates a breathtaking landscape where the poplar, apricot, and apple trees turn brilliant gold, orange and red against the backdrop of snow-capped mountains and clear blue skies. For photography, early morning and late afternoon provide the most dramatic lighting. We offer special 'Autumn Splendor' tours during this period that include: Extended stays in prime viewing locations, specially timed excursions for optimal lighting, photography workshops, and local harvest festival participation. Accommodations fill quickly during this season, so we recommend booking at least 4-6 months in advance.",
  category: "destinations",
  tags: ["autumn", "fall colors", "hunza", "foliage", "seasonal", "photography", "october"]
},
{
  question: "What special experiences are available during winter in northern Pakistan?",
  answer: "Winter (December-February) transforms northern Pakistan with unique experiences: 1) Skiing and snowboarding at Malam Jabba and Naltar resorts with equipment rental and instruction available, 2) Hot springs experiences in Gilgit region, more comfortable in winter's cold, 3) Clear winter air offering exceptional mountain photography without summer haze, 4) Snow leopard tracking expeditions when these elusive cats descend to lower elevations, 5) Frozen waterfall ice climbing for adventure seekers, 6) Traditional winter festivals featuring local sports like snow golf and yak polo, 7) Discounted accommodation rates and fewer tourists at major sites, 8) Cozy evenings with traditional music and storytelling around wood stoves. Our winter packages include proper cold-weather gear, specialized vehicles for snow conditions, and guides experienced with winter safety protocols.",
  category: "activities",
  tags: ["winter", "snow", "skiing", "cold weather", "seasonal activities", "off-season"]
},

// Combination Packages
{
  question: "Do you offer combined cultural and adventure packages?",
  answer: "Yes, our signature 'Culture & Adventure' packages blend immersive cultural experiences with thrilling activities. These balanced itineraries include: 1) Morning cultural visits to historical sites, craft workshops, or local homes followed by afternoon adventure activities, 2) Cultural performances in the evenings after active days, 3) Learning traditional skills like wool spinning or cooking between trekking segments, 4) Adventure activities led by local guides who share their cultural knowledge throughout, 5) Overnights alternating between heritage accommodations and adventure camps. Popular combinations include Hunza cultural exploration with Rakaposhi Base Camp trekking, Skardu historical sites with Shigar Valley rock climbing, and Chitral cultural immersion with Kalash Valley hiking. These packages offer a more complete northern Pakistan experience than single-focus tours.",
  category: "bookings",
  tags: ["combined package", "culture", "adventure", "mixed activities", "balanced", "multi-focus"]
},
{
  question: "Can you create a tour combining northern Pakistan with neighboring regions?",
  answer: "Yes, we offer cross-regional tours combining northern Pakistan with complementary destinations: 1) Northern Pakistan & China's Xinjiang: Travel the full Karakoram Highway across the border to Kashgar for Silk Road experiences (requires Chinese visa arranged 3+ months in advance), 2) Northern Pakistan & Ladakh: Experience diverse Himalayan cultures and landscapes (requires complicated logistics due to border situations; only certain nationalities eligible), 3) Pakistan Grand Tour: Combine northern mountains with historical sites in Lahore, Islamabad, and Peshawar for a complete Pakistan experience. These combination tours typically range from 14-21 days and require additional documentation. Our team handles all complex permit requirements and transportation arrangements across regions. These tours operate seasonally when all mountain passes are open.",
  category: "destinations",
  tags: ["combination", "multi-region", "cross-border", "expanded", "silk road", "comprehensive"]
},

// Sustainability and Responsible Tourism
{
  question: "How do your tours support local communities in northern Pakistan?",
  answer: "Our commitment to community support includes: 1) Employing local guides, porters, and support staff paid fair wages exceeding industry standards, 2) Using locally-owned accommodations rather than international chains, 3) Including meals at community-run restaurants and homestays, 4) Incorporating locally-made products and handicrafts with fair pricing direct to artisans, 5) Contributing 5% of profit to education projects in mountain communities, 6) Training programs for local youth to enter tourism professions, 7) Waste management initiatives in fragile mountain environments. We're proud that 70% of your payment remains in the local economy. Our 'Community Impact Report' is published annually on our website showing exactly how tourism dollars benefit local populations and measuring our carbon offset initiatives.",
  category: "general",
  tags: ["community support", "responsible tourism", "sustainable", "local economy", "fair trade", "ethical"]
},
{
  question: "What is your environmental policy for northern Pakistan tours?",
  answer: "Our environmental policy for fragile mountain ecosystems includes: 1) Strict waste management with 'pack it in, pack it out' protocols exceeding local requirements, 2) Limited group sizes (maximum 12 people) to minimize environmental impact, 3) Use of existing trails and campsites to prevent erosion and habitat disruption, 4) Water purification systems to eliminate plastic bottle waste, 5) Solar charging stations on trekking routes, 6) Local food sourcing to reduce transportation carbon footprint, 7) Leave No Trace principles training for all guides and clients, 8) Carbon offsetting program for vehicle emissions, 9) Support for local conservation initiatives including snow leopard protection programs. All clients receive our sustainability guidelines before travel, and compliance is monitored by guides throughout the journey.",
  category: "general",
  tags: ["environmental", "conservation", "sustainability", "eco-friendly", "responsible", "green travel"]
},

];

// Insert new entries and handle duplicates properly
const addNewEntries = async () => {
  try {
    let addedCount = 0;
    let duplicateCount = 0;
    
    // Process each entry individually to handle potential duplicates
    for(const entry of newEntries) {
      try {
        await KnowledgeBase.create(entry);
        addedCount++;
        console.log(`✅ Added: "${entry.question}"`);
      } catch (err) {
        if (err.code === 11000) { // Duplicate key error
          duplicateCount++;
          console.log(`⚠️ Duplicate (skipped): "${entry.question}"`);
        } else {
          throw err; // Re-throw if it's not a duplicate error
        }
      }
    }
    
    console.log(`🎉 Summary: Added ${addedCount} new entries, ${duplicateCount} duplicates skipped.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error adding new knowledge base entries:", error);
    mongoose.connection.close();
  }
};

// Run the function
addNewEntries();