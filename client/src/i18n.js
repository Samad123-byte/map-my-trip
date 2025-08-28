// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {

  en: {
    translation: {
     contactPage: {
    title: "Contact Us",
    description: "We'd love to hear from you. Please fill out the form below or use our contact information.",
    getInTouch: "Get In Touch",
    address: "123 Business Avenue, lahore",
    phone: "+1 (555) 123-4567",
    email: "MapMyTrip@gmail.com",
    hours: "Monday-Friday: 9am-5pm",
    sendMessage: "Send Us a Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    sendBtn: "Send Message",
    formSubmitted: "Thank you! Your message has been sent successfully."
  },
      booking: {
        title: "Book Your Trip to",
        defaultDestination: "Destination",
        loading: "Loading booking details...",
        errors: {
          failedToLoad: "Failed to load destination details",
          selectDate: "Please select a travel date",
          invalidEasypaisa: "Please enter a valid 11-digit Easypaisa number",
          bookingFailed: "Failed to complete booking. Please try again."
        },
        success: {
          confirmed: "Booking Confirmed!",
          transactionId: "Your transaction ID:",
          redirecting: "Redirecting to your bookings page..."
        },
        sections: {
          tripDetails: "Trip Details",
          contactInfo: "Contact Information",
          payment: "Payment",

        },
        fields: {
          travelDate: "Travel Date:",
          duration: "Duration:",
          travelers: "Number of Travelers:",
          accommodation: "Accommodation:",
          firstName: "First Name:",
          lastName: "Last Name:",
          email: "Email:",
          phone: "Phone:",
          specialRequests: "Special Requests:"
        },
        durations: {
          "3days": "3 Days",
          "5days": "5 Days",
          "7days": "7 Days"
        },
        payment: {
          method: "Payment Method:",
          basePrice: "Base Price:",
          accommodationAdjustment: "Accommodation Adjustment:",
          totalPrice: "Total Price:",
          travelers: "travelers",
          methods: {
            creditCard: "Credit Card",
            creditCardDesc: "Visa, MasterCard, American Express",
            paypal: "PayPal",
            paypalDesc: "Secure online payment",
            easypaisa: "Easypaisa",
            easypaisaDesc: "Pay with your mobile account"
          },
          easypaisaNumber: "Easypaisa Mobile Number:",
          easypaisaInfo1: "Please enter your 11-digit mobile number registered with Easypaisa",
          easypaisaInfo2: "You will receive a confirmation code to complete the payment",
          securityInfo: "Your payment information is encrypted and secure. We never store your full credit card details."
        },
        buttons: {
          processing: "Processing...",
          bookNow: "Book Now for PKR {{price}}"
        }
      },
        
      blog: {
        title: 'Mountain Journeys',
        subtitle: 'Discover breathtaking landscapes and adventures',
        categories: {
          all: 'All',
          destinations: 'Destinations',
          adventure: 'Adventure',
          food: 'Mountain Cuisine'
        },
        readMore: 'Read More',
        readTime: '{{count}} min read',
        posts: {
          hunza: {
            title: 'Exploring the Hidden Gems of Hunza Valley',
            excerpt: 'A journey through the magical landscapes of Pakistan\'s northern paradise',
            fullContent: 'Nestled in the heart of the Karakoram Mountains, Hunza Valley is a breathtaking destination that offers travelers an unparalleled experience of natural beauty and cultural richness. This remote valley, surrounded by towering peaks and ancient glaciers, is home to some of the most hospitable people on earth. Our expedition revealed stunning landscapes, from terraced fields of apricot trees to crystal-clear rivers cutting through rugged terrain.'
          },
          skardu: {
            title: 'Skardu: Gateway to Extreme Adventures',
            excerpt: 'Unleashing thrills in the adventure capital of Pakistan',
            fullContent: 'Skardu, located in the heart of Gilgit-Baltistan, is a paradise for adventure enthusiasts and nature lovers. This remarkable destination serves as a base camp for some of the world\'s most challenging mountain expeditions, including routes to K2, the second-highest peak on earth.'
          },
          mountainCuisine: {
            title: 'Mountain Cuisine: Flavors of the Peaks',
            excerpt: 'A culinary journey through traditional mountain recipes',
            fullContent: 'The mountain regions of Pakistan offer a culinary experience as spectacular as their landscapes. Our gastronomic exploration revealed a rich tapestry of flavors influenced by local traditions, available ingredients, and centuries of cultural exchange.'
          }
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common queries about your mountain adventure',
        categories: {
          booking: {
            title: 'Booking & Reservations',
            questions: {
              howToBook: {
                question: 'How do I book a mountain tour?',
                answer: 'Booking a mountain tour is easy! Visit our website, select your preferred destination and dates, fill out the booking form, and complete the payment. Our customer support team is available 24/7 to assist you with any questions.'
              },
              cancelModify: {
                question: 'Can I cancel or modify my booking?',
                answer: 'Yes, you can cancel or modify your booking up to 14 days before your scheduled tour. Cancellation fees may apply depending on the timing and type of tour. Please contact our customer support for detailed information.'
              }
            }
          },
          payments: {
            title: 'Payments & Methods',
            questions: {
              paymentMethods: {
                question: 'What payment methods do you accept?',
                answer: 'We accept multiple payment methods including credit/debit cards, bank transfers, PayPal, and local payment platforms like EasyPaisa.'
              },
              easyPaisa: {
                question: 'How do I use EasyPaisa for payment?',
                answer: 'EasyPaisa is a convenient mobile wallet and payment service. Simply select EasyPaisa at checkout, enter your mobile number, and follow the prompts to complete your transaction.'
              }
            }
          },
          travel: {
            title: 'Travel Preparation',
            questions: {
              specialty: {
                question: 'What makes your mountain tours special?',
                answer: 'Our mountain tours are curated by local experts with deep knowledge of the region. We offer unique experiences, sustainable tourism, and support local communities while providing safe and memorable adventures.'
              },
              packing: {
                question: 'What should I pack for a mountain tour?',
                answer: 'Pack layers of clothing, sturdy hiking boots, waterproof gear, personal medications, sun protection, and a good camera. We provide a detailed packing list upon booking.'
              }
            }
          },
          support: {
            title: 'Customer Support',
            questions: {
              contact: {
                question: 'How can I contact customer support?',
                answer: 'You can reach our customer support via email at support@mountainjourneys.com, phone at +92 123 4567890, or through our 24/7 live chat on our website.'
              }
            }
          }
        }
      },
      payment: {
        title: "Complete Your Payment",
        bookingSummary: "Booking Summary",
        destination: "Destination",
        selectedDestination: "Selected Destination",
        duration: "Duration",
        duration3Days: "3 Days",
        duration5Days: "5 Days",
        duration7Days: "7 Days",
        travelers: "Travelers",
        accommodation: "Accommodation",
        totalAmount: "Total Amount",
        paymentDetails: "Payment Details",
        email: "Email",
        enterEmail: "Enter your email",
        paymentMethod: "Payment Method",
        methods: {
          creditCard: "Credit Card",
          paypal: "PayPal",
          easyPaisa: "EasyPaisa",
          jazzCash: "JazzCash"
        },
        creditCard: {
          cardNumber: "Card Number",
          expiryDate: "Expiry Date",
          cvc: "CVC",
          securityMessage: "Your card details are secure and encrypted."
        },
        easypaisa: {
          mobileNumber: "EasyPaisa Mobile Number",
          instruction: "Enter your EasyPaisa registered mobile number."
        },
        jazzcash: {
          mobileNumber: "JazzCash Mobile Number",
          instruction: "Enter your JazzCash registered mobile number."
        },
        confirmationCode: {
          label: "Enter Confirmation Code",
          placeholder: "Enter the 4-digit code sent to your mobile",
          sent: "A confirmation code has been sent to your mobile number {{mobileNumber}}.",
          demo: "For demo purposes, use code: {{code}}"
        },
        paypal: {
          redirectMessage: "You will be redirected to PayPal to complete your payment securely.",
          checkoutTitle: "PayPal Checkout",
          processing: "Processing your payment with PayPal...",
          amount: "Amount: PKR {{amount}}"
        },
        buttons: {
          back: "Back",
          confirmPayment: "Confirm Payment",
          cancel: "Cancel",
          processing: "Processing...",
          continuePaypal: "Continue to PayPal",
          pay: "Pay PKR {{amount}}",
          payNow: "Pay Now"
        },
        processing: "Processing your payment...",
        success: {
          title: "Payment Successful!",
          message: "Your booking has been confirmed.",
          redirecting: "Redirecting to your bookings..."
        },
        backToBookings: "Go Back to My Bookings",
        errors: {
          failedToLoadBooking: "Failed to load booking details. Please try again.",
          emailRequired: "Email is required",
          selectPaymentMethod: "Please select a payment method",
          fillCardDetails: "Please fill in all credit card details",
          invalidCardNumber: "Please enter a valid card number",
          invalidExpiry: "Please enter a valid expiry date (MM/YY)",
          invalidCvc: "Please enter a valid security code",
          invalidMobileNumber: "Please enter a valid mobile number",
          invalidConfirmationCode: "Please enter a valid confirmation code",
          paymentFailed: "Payment failed. Please try again.",
          processingFailed: "Payment processing failed. Please try again later."
        }
      },
     
    //header
      home: 'Home',
      destinations: 'Destinations',
       wishlist: "Wishlist",
      aboutUs: 'About Us',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      tagline: 'Explore. Discover. Adventure.',
      switchToDarkMode: "Switch to Dark Mode",  
      switchToLightMode: "Switch to Light Mode", 
       // Home page translations
       discoverNextAdventure: 'Discover Your Next Adventure',
       heroDescription: 'Discover the breathtaking landscapes, towering mountains, and serene valleys of Northern Pakistan. From the snow-capped peaks of Skardu to the lush green meadows of Naran and Hunza, experience nature like never before.',
       startExploring: 'Start Exploring',
       journeyBeginsHere: 'Your Journey Begins Here',
       introDescription: 'We\'ve curated the most extraordinary travel experiences for adventurers like you. With expert guides, exclusive accommodations, and carefully planned itineraries, all you need to do is pack your bags and embark on an unforgettable journey.',
       idealVacationLength: 'How long is your ideal vacation?',
       weekendEscape: 'Weekend Escape',
       oneToTwoWeeks: '1-2 Weeks',
       extendedTrip: 'Extended Trip',
       popularDestinations: 'Popular Destinations',
       from: 'From',
       threeDays: '3 days',
       fiveDays: '5 days',
       sevenDays: '7 days',
       viewDetails: 'View Details',
       viewAllDestinations: 'View All Destinations',
       readyForNextAdventure: 'Ready for Your Next Adventure?',
       ctaDescription: 'Join thousands of travelers who have experienced the beauty of Pakistan with us. Special offers available for early bookings and group adventures.',
       findYourTrip: 'Find Your Trip',
       contactExperts: 'Contact Our Experts',
       loadingDestinations: 'Loading amazing destinations...',
       tryAgain: 'Try Again',
       failedToLoadDestinations: 'Failed to load destinations',

       //register
       joinUs: 'Join us and start your travel journey',
       firstName: 'First Name',
       lastName: 'Last Name',
       email: 'Email',
       password: 'Password',
       confirmPassword: 'Confirm Password',
       firstNamePlaceholder: 'John',
       lastNamePlaceholder: 'Doe',
       emailPlaceholder: 'your@email.com',
       passwordPlaceholder: 'Create a password',
       confirmPasswordPlaceholder: 'Confirm your password',
       termsAgreement: 'I agree to the',
       termsOfService: 'Terms of Service',
       and: 'and',
       privacyPolicy: 'Privacy Policy',
       createAccount: 'Create Account',
       creatingAccount: 'Creating Account...',
       alreadyHaveAccount: 'Already have an account?',
       signIn: 'Sign in',
       registrationSuccessful: 'Registration Successful!',
       welcomeAboard: 'Welcome aboard! Check your email to verify your account.',
       goToLogin: 'Go to Login',
       passwordsDoNotMatch: 'Passwords do not match',
       quote: 'Travel isn\'t always pretty. It isn\'t always comfortable. But that\'s okay. The journey changes you.',
       quoteAuthor: 'Anthony Bourdain',
       'passwordStrength.0': 'Too weak',
       'passwordStrength.1': 'Too weak',
       'passwordStrength.2': 'Could be stronger',
       'passwordStrength.3': 'Medium strength',
       'passwordStrength.4': 'Strong password',
       'passwordStrength.5': 'Very strong password',
       //login
            welcomeBack: 'Welcome Back',
        signInToContinue: 'Sign in to continue your adventure',
        loginSuccessful: 'Login Successful!',
        redirectingToAccount: 'Redirecting you to your account...',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        signingIn: 'Signing in...',
        dontHaveAccount: 'Don\'t have an account?',
        fillAllFields: 'Please fill in all required fields',
        loginFailed: 'Login failed',
        loginFailedCheckCredentials: 'Login failed. Please check your credentials.',
        passwordLoginPlaceholder: 'Your password',
        loginQuote: '"The journey of a thousand miles begins with a single step."',
        loginQuoteAuthor: '— Lao Tzu',

        //destinationdetails
        failedToLoadDestinations: 'Failed to load destinations',
        activity1: 'Sightseeing and photography of scenic landscapes',
        activity2: 'Hiking on beautiful mountain trails',
        activity3: 'Exploring local markets and handicrafts',
        activity4: 'Visiting historical sites and cultural landmarks',
        activity5: 'Experiencing local cuisine and traditional meals',
  
        standardHotel: 'Standard Hotel',
        standardHotelDesc: 'Comfortable rooms with basic amenities',
        luxuryResort: 'Luxury Resort',
        luxuryResortDesc: 'Spacious rooms with premium facilities and views',
        localGuesthouse: 'Local Guesthouse',
        localGuesthouseDesc: 'Authentic experience with local families',
  
        bestTimeToVisit: 'April to October',
  
        review1: 'Absolutely amazing experience! The scenery was breathtaking and our guide was knowledgeable.',
        review2: 'Beautiful destination with great accommodation.',
        review3: 'One of the best trips we\'ve ever taken. Highly recommended for families!',
  
        backToDestinations: 'Back to Destinations',
        overview: 'Overview',
        itinerary: 'Itinerary',
        accommodations: 'Accommodations',
        reviews: 'Reviews',
        hotelAccommodation: "Hotel Accommodation",
        transportation: "Transportation",
        dailyBreakfast: "Daily Breakfast",
        localGuide: "Local Guide",
        packagePrice: "Package Price",
        priceIncludes: "Includes accommodation, guided tours, and transportation",
        departureDates: "Departure Dates",
        everySaturday: "Every Saturday",
        groupSize: "Group Size",
        maximumPeople: "Maximum 15 people",
        bookingPolicy: "Booking Policy",
        advancePayment: "50% advance payment required",

        bookThisTrip: 'Book This Trip',
        departureDates: 'Departure Dates',
        groupSize: 'Group Size',
        bookingPolicy: 'Booking Policy',
        advancePayment: '50% advance payment required',

        aboutTagline: 'Sharing Pakistan\'s natural beauty with the world since 2018',
        ourStory: 'Our Story',
        northernPakistanMountains: 'Northern Pakistan mountains',
        storyParagraph1: 'Map My Trip was founded with a simple mission: to showcase the breathtaking beauty of Pakistan\'s northern areas while supporting local communities and promoting sustainable tourism.',
        storyParagraph2: 'What began as a small passion project by a group of adventure enthusiasts has grown into a trusted travel service that has helped thousands of travelers experience the magic of Pakistan\'s mountains, valleys, and cultures.',
        storyParagraph3: 'We believe that travel should be transformative, educational, and responsible. Our team consists of local experts who are passionate about sharing their homeland with visitors while ensuring that tourism benefits local communities and preserves the natural environment.',
        
        ourValues: 'Our Values',
        environmentalResponsibility: 'Environmental Responsibility',
        environmentalResponsibilityDesc: 'We minimize our ecological footprint through waste management programs, supporting conservation efforts, and educating travelers on sustainable practices.',
        communitySupport: 'Community Support',
        communitySupportDesc: 'We employ local guides, stay in locally-owned accommodations, and contribute a portion of our profits to community development projects.',
        safetyFirst: 'Safety First',
        safetyFirstDesc: 'Your safety is our priority. We maintain high safety standards, provide comprehensive pre-trip information, and offer 24/7 support during your journey.',
        authenticExperiences: 'Authentic Experiences',
        authenticExperiencesDesc: 'We go beyond tourist attractions to provide genuine cultural exchanges and off-the-beaten-path adventures that connect you with the real Pakistan.',
        
        meetOurTeam: 'Meet Our Team',
        founder: 'Founder & CEO',
        founderBio: 'With over 15 years of experience exploring Pakistan\'s northern regions, Imran founded Map My Trip to share his passion for adventure and cultural exploration.',
        operations: 'Head of Operations',
        operationsBio: 'Sara ensures that all our trips run smoothly, from transportation logistics to accommodation arrangements, making every journey hassle-free.',
        tourGuide: 'Senior Tour Guide',
        tourGuideBio: 'Born and raised in Hunza, Ali has intimate knowledge of the northern areas and speaks several local languages, enriching your travel experience.',
        customerRelations: 'Customer Relations',
        customerRelationsBio: 'Zainab is dedicated to providing exceptional service before, during, and after your trip, ensuring all your needs are met with a smile.',
        
        whatOurTravelersSay: 'What Our Travelers Say',
        karachi: 'Karachi',
        lahore: 'Lahore',
        islamabad: 'Islamabad',
        testimonial1: 'Our trip to Hunza was absolutely life-changing. The guides were knowledgeable, the accommodations comfortable, and the scenery breathtaking!',
        testimonial2: 'As a solo female traveler, I was concerned about safety, but Map My Trip made me feel secure throughout my journey in Skardu. Highly recommended!',
        testimonial3: 'Our family trip to Naran was perfectly organized, with activities suitable for all ages. My children still talk about the adventure!',
        
        readyToExperience: 'Ready to Experience Pakistan\'s Beauty?',
        joinUsOnJourney: 'Join us on an unforgettable journey through Pakistan\'s northern paradise',
        browseDestinations: 'Browse Destinations',

        "Loading destinations...": "Loading destinations...",
        "Explore Our Destinations": "Explore Our Destinations",
        "View Details": "View Details",
         
        myWishlist: 'My Wishlist',
        loading: 'Loading...',
        failedToLoadWishlist: 'Failed to load wishlist. Please try again later.',
        wishlistEmpty: 'Your wishlist is empty',
        exploreDestinations: 'Explore Destinations',
        unnamedDestination: 'Unnamed Destination',
        // viewDetails already exists in your translations
        remove: 'Remove',

        customizeYourTrip: "Customize Your Trip",
        requestSubmittedSuccessfully: "Your custom tour request has been submitted successfully! Our team will contact you soon.",
        errorSubmittingRequest: "There was an error submitting your request. Please try again.",
        contactInformation: "Contact Information",
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        tripDetails: "Trip Details",
        startDate: "Start Date",
        endDate: "End Date",
        numberOfTravelers: "Number of Travelers",
        preferences: "Preferences",
        travelPreferences: "Travel Preferences",
        selectMultiple: "select multiple",
        adventure: "Adventure",
        cultural: "Cultural",
        relaxation: "Relaxation",
        wildlife: "Wildlife",
        historical: "Historical",
        accommodationPreference: "Accommodation Preference",
        budget: "Budget",
        standard: "Standard",
        luxury: "Luxury",
        budgetRange: "Budget Range",
        economy: "Economy (PKR 20,000-50,000 per person)",
        medium: "Medium (PKR 50,000-100,000 per person)",
        luxuryBudget: "Luxury (PKR 100,000+ per person)",
        additionalOptions: "Additional Options",
        includeInPackage: "Include in Package",
        transportation: "Transportation",
        tourGuide: "Tour Guide",
        allMeals: "All Meals",
        specialRequirements: "Special Requirements or Requests",
        specialRequirementsPlaceholder: "Any special requests, dietary restrictions, accessibility needs, or activities you'd like to include...",
        submitting: "Submitting...",
        requestCustomTour: "Request Custom Tour",
        customTourNote: "* Our team will contact you within 24 hours to discuss your custom tour details and provide a personalized quote.",
        backToDestination: 'Back to Destination',

        viewMyBookings: 'View My Bookings',
    myBookings: {
    title: 'My Bookings',
    loading: 'Loading your bookings...',
    error: 'Error loading your bookings. Please try again later.',
    noBookings: 'You don\'t have any bookings yet.',
    exploreDestinations: 'Explore Destinations',
    shareTitle: 'My next trip to {{destination}}',
    shareDescription: 'I\'m going to {{destination}} {{location}}',
    shareLocation: 'in {{location}}',
    bookingDetails: {
      bookingId: 'Booking ID:',
      destination: 'Destination:',
      date: 'Date:',
      duration: 'Duration:',
      travelers: 'Travelers:',
      accommodation: 'Accommodation:',
      totalPrice: 'Total Price:',
      status: 'Status:',
      unknownDestination: 'Unknown Destination',
    },
    actions: {
      cancelBooking: 'Cancel Booking',
      viewDestination: 'View Destination',
      confirmCancel: 'Are you sure you want to cancel this booking?',
    },
    durations: {
      '3days': '3 Days',
      '5days': '5 Days',
      '7days': '7 Days',
      '14days': '14 Days',
    }
  },
  tryAgain: 'Try Again',
    },
    
    available: "Available",
    unavailable: "Currently Unavailable",
    highlights: "Highlights", 
    currentlyUnavailable: "Currently Unavailable",
    day1Title: "Arrival & Orientation",
day1Desc: "Arrival at destination, check-in to accommodation, welcome dinner and briefing about the tour.",
day2Title: "Exploration Day",
day2Desc: "Full day exploring main attractions including guided tours and free time.",
day3Title: "Departure Day",
day3Desc: "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.",
day2Title5: "Local Exploration",
day2Desc5: "Exploring main attractions with a local guide.",
day3Title5: "Adventure Day",
day3Desc5: "Full day of outdoor activities and adventures appropriate to the destination.",
day4Title: "Cultural Immersion",
day4Desc: "Experiencing local culture, traditions, and cuisine with local community interactions.",
day5Title: "Departure Day",
day5Desc: "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.",
day5Title7: "Hidden Gems Tour",
day5Desc7: "Visiting off-the-beaten-path locations known mainly to locals.",
day6Title: "Relaxation Day",
day6Desc: "Free day to relax, revisit favorite spots, or try optional activities.",
day7Title: "Departure Day",
day7Desc: "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.",


review: {
  writeAReview: "Write a Review",
  rating: "Rating",
  reviewTitle: "Review Title",
  reviewTitlePlaceholder: "Summarize your experience or highlight what stood out",
  yourReview: "Your Review",
  reviewCommentPlaceholder: "Tell others about your experience - what you enjoyed, what could be improved...",
  dateOfVisit: "Date of Visit",
  uploadPhotos: "Upload Photos",
  optional: "optional",
  photoGuidelines: "Please upload images in JPG, JPEG, or PNG format (max 5MB each)",
  invalidImageFiles: "Please upload images in JPG or PNG format only (max 5MB each)",
  titleRequired: "Please provide a title for your review",
  commentTooShort: "Your review must be at least 10 characters long",
  dateRequired: "Please select the date of your visit",
  futureDateInvalid: "You can't select a future date",
  reviewSubmittedAwaitingApproval: "Thank you! Your review has been submitted and is awaiting approval.",
  alreadyReviewed: "You have already reviewed this destination",
  reviewSubmitError: "An error occurred while submitting your review. Please try again later.",
  submitting: "Submitting...",
  submitReview: "Submit Review",
},




  },
  es: {
    translation: {
      review: {
    writeAReview: "Escribir una Reseña",
    rating: "Puntuación",
    reviewTitle: "Título de la Reseña",
    reviewTitlePlaceholder: "Resume tu experiencia o destaca lo que más te llamó la atención",
    yourReview: "Tu Reseña",
    reviewCommentPlaceholder: "Cuéntale a otros sobre tu experiencia - lo que disfrutaste, lo que podría mejorarse...",
    dateOfVisit: "Fecha de la Visita",
    uploadPhotos: "Subir Fotos",
    optional: "opcional",
    photoGuidelines: "Por favor sube imágenes en formato JPG, JPEG o PNG (máximo 5MB cada una)",
    submitting: "Enviando...",
    submitReview: "Enviar Reseña",
    titleRequired: "Por favor proporciona un título para tu reseña",
    commentTooShort: "Tu reseña debe tener al menos 10 caracteres",
    dateRequired: "Por favor selecciona la fecha de tu visita",
    futureDateInvalid: "No puedes seleccionar una fecha futura",
    invalidImageFiles: "Por favor sube imágenes solo en formato JPG o PNG (máximo 5MB cada una)",
    reviewSubmittedAwaitingApproval: "¡Gracias! Tu reseña ha sido enviada y está pendiente de aprobación.",
    alreadyReviewed: "Ya has publicado una reseña para este destino",
    reviewSubmitError: "Ocurrió un error al enviar tu reseña. Por favor intenta de nuevo más tarde."
  },
      contactPage: {
        title: "Contáctanos",
        description: "Nos encantaría saber de ti. Por favor completa el siguiente formulario o utiliza nuestra información de contacto.",
        getInTouch: "Ponte en contacto",
        address: "123 Avenida Empresarial, Lahore",
        phone: "+1 (555) 123-4567",
        email: "MapMyTrip@gmail.com",
        hours: "Lunes a Viernes: 9am-5pm",
        sendMessage: "Envíanos un mensaje",
        yourName: "Tu nombre",
        yourEmail: "Tu correo electrónico",
        subject: "Asunto",
        yourMessage: "Tu mensaje",
        sendBtn: "Enviar mensaje",
        formSubmitted: "¡Gracias! Tu mensaje ha sido enviado con éxito."
      },
    
      booking: {
        title: "Reserve su viaje a",
defaultDestination: "Destino",
loading: "Cargando detalles de la reserva...",
errors: {
failedToLoad: "No se pudieron cargar los detalles del destino",
selectDate: "Por favor seleccione una fecha de viaje",
invalidEasypaisa: "Por favor ingrese un número Easypaisa válido de 11 dígitos",
bookingFailed: "No se pudo completar la reserva. Por favor, inténtelo de nuevo."
},
success: {
confirmed: "¡Reserva Confirmada!",
transactionId: "Su ID de transacción:",
redirecting: "Redirigiendo a su página de reservas..."
},
sections: {
tripDetails: "Detalles del Viaje",
contactInfo: "Información de Contacto",
payment: "Pago",
bookingSummary: "Resumen de Reserva",
},
fields: {
travelDate: "Fecha de Viaje:",
duration: "Duración:",
travelers: "Número de Viajeros:",
accommodation: "Alojamiento:",
firstName: "Nombre:",
lastName: "Apellido:",
email: "Correo Electrónico:",
phone: "Teléfono:",
specialRequests: "Peticiones Especiales:"
},
durations: {
"3days": "3 Días",
"5days": "5 Días",
"7days": "7 Días"
},
payment: {
basePrice: "Precio Base:",
travelers: "viajeros",
accommodationAdjustment: "Ajuste de Alojamiento:",
totalPrice: "Precio Total:",
method: "Método de Pago:",
methods: {
creditCard: "Tarjeta de Crédito",
creditCardDesc: "Visa, MasterCard, American Express",
paypal: "PayPal",
paypalDesc: "Pago en línea seguro",
easypaisa: "Easypaisa",
easypaisaDesc: "Pague con su cuenta móvil"
},
easypaisaNumber: "Número Móvil de Easypaisa:",
easypaisaInfo1: "Por favor ingrese su número móvil de 11 dígitos registrado con Easypaisa",
easypaisaInfo2: "Recibirá un código de confirmación para completar el pago",
securityInfo: "Su información de pago está encriptada y segura. Nunca almacenamos los detalles completos de su tarjeta de crédito."
},
buttons: {
processing: "Procesando...",
bookNow: "Reserve Ahora por PKR {{price}}",
continueToPayment: "Continuar al Pago",
}
      },

      blog: {
        title: 'Viajes de Montaña',
        subtitle: 'Descubre paisajes impresionantes y aventuras',
        categories: {
          all: 'Todo',
          destinations: 'Destinos',
          adventure: 'Aventura',
          food: 'Cocina de Montaña'
        },
        readMore: 'Leer más',
        readTime: '{{count}} min de lectura',
        posts: {
          hunza: {
            title: 'Explorando las Joyas Escondidas del Valle de Hunza',
            excerpt: 'Un viaje a través de los mágicos paisajes del paraíso del norte de Pakistán',
            fullContent: 'Ubicado en el corazón de las Montañas Karakoram, el Valle de Hunza es un destino impresionante que ofrece a los viajeros una experiencia sin igual de belleza natural y riqueza cultural. Este remoto valle, rodeado de picos imponentes y glaciares antiguos, alberga a algunas de las personas más hospitalarias de la tierra. Nuestra expedición reveló paisajes impresionantes, desde campos escalonados de árboles de albaricoque hasta ríos cristalinos que cortan un terreno agreste.'
          },
          skardu: {
            title: 'Skardu: Puerta a Aventuras Extremas',
            excerpt: 'Desatando emociones en la capital de la aventura de Pakistán',
            fullContent: 'Skardu, ubicado en el corazón de Gilgit-Baltistán, es un paraíso para entusiastas de la aventura y amantes de la naturaleza. Este extraordinario destino sirve como campamento base para algunas de las expediciones montañosas más desafiantes del mundo, incluyendo rutas al K2, el segundo pico más alto de la tierra.'
          },
          mountainCuisine: {
            title: 'Cocina de Montaña: Sabores de las Cumbres',
            excerpt: 'Un viaje culinario a través de recetas tradicionales de montaña',
            fullContent: 'Las regiones montañosas de Pakistán ofrecen una experiencia culinaria tan espectacular como sus paisajes. Nuestra exploración gastronómica reveló un rico tapiz de sabores influenciados por tradiciones locales, ingredientes disponibles e intercambios culturales seculares.'
          }
        }
      },
      faq: {
        title: 'Preguntas Frecuentes',
        subtitle: 'Encuentre respuestas a consultas comunes sobre su aventura de montaña',
        categories: {
          booking: {
            title: 'Reservas',
            questions: {
              howToBook: {
                question: '¿Cómo reservo un tour de montaña?',
                answer: '¡Reservar un tour de montaña es fácil! Visite nuestro sitio web, seleccione su destino y fechas preferidas, complete el formulario de reserva y realice el pago. Nuestro equipo de soporte al cliente está disponible las 24 horas para ayudarle con cualquier pregunta.'
              },
              cancelModify: {
                question: '¿Puedo cancelar o modificar mi reserva?',
                answer: 'Sí, puede cancelar o modificar su reserva hasta 14 días antes de su tour programado. Pueden aplicarse tarifas de cancelación dependiendo del momento y tipo de tour. Por favor, contacte a nuestro soporte al cliente para obtener información detallada.'
              }
            }
          },
          payments: {
            title: 'Pagos y Métodos',
            questions: {
              paymentMethods: {
                question: '¿Qué métodos de pago aceptan?',
                answer: 'Aceptamos múltiples métodos de pago, incluyendo tarjetas de crédito/débito, transferencias bancarias, PayPal y plataformas de pago locales como EasyPaisa.'
              },
              easyPaisa: {
                question: '¿Cómo uso EasyPaisa para pagar?',
                answer: 'EasyPaisa es un servicio de billetera móvil y pago conveniente. Simplemente seleccione EasyPaisa al momento de pagar, ingrese su número de móvil y siga las indicaciones para completar su transacción.'
              }
            }
          },
          travel: {
            title: 'Preparación para el Viaje',
            questions: {
              specialty: {
                question: '¿Qué hace especiales a sus tours de montaña?',
                answer: 'Nuestros tours de montaña están curados por expertos locales con profundo conocimiento de la región. Ofrecemos experiencias únicas, turismo sostenible y apoyo a las comunidades locales mientras proporcionamos aventuras seguras y memorables.'
              },
              packing: {
                question: '¿Qué debo empacar para un tour de montaña?',
                answer: 'Empaque capas de ropa, botas de senderismo resistentes, equipo impermeable, medicamentos personales, protección solar y una buena cámara. Proporcionamos una lista detallada de empaque al realizar la reserva.'
              }
            }
          },
          support: {
            title: 'Soporte al Cliente',
            questions: {
              contact: {
                question: '¿Cómo puedo contactar al soporte al cliente?',
                answer: 'Puede comunicarse con nuestro soporte al cliente por correo electrónico a support@mountainjourneys.com, teléfono al +92 123 4567890, o a través de nuestro chat en vivo 24/7 en nuestro sitio web.'
              }
            }
          }
        }
      },
     
      payment: {
        title: "Completa tu pago",
        bookingSummary: "Resumen de reserva",
        destination: "Destino",
        selectedDestination: "Destino seleccionado",
        duration: "Duración",
        duration3Days: "3 días",
        duration5Days: "5 días",
        duration7Days: "7 días",
        travelers: "Viajeros",
        accommodation: "Alojamiento",
        totalAmount: "Cantidad total",
        paymentDetails: "Detalles de pago",
        email: "Correo electrónico",
        enterEmail: "Introduce tu correo electrónico",
        paymentMethod: "Método de pago",
        methods: {
          creditCard: "Tarjeta de crédito",
          paypal: "PayPal",
          easyPaisa: "EasyPaisa",
          jazzCash: "JazzCash"
        },
        creditCard: {
          cardNumber: "Número de tarjeta",
          expiryDate: "Fecha de expiración",
          cvc: "CVC",
          securityMessage: "Los detalles de tu tarjeta están seguros y cifrados."
        },
        easypaisa: {
          mobileNumber: "Número de móvil EasyPaisa",
          instruction: "Introduce el número de móvil registrado en EasyPaisa."
        },
        jazzcash: {
          mobileNumber: "Número de móvil JazzCash",
          instruction: "Introduce el número de móvil registrado en JazzCash."
        },
        confirmationCode: {
          label: "Introduce el código de confirmación",
          placeholder: "Introduce el código de 4 dígitos enviado a tu móvil",
          sent: "Se ha enviado un código de confirmación a tu número {mobileNumber}.",
          demo: "Para propósitos de demostración, usa el código: {code}"
        },
        paypal: {
          redirectMessage: "Serás redirigido a PayPal para completar tu pago de forma segura.",
          checkoutTitle: "Pago con PayPal",
          processing: "Procesando tu pago con PayPal...",
          amount: "Cantidad: PKR {amount}"
        },
        buttons: {
          back: "Atrás",
          confirmPayment: "Confirmar pago",
          cancel: "Cancelar",
          processing: "Procesando...",
          continuePaypal: "Continuar a PayPal",
          pay: "Pagar PKR {amount}",
          payNow: "Pagar ahora"
        },
        processing: "Procesando tu pago...",
        success: {
          title: "¡Pago exitoso!",
          message: "Tu reserva ha sido confirmada.",
          redirecting: "Redirigiendo a tus reservas..."
        },
        backToBookings: "Volver a mis reservas",
        errors: {
          failedToLoadBooking: "No se pudieron cargar los detalles de la reserva. Por favor, inténtalo de nuevo.",
          emailRequired: "El correo electrónico es obligatorio",
          selectPaymentMethod: "Por favor, selecciona un método de pago",
          fillCardDetails: "Por favor, completa todos los detalles de la tarjeta de crédito",
          invalidCardNumber: "Por favor, introduce un número de tarjeta válido",
          invalidExpiry: "Por favor, introduce una fecha de expiración válida (MM/AA)",
          invalidCvc: "Por favor, introduce un código de seguridad válido",
          invalidMobileNumber: "Por favor, introduce un número de móvil válido",
          invalidConfirmationCode: "Por favor, introduce un código de confirmación válido",
          paymentFailed: "El pago falló. Por favor, inténtalo de nuevo.",
          processingFailed: "El procesamiento del pago falló. Por favor, inténtalo más tarde."
        }
      },
      
      home: 'Inicio',
      destinations: 'Destinos',
       wishlist: "Lista de Deseos",
      aboutUs: 'Sobre Nosotros',
      contact: 'Contacto',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      tagline: 'Explora. Descubre. Aventura.',
      bestTimeToVisit: "Mejor época para visitar",
      bestTimeToVisitLabel: "Mejor época para visitar",
      location: "Ubicación",
      startingPrice: "Precio inicial",
      activitiesExperiences: "Actividades y Experiencias",
      highlights: "Destacados",
      about: "Acerca de",
      available: "Disponible",
      unavailable: "Actualmente No Disponible",
      save: "Guardar",
      saved: "Guardado",
      shareDestination: "Compartir este destino",
      exploreHighlights: "Explorar destacados",
      discoverNextAdventure: 'Descubre Tu Próxima Aventura',
      heroDescription: 'Descubre los impresionantes paisajes, imponentes montañas y serenos valles del norte de Pakistán. Desde los picos nevados de Skardu hasta las verdes praderas de Naran y Hunza, experimenta la naturaleza como nunca antes.',
      startExploring: 'Comienza a Explorar',
      journeyBeginsHere: 'Tu Viaje Comienza Aquí',
      introDescription: 'Hemos seleccionado las experiencias de viaje más extraordinarias para aventureros como tú. Con guías expertos, alojamientos exclusivos e itinerarios cuidadosamente planificados, todo lo que necesitas hacer es preparar tu equipaje y embarcarte en un viaje inolvidable.',
      idealVacationLength: '¿Cuánto dura tus vacaciones ideales?',
      weekendEscape: 'Escapada de Fin de Semana',
      oneToTwoWeeks: '1-2 Semanas',
      extendedTrip: 'Viaje Extendido',
      saveYourDreamDestinations: 'Guarda tus destinos soñados',
      popularDestinations: 'Destinos Populares',
      savedDestinations: "Destinos Guardados",
      addMore: "Añadir Más",
      confirmRemoval: "Confirmar Eliminación",
      removeConfirmationText: "¿Estás seguro de que quieres eliminar este destino de tu lista de deseos?",
      cancel: "Cancelar",
      remove: "Eliminar",
      from: 'Desde',
      threeDays: '3 días',
      fiveDays: '5 días',
      sevenDays: '7 días',
      viewDetails: 'Ver Detalles',
      viewAllDestinations: 'Ver Todos los Destinos',
      readyForNextAdventure: '¿Listo para Tu Próxima Aventura?',
      ctaDescription: 'Únete a miles de viajeros que han experimentado el mundo con nosotros. Ofertas especiales disponibles para reservas anticipadas y aventuras en grupo.',
      findYourTrip: 'Encuentra Tu Viaje',
      contactExperts: 'Contacta a Nuestros Expertos',
      loadingDestinations: 'Cargando destinos increíbles...',
      tryAgain: 'Intentar de Nuevo',
      failedToLoadDestinations: 'Error al cargar destinos',
      searchPlaceholder:"Descubre tu próxima aventura...",
      navigationLinks:"Enlaces de navegación",
      customerSupport:"Atención al cliente",
      contactUs:"Contáctenos",
      resources: "Recursos",
      exploreOurDestinations:"Explora nuestros  destinos",
      joinUs: 'Únete a nosotros y comienza tu viaje',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      firstNamePlaceholder: 'Juan',
      lastNamePlaceholder: 'Pérez',
      emailPlaceholder: 'tu@correo.com',
      passwordPlaceholder: 'Crea una contraseña',
      confirmPasswordPlaceholder: 'Confirma tu contraseña',
      termsAgreement: 'Acepto los',
      termsOfService: 'Términos de Servicio',
      and: 'y la',
      privacyPolicy: 'Política de Privacidad',
      createAccount: 'Crear Cuenta',
      creatingAccount: 'Creando Cuenta...',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar Sesión',
      registrationSuccessful: '¡Registro Exitoso!',
      welcomeAboard: '¡Bienvenido a bordo! Revisa tu correo para verificar tu cuenta.',
      goToLogin: 'Ir a Iniciar Sesión',
      passwordsDoNotMatch: 'Las contraseñas no coinciden',
      quote: 'Viajar no siempre es bonito. No siempre es cómodo. Pero está bien. El viaje te cambia.',
      quoteAuthor: 'Anthony Bourdain',
      'passwordStrength.0': 'Muy débil',
      'passwordStrength.1': 'Muy débil',
      'passwordStrength.2': 'Podría ser más fuerte',
      'passwordStrength.3': 'Fuerza media',
      'passwordStrength.4': 'Contraseña fuerte',
      'passwordStrength.5': 'Contraseña muy fuerte',

        welcomeBack: 'Bienvenido de Nuevo',
    signInToContinue: 'Inicia sesión para continuar tu aventura',
    loginSuccessful: '¡Inicio de Sesión Exitoso!',
    redirectingToAccount: 'Redirigiendo a tu cuenta...',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    signingIn: 'Iniciando sesión...',
    dontHaveAccount: '¿No tienes una cuenta?',
    fillAllFields: 'Por favor completa todos los campos requeridos',
    loginFailed: 'Error de inicio de sesión',
    loginFailedCheckCredentials: 'Error de inicio de sesión. Por favor verifica tus credenciales.',
    passwordLoginPlaceholder: 'Tu contraseña',
    loginQuote: '"Un viaje de mil millas comienza con un solo paso."',
    loginQuoteAuthor: '— Lao Tzu',

    failedToLoadDestinations: 'No se pudieron cargar los destinos',
    activity1: 'Turismo y fotografía de paisajes escénicos',
    activity2: 'Senderismo en hermosos senderos de montaña',
    activity3: 'Exploración de mercados locales y artesanías',
    activity4: 'Visita a sitios históricos y monumentos culturales',
    activity5: 'Experimentando la cocina local y comidas tradicionales',

    standardHotel: 'Hotel Estándar',
    standardHotelDesc: 'Habitaciones cómodas con servicios básicos',
    luxuryResort: 'Resort de Lujo',
    luxuryResortDesc: 'Habitaciones espaciosas con instalaciones premium y vistas',
    localGuesthouse: 'Casa de Huéspedes Local',
    localGuesthouseDesc: 'Experiencia auténtica con familias locales',

    day1Title: 'Llegada y Orientación',
    day1Desc: 'Llegada al destino, check-in, cena de bienvenida e información sobre el tour.',
    day2Title: 'Día de Exploración',
    day2Desc: 'Día completo explorando las principales atracciones.',
    day3Title: 'Día de Salida',
    day3Desc: 'Tiempo libre por la mañana, compras de souvenirs y salida por la tarde.',

    bestTimeToVisit: 'Abril a Octubre',

    review1: '¡Experiencia absolutamente increíble! El paisaje era impresionante y nuestro guía era muy informado.',
    review2: 'Hermoso destino con gran alojamiento.',
    review3: 'Uno de los mejores viajes que hemos hecho. ¡Muy recomendable para familias!',
      hotels: "Hoteles",
    backToDestinations: 'Volver a Destinos',
    overview: 'Resumen',
    itinerary: 'Itinerario',
    accommodations: 'Alojamientos',
    reviews: 'Reseñas',
    about: 'Acerca de',
    highlights: 'Aspectos Destacados',
    tourItinerary: 'Itinerario del Tour',
    hotelAccommodation: "Alojamiento en hotel",
transportation: "Transporte",
dailyBreakfast: "Desayuno diario",
localGuide: "Guía local",
packagePrice: "Precio del paquete",
priceIncludes: "Incluye alojamiento, visitas guiadas y transporte",
departureDates: "Fechas de salida",
everySaturday: "Todos los sábados",
groupSize: "Tamaño del grupo",
maximumPeople: "Máximo 15 personas",
bookingPolicy: "Política de reserva",
advancePayment: "Se requiere un pago anticipado del 50%",


    selectDuration: 'Seleccionar Duración',
    threeDays: '3 Días',
    fiveDays: '5 Días',
    sevenDays: '7 Días',

    accommodationOptions: 'Opciones de Alojamiento',
    chooseAccommodation: 'Elija entre nuestras opciones de alojamiento cuidadosamente seleccionadas:',
    includedInBasePrice: 'Incluido en el precio base',
    additionalCost: '+PKR {{amount}} adicional',
    discountAmount: 'Descuento de PKR {{amount}}',

    travelerReviews: 'Reseñas de Viajeros',
    planYourTrip: 'Planifique su Viaje',
    packagePrice: 'Precio del Paquete',
    priceIncludes: 'Incluye alojamiento, tours guiados y transporte',

    hotelAccommodation: 'Alojamiento en Hotel',
    transportation: 'Transporte',
    dailyBreakfast: 'Desayuno Diario',
    localGuide: 'Guía Local',

    bookThisTrip: 'Reservar Este Viaje',
    departureDates: 'Fechas de Salida',
    groupSize: 'Tamaño del Grupo',
    bookingPolicy: 'Política de Reserva',
    advancePayment: 'Se requiere un pago anticipado del 50%',

    aboutTagline: 'Compartiendo la belleza natural de Pakistán con el mundo desde 2018',
    ourStory: 'Nuestra Historia',
    northernPakistanMountains: 'Montañas del norte de Pakistán',
    storyParagraph1: 'Map My Trip se fundó con una misión simple: mostrar la impresionante belleza de las áreas del norte de Pakistán mientras se apoya a las comunidades locales y se promueve el turismo sostenible.',
    storyParagraph2: 'Lo que comenzó como un pequeño proyecto apasionado de un grupo de entusiastas de la aventura se ha convertido en un servicio de viajes de confianza que ha ayudado a miles de viajeros a experimentar la magia de las montañas, valles y culturas de Pakistán.',
    storyParagraph3: 'Creemos que viajar debe ser transformador, educativo y responsable. Nuestro equipo está formado por expertos locales apasionados por compartir su tierra natal con los visitantes, asegurando que el turismo beneficie a las comunidades locales y preserve el entorno natural.',
    
    ourValues: 'Nuestros Valores',
    environmentalResponsibility: 'Responsabilidad Ambiental',
    environmentalResponsibilityDesc: 'Minimizamos nuestra huella ecológica a través de programas de gestión de residuos, apoyando esfuerzos de conservación y educando a los viajeros sobre prácticas sostenibles.',
    communitySupport: 'Apoyo Comunitario',
    communitySupportDesc: 'Empleamos guías locales, nos alojamos en establecimientos de propiedad local y contribuimos con una parte de nuestros beneficios a proyectos de desarrollo comunitario.',
    safetyFirst: 'La Seguridad Primero',
    safetyFirstDesc: 'Su seguridad es nuestra prioridad. Mantenemos altos estándares de seguridad, proporcionamos información completa antes del viaje y ofrecemos apoyo 24/7 durante su viaje.',
    authenticExperiences: 'Experiencias Auténticas',
    authenticExperiencesDesc: 'Vamos más allá de las atracciones turísticas para proporcionar intercambios culturales genuinos y aventuras fuera de lo común que te conectan con el verdadero Pakistán.',
    
    meetOurTeam: 'Conoce a Nuestro Equipo',
    founder: 'Fundador y CEO',
    founderBio: 'Con más de 15 años de experiencia explorando las regiones del norte de Pakistán, Imran fundó Map My Trip para compartir su pasión por la aventura y la exploración cultural.',
    operations: 'Jefa de Operaciones',
    operationsBio: 'Sara se asegura de que todos nuestros viajes se desarrollen sin problemas, desde la logística del transporte hasta los arreglos de alojamiento, haciendo que cada viaje sea libre de complicaciones.',
    tourGuide: 'Guía Turístico Senior',
    tourGuideBio: 'Nacido y criado en Hunza, Ali tiene un conocimiento íntimo de las áreas del norte y habla varios idiomas locales, enriqueciendo su experiencia de viaje.',
    customerRelations: 'Relaciones con el Cliente',
    customerRelationsBio: 'Zainab se dedica a proporcionar un servicio excepcional antes, durante y después de su viaje, asegurando que todas sus necesidades sean atendidas con una sonrisa.',
    
    whatOurTravelersSay: 'Lo Que Dicen Nuestros Viajeros',
    karachi: 'Karachi',
    lahore: 'Lahore',
    islamabad: 'Islamabad',
    testimonial1: '¡Nuestro viaje a Hunza fue absolutamente transformador. Los guías eran conocedores, el alojamiento cómodo y el paisaje impresionante!',
    testimonial2: 'Como viajera solitaria, estaba preocupada por la seguridad, pero Map My Trip me hizo sentir segura durante todo mi viaje en Skardu. ¡Altamente recomendado!',
    testimonial3: 'Nuestro viaje familiar a Naran estuvo perfectamente organizado, con actividades adecuadas para todas las edades. ¡Mis hijos todavía hablan de la aventura!',
    
    readyToExperience: '¿Listo para Experimentar la Belleza de Pakistán?',
    joinUsOnJourney: 'Únete a nosotros en un viaje inolvidable por el paraíso del norte de Pakistán',
    browseDestinations: 'Explorar Destinos',

    "Loading destinations...": "Cargando destinos...",
    "Explore Our Destinations": "Explora Nuestros Destinos",
    "View Details": "Ver Detalles",

    
    myWishlist: 'Mi Lista de Deseos',
    loading: 'Cargando...',
    failedToLoadWishlist: 'Error al cargar la lista de deseos. Por favor, inténtelo de nuevo más tarde.',
    wishlistEmpty: 'Tu lista de deseos está vacía',
    exploreDestinations: 'Explorar Destinos',
    unnamedDestination: 'Destino sin nombre',
    viewDetails: 'Ver Detalles',
    remove: 'Eliminar',


    customizeYourTrip: "Personalice su viaje a",
  requestSubmittedSuccessfully: "¡Su solicitud de tour personalizado ha sido enviada con éxito! Nuestro equipo se pondrá en contacto con usted pronto.",
  errorSubmittingRequest: "Hubo un error al enviar su solicitud. Por favor, inténtelo de nuevo.",
  contactInformation: "Información de contacto",
  fullName: "Nombre completo",
  email: "Correo electrónico",
  phone: "Número de teléfono",
  tripDetails: "Detalles del viaje",
  startDate: "Fecha de inicio",
  endDate: "Fecha de finalización",
  numberOfTravelers: "Número de viajeros",
  preferences: "Preferencias",
  travelPreferences: "Preferencias de viaje",
  selectMultiple: "seleccionar múltiples",
  adventure: "Aventura",
  cultural: "Cultural",
  relaxation: "Relajación",
  wildlife: "Vida silvestre",
  historical: "Histórico",
  accommodationPreference: "Preferencia de alojamiento",
  budget: "Económico",
  standard: "Estándar",
  luxury: "Lujo",
  budgetRange: "Rango de presupuesto",
  economy: "Económico (PKR 20,000-50,000 por persona)",
  medium: "Medio (PKR 50,000-100,000 por persona)",
  luxuryBudget: "Lujo (PKR 100,000+ por persona)",
  additionalOptions: "Opciones adicionales",
  includeInPackage: "Incluir en el paquete",
  transportation: "Transporte",
  tourGuide: "Guía turístico",
  allMeals: "Todas las comidas",
  specialRequirements: "Requisitos especiales o solicitudes",
  specialRequirementsPlaceholder: "Cualquier solicitud especial, restricciones dietéticas, necesidades de accesibilidad o actividades que le gustaría incluir...",
  submitting: "Enviando...",
  requestCustomTour: "Solicitar tour personalizado",
  customTourNote: "* Nuestro equipo se pondrá en contacto con usted dentro de las 24 horas para discutir los detalles de su tour personalizado y proporcionarle un presupuesto personalizado.",
    backToDestination: 'Volver al Destino',

    viewMyBookings: 'Ver Mis Reservas',
      myBookings: {
        title: 'Mis Reservas',
        loading: 'Cargando tus reservas...',
        error: 'Error al cargar tus reservas. Por favor, inténtalo de nuevo más tarde.',
        noBookings: 'Aún no tienes ninguna reserva.',
        exploreDestinations: 'Explorar Destinos',
        shareTitle: 'Mi próximo viaje a {{destination}}',
        shareDescription: 'Voy a ir a {{destination}} {{location}}',
        shareLocation: 'en {{location}}',
        bookingDetails: {
          bookingId: 'ID de Reserva:',
          destination: 'Destino:',
          date: 'Fecha:',
          duration: 'Duración:',
          travelers: 'Viajeros:',
          accommodation: 'Alojamiento:',
          totalPrice: 'Precio Total:',
          status: 'Estado:',
          unknownDestination: 'Destino Desconocido',

        },
        actions: {
          cancelBooking: 'Cancelar Reserva',
          viewDestination: 'Ver Destino',
          confirmCancel: '¿Estás seguro de que deseas cancelar esta reserva?',

        },
        durations: {
          '3days': '3 Días',
          '5days': '5 Días',
          '7days': '7 Días',
          '14days': '14 Días',

        }
      },
      tryAgain: 'Intentar de Nuevo',  
    },
    currentlyUnavailable: "Actualmente No Disponible",

    day1Title: "Llegada y orientación",
day1Desc: "Llegada al destino, registro en el alojamiento, cena de bienvenida y presentación sobre el tour.",
day2Title: "Día de exploración",
day2Desc: "Día completo explorando las principales atracciones, incluyendo recorridos guiados y tiempo libre.",
day3Title: "Día de salida",
day3Desc: "Tiempo libre por la mañana, compras de souvenirs y salida hacia Lahore/Islamabad por la tarde.",
day2Title5: "Exploración local",
day2Desc5: "Explorando las principales atracciones con un guía local.",
day3Title5: "Día de aventura",
day3Desc5: "Día completo de actividades al aire libre y aventuras adecuadas para el destino.",
day4Title: "Inmersión cultural",
day4Desc: "Experimentando la cultura local, las tradiciones y la gastronomía con interacciones con la comunidad local.",
day5Title: "Día de salida",
day5Desc: "Tiempo libre por la mañana, compras de souvenirs y salida hacia Lahore/Islamabad por la tarde.",
day5Title7: "Tour de joyas escondidas",
day5Desc7: "Visitando lugares fuera de lo común conocidos principalmente por los lugareños.",
day6Title: "Día de relajación",
day6Desc: "Día libre para relajarse, volver a visitar los lugares favoritos o probar actividades opcionales.",
day7Title: "Día de salida",
day7Desc: "Tiempo libre por la mañana, compras de souvenirs y salida hacia Lahore/Islamabad por la tarde.",

   


    
  },
  fr: {
    translation: {
      
  review: {
    writeAReview: "Écrire un Avis",
    rating: "Évaluation",
    reviewTitle: "Titre de l'Avis",
    reviewTitlePlaceholder: "Résumez votre expérience ou soulignez ce qui vous a marqué",
    yourReview: "Votre Avis",
    reviewCommentPlaceholder: "Partagez votre expérience avec les autres - ce que vous avez apprécié, ce qui pourrait être amélioré...",
    dateOfVisit: "Date de Visite",
    uploadPhotos: "Télécharger des Photos",
    optional: "facultatif",
    photoGuidelines: "Veuillez télécharger des images au format JPG, JPEG ou PNG (max 5MB chacune)",
    submitting: "Envoi en cours...",
    submitReview: "Soumettre l'Avis",
    titleRequired: "Veuillez fournir un titre pour votre avis",
    commentTooShort: "Votre avis doit comporter au moins 10 caractères",
    dateRequired: "Veuillez sélectionner la date de votre visite",
    futureDateInvalid: "Vous ne pouvez pas sélectionner une date future",
    invalidImageFiles: "Veuillez télécharger uniquement des images au format JPG ou PNG (max 5MB chacune)",
    reviewSubmittedAwaitingApproval: "Merci ! Votre avis a été soumis et est en attente d'approbation.",
    alreadyReviewed: "Vous avez déjà publié un avis sur cette destination",
    reviewSubmitError: "Une erreur s'est produite lors de la soumission de votre avis. Veuillez réessayer plus tard."
  },
      contactPage: {
        title: "Contactez-nous",
        description: "Nous serions ravis de vous entendre. Veuillez remplir le formulaire ci-dessous ou utiliser nos coordonnées.",
        getInTouch: "Entrer en contact",
        address: "123 Avenue des Affaires, Lahore",
        phone: "+1 (555) 123-4567",
        email: "MapMyTrip@gmail.com",
        hours: "Lundi-Vendredi : 9h-17h",
        sendMessage: "Envoyez-nous un message",
        yourName: "Votre nom",
        yourEmail: "Votre e-mail",
        subject: "Sujet",
        yourMessage: "Votre message",
        sendBtn: "Envoyer le message",
        formSubmitted: "Merci ! Votre message a été envoyé avec succès."
      },
     booking: {
      title: "Réservez votre voyage à",
      defaultDestination: "Destination",
      loading: "Chargement des détails de réservation...",
      errors: {
      failedToLoad: "Échec du chargement des détails de la destination",
      selectDate: "Veuillez sélectionner une date de voyage",
      invalidEasypaisa: "Veuillez entrer un numéro Easypaisa valide à 11 chiffres",
      bookingFailed: "Échec de la réservation. Veuillez réessayer."
      },
      success: {
      confirmed: "Réservation Confirmée !",
      transactionId: "Votre identifiant de transaction :",
      redirecting: "Redirection vers votre page de réservations..."
      },
      sections: {
      tripDetails: "Détails du Voyage",
      contactInfo: "Coordonnées",
      payment: "Paiement",
      bookingSummary: "Résumé de la Réservation",
      },
      fields: {
      travelDate: "Date de Voyage :",
      duration: "Durée :",
      travelers: "Nombre de Voyageurs :",
      accommodation: "Hébergement :",
      firstName: "Prénom :",
      lastName: "Nom :",
      email: "Email :",
      phone: "Téléphone :",
      specialRequests: "Demandes Spéciales :"
      },
      durations: {
      "3days": "3 Jours",
      "5days": "5 Jours",
      "7days": "7 Jours"
      },
      payment: {
      basePrice: "Prix de Base :",
      travelers: "voyageurs",
      accommodationAdjustment: "Ajustement d'Hébergement :",
      totalPrice: "Prix Total :",
      method: "Méthode de Paiement :",
      methods: {
      creditCard: "Carte de Crédit",
      creditCardDesc: "Visa, MasterCard, American Express",
      paypal: "PayPal",
      paypalDesc: "Paiement en ligne sécurisé",
      easypaisa: "Easypaisa",
      easypaisaDesc: "Payez avec votre compte mobile"
      },
      easypaisaNumber: "Numéro Mobile Easypaisa :",
      easypaisaInfo1: "Veuillez entrer votre numéro mobile à 11 chiffres enregistré avec Easypaisa",
      easypaisaInfo2: "Vous recevrez un code de confirmation pour finaliser le paiement",
      securityInfo: "Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais les détails complets de votre carte de crédit."
      },
      buttons: {
      processing: "Traitement en cours...",
      bookNow: "Réservez Maintenant pour PKR {{price}}",
      continueToPayment: "Continuer vers le Paiement",
      }
     },

      blog: {
        title: 'Voyages en Montagne',
        subtitle: 'Découvrez des paysages à couper le souffle et des aventures',
        categories: {
          all: 'Tout',
          destinations: 'Destinations',
          adventure: 'Aventure',
          food: 'Cuisine de Montagne'
        },
        readMore: 'Lire plus',
        readTime: '{{count}} min de lecture',
        posts: {
          hunza: {
            title: 'Explorer les Joyaux Cachés de la Vallée de Hunza',
            excerpt: 'Un voyage à travers les paysages magiques du paradis du nord du Pakistan',
            fullContent: 'Nichée au cœur des montagnes du Karakoram, la Vallée de Hunza est une destination à couper le souffle qui offre aux voyageurs une expérience incomparable de beauté naturelle et de richesse culturelle. Cette vallée reculée, entourée de pics imposants et de glaciers anciens, abrite certaines des personnes les plus hospitalières de la terre. Notre expédition a révélé des paysages saisissants, des champs en terrasses d\'abricotiers aux rivières cristallines traversant un terrain escarpé.'
          },
          skardu: {
            title: 'Skardu : Porte des Aventures Extrêmes',
            excerpt: 'Libérer des sensations dans la capitale de l\'aventure du Pakistan',
            fullContent: 'Skardu, situé au cœur du Gilgit-Baltistan, est un paradis pour les passionnés d\'aventure et les amoureux de la nature. Ce lieu extraordinaire sert de camp de base pour certaines des expéditions montagnardes les plus difficiles du monde, y compris des routes vers le K2, le deuxième sommet le plus haut de la terre.'
          },
          mountainCuisine: {
            title: 'Cuisine de Montagne : Saveurs des Sommets',
            excerpt: 'Un voyage culinaire à travers des recettes traditionnelles de montagne',
            fullContent: 'Les régions montagneuses du Pakistan offrent une expérience culinaire aussi spectaculaire que leurs paysages. Notre exploration gastronomique a révélé une riche tapisserie de saveurs influencées par les traditions locales, les ingrédients disponibles et des siècles d\'échanges culturels.'
          }
        }
      },
      faq: {
        title: 'Foire Aux Questions',
        subtitle: 'Trouvez des réponses aux questions courantes sur votre aventure en montagne',
        categories: {
          booking: {
            title: 'Réservations',
            questions: {
              howToBook: {
                question: 'Comment réserver un tour en montagne ?',
                answer: 'Réserver un tour en montagne est facile ! Visitez notre site web, sélectionnez votre destination et vos dates préférées, remplissez le formulaire de réservation et effectuez le paiement. Notre équipe de support client est disponible 24h/24 pour vous aider avec toute question.'
              },
              cancelModify: {
                question: 'Puis-je annuler ou modifier ma réservation ?',
                answer: 'Oui, vous pouvez annuler ou modifier votre réservation jusqu\'à 14 jours avant votre tour prévu. Des frais d\'annulation peuvent s\'appliquer selon le moment et le type de tour. Veuillez contacter notre support client pour plus d\'informations.'
              }
            }
          },
          payments: {
            title: 'Paiements et Méthodes',
            questions: {
              paymentMethods: {
                question: 'Quels modes de paiement acceptez-vous ?',
                answer: 'Nous acceptons plusieurs méthodes de paiement, incluant les cartes de crédit/débit, les transferts bancaires, PayPal et les plateformes de paiement locales comme EasyPaisa.'
              },
              easyPaisa: {
                question: 'Comment utiliser EasyPaisa pour payer ?',
                answer: 'EasyPaisa est un service de portefeuille mobile et de paiement pratique. Sélectionnez simplement EasyPaisa lors du paiement, entrez votre numéro de mobile et suivez les invites pour terminer votre transaction.'
              }
            }
          },
          travel: {
            title: 'Préparation du Voyage',
            questions: {
              specialty: {
                question: 'Qu\'est-ce qui rend vos tours de montagne spéciaux ?',
                answer: 'Nos tours de montagne sont concoctés par des experts locaux ayant une connaissance approfondie de la région. Nous offrons des expériences uniques, un tourisme durable et un soutien aux communautés locales tout en fournissant des aventures sûres et mémorables.'
              },
              packing: {
                question: 'Que dois-je emporter pour un tour en montagne ?',
                answer: 'Emportez des couches de vêtements, des chaussures de randonnée robustes, un équipement imperméable, vos médicaments personnels, une protection solaire et un bon appareil photo. Nous fournissons une liste détaillée de ce qu\'il faut emporter lors de la réservation.'
              }
            }
          },
          support: {
            title: 'Support Client',
            questions: {
              contact: {
                question: 'Comment puis-je contacter le support client ?',
                answer: 'Vous pouvez joindre notre support client par e-mail à support@mountainjourneys.com, par téléphone au +92 123 4567890, ou via notre chat en direct 24h/24 sur notre site web.'
              }
            }
          }
        }
      }, 

      payment: {
        title: "Finalisez votre paiement",
        bookingSummary: "Résumé de la réservation",
        destination: "Destination",
        selectedDestination: "Destination sélectionnée",
        duration: "Durée",
        duration3Days: "3 jours",
        duration5Days: "5 jours",
        duration7Days: "7 jours",
        travelers: "Voyageurs",
        accommodation: "Hébergement",
        totalAmount: "Montant total",
        paymentDetails: "Détails du paiement",
        email: "E-mail",
        enterEmail: "Entrez votre e-mail",
        paymentMethod: "Méthode de paiement",
        methods: {
          creditCard: "Carte de crédit",
          paypal: "PayPal",
          easyPaisa: "EasyPaisa",
          jazzCash: "JazzCash"
        },
        creditCard: {
          cardNumber: "Numéro de carte",
          expiryDate: "Date d'expiration",
          cvc: "CVC",
          securityMessage: "Les informations de votre carte sont sécurisées et cryptées."
        },
        easypaisa: {
          mobileNumber: "Numéro mobile EasyPaisa",
          instruction: "Entrez le numéro de mobile enregistré sur EasyPaisa."
        },
        jazzcash: {
          mobileNumber: "Numéro mobile JazzCash",
          instruction: "Entrez le numéro de mobile enregistré sur JazzCash."
        },
        confirmationCode: {
          label: "Entrez le code de confirmation",
          placeholder: "Entrez le code à 4 chiffres envoyé à votre mobile",
          sent: "Un code de confirmation a été envoyé à votre numéro {mobileNumber}.",
          demo: "Pour la démonstration, utilisez le code : {code}"
        },
        paypal: {
          redirectMessage: "Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.",
          checkoutTitle: "Paiement PayPal",
          processing: "Traitement de votre paiement via PayPal...",
          amount: "Montant : PKR {amount}"
        },
        buttons: {
          back: "Retour",
          confirmPayment: "Confirmer le paiement",
          cancel: "Annuler",
          processing: "Traitement...",
          continuePaypal: "Continuer vers PayPal",
          pay: "Payer PKR {amount}",
          payNow: "Payer maintenant"
        },
        processing: "Traitement de votre paiement...",
        success: {
          title: "Paiement réussi !",
          message: "Votre réservation a été confirmée.",
          redirecting: "Redirection vers vos réservations..."
        },
        backToBookings: "Retour à mes réservations",
        errors: {
          failedToLoadBooking: "Échec du chargement des détails de la réservation. Veuillez réessayer.",
          emailRequired: "L'e-mail est requis",
          selectPaymentMethod: "Veuillez sélectionner une méthode de paiement",
          fillCardDetails: "Veuillez remplir tous les détails de la carte",
          invalidCardNumber: "Veuillez entrer un numéro de carte valide",
          invalidExpiry: "Veuillez entrer une date d'expiration valide (MM/AA)",
          invalidCvc: "Veuillez entrer un code de sécurité valide",
          invalidMobileNumber: "Veuillez entrer un numéro de mobile valide",
          invalidConfirmationCode: "Veuillez entrer un code de confirmation valide",
          paymentFailed: "Le paiement a échoué. Veuillez réessayer.",
          processingFailed: "Le traitement du paiement a échoué. Veuillez réessayer plus tard."
        }
      },
  
      home: 'Accueil',
      destinations: 'Destinations',
      wishlist: "Liste de Souhaits",
      aboutUs: 'À Propos',
      contact: 'Contact',
      login: 'Connexion',
      register: 'S\'inscrire',
      tagline: 'Explorer. Découvrir. Aventure.',
      bestTimeToVisit: "Meilleure période pour visiter",
      bestTimeToVisitLabel: "Meilleure période pour visiter",
      location: "Emplacement",
      startingPrice: "Prix de départ",
      activitiesExperiences: "Activités et Expériences",
      highlights: "Points forts",
      about: "À propos de",
      available: "Disponible",
      unavailable: "Actuellement Indisponible",
      save: "Enregistrer",
      saved: "Enregistré",
      shareDestination: "Partager cette destination",
      exploreHighlights: "Explorer les points forts",
      discoverNextAdventure: 'Découvrez Votre Prochaine Aventure',
      heroDescription: 'Découvrez les paysages à couper le souffle, les montagnes imposantes et les vallées sereines du nord du Pakistan. Des sommets enneigés de Skardu aux prairies verdoyantes de Naran et Hunza, vivez la nature comme jamais auparavant.',
      startExploring: 'Commencer à Explorer',
      journeyBeginsHere: 'Votre Voyage Commence Ici',
      introDescription: 'Nous avons sélectionné les expériences de voyage les plus extraordinaires pour les aventuriers comme vous. Avec des guides experts, des hébergements exclusifs et des itinéraires soigneusement planifiés, il vous suffit de faire vos valises et de vous embarquer dans un voyage inoubliable.',
      idealVacationLength: 'Quelle est la durée idéale de vos vacances?',
      weekendEscape: 'Escapade de Weekend',
      oneToTwoWeeks: '1-2 Semaines',
      extendedTrip: 'Voyage Prolongé',
      popularDestinations: 'Destinations Populaires',
      saveYourDreamDestinations: 'Enregistrez vos destinations de rêve',
      from: 'À partir de',
      threeDays: '3 jours',
      fiveDays: '5 jours',
      sevenDays: '7 jours',
      viewDetails: 'Voir les Détails',
      viewAllDestinations: 'Voir Toutes les Destinations',
      readyForNextAdventure: 'Prêt pour Votre Prochaine Aventure?',
      ctaDescription: 'Rejoignez des milliers de voyageurs qui ont découvert le monde avec nous. Offres spéciales disponibles pour les réservations anticipées et les aventures en groupe.',
      findYourTrip: 'Trouvez Votre Voyage',
      contactExperts: 'Contactez Nos Experts',
      loadingDestinations: 'Chargement de destinations incroyables...',
      tryAgain: 'Réessayer',
      failedToLoadDestinations: 'Échec du chargement des destinations',
      searchPlaceholder: "Découvrez votre prochaine aventure...",
      navigationLinks: "Liens de navigation",
      customerSupport: "Service client",
      contactUs: "Contactez-nous",
      resources: "Ressources",
      exploreOurDestinations: "Explorez nos destinations",
      savedDestinations: "Destinations Enregistrées",
      addMore: "Ajouter Plus",
      hotels: "Hôtels",  
      confirmRemoval: "Confirmer la Suppression",
      removeConfirmationText: "Êtes-vous sûr de vouloir supprimer cette destination de votre liste de souhaits?",
      cancel: "Annuler",
      remove: "Supprimer",
      wishlistEmpty: "Votre liste de souhaits est vide",
      exploreDestinations: "Explorer les Destinations",
      unnamedDestination: "Destination Sans Nom",
      viewDetails: "Voir les Détails",
      loading: "Chargement...",
      failedToLoadWishlist: "Échec du chargement de la liste de souhaits. Veuillez réessayer plus tard.",

        // Register page translations
        joinUs: 'Rejoignez-nous et commencez votre voyage',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        password: 'Mot de Passe',
        confirmPassword: 'Confirmer le Mot de Passe',
        firstNamePlaceholder: 'Jean',
        lastNamePlaceholder: 'Dupont',
        emailPlaceholder: 'votre@email.com',
        passwordPlaceholder: 'Créez un mot de passe',
        confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
        termsAgreement: 'J\'accepte les',
        termsOfService: 'Conditions d\'Utilisation',
        and: 'et la',
        privacyPolicy: 'Politique de Confidentialité',
        createAccount: 'Créer un Compte',
        creatingAccount: 'Création du Compte...',
        alreadyHaveAccount: 'Vous avez déjà un compte?',
        signIn: 'Se Connecter',
        registrationSuccessful: 'Inscription Réussie!',
        welcomeAboard: 'Bienvenue à bord! Vérifiez votre email pour confirmer votre compte.',
        goToLogin: 'Aller à la Connexion',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
        quote: 'Voyager n\'est pas toujours joli. Ce n\'est pas toujours confortable. Mais c\'est normal. Le voyage vous change.',
        quoteAuthor: 'Anthony Bourdain',
        'passwordStrength.0': 'Trop faible',
        'passwordStrength.1': 'Trop faible',
        'passwordStrength.2': 'Pourrait être plus fort',
        'passwordStrength.3': 'Force moyenne',
        'passwordStrength.4': 'Mot de passe fort',
        'passwordStrength.5': 'Mot de passe très fort',

                welcomeBack: 'Bienvenue à Nouveau',
        signInToContinue: 'Connectez-vous pour continuer votre aventure',
        loginSuccessful: 'Connexion Réussie!',
        redirectingToAccount: 'Redirection vers votre compte...',
        rememberMe: 'Se souvenir de moi',
        forgotPassword: 'Mot de passe oublié?',
        signingIn: 'Connexion en cours...',
        dontHaveAccount: 'Vous n\'avez pas de compte?',
        fillAllFields: 'Veuillez remplir tous les champs requis',
        loginFailed: 'Échec de la connexion',
        loginFailedCheckCredentials: 'Échec de la connexion. Veuillez vérifier vos identifiants.',
        passwordLoginPlaceholder: 'Votre mot de passe',
        loginQuote: '"Un voyage de mille lieues commence par un seul pas."',
        loginQuoteAuthor: '— Lao Tseu',

        failedToLoadDestinations: 'Échec du chargement des destinations',
        activity1: 'Visite et photographie de paysages pittoresques',
        activity2: 'Randonnée sur de beaux sentiers de montagne',
        activity3: 'Exploration des marchés locaux et de l\'artisanat',
        activity4: 'Visite de sites historiques et de monuments culturels',
        activity5: 'Expérience de la cuisine locale et des repas traditionnels',
  
        standardHotel: 'Hôtel Standard',
        standardHotelDesc: 'Chambres confortables avec commodités de base',
        luxuryResort: 'Resort de Luxe',
        luxuryResortDesc: 'Chambres spacieuses avec équipements haut de gamme et vues',
        localGuesthouse: 'Maison d\'hôtes locale',
        localGuesthouseDesc: 'Expérience authentique avec des familles locales',
  
        bestTimeToVisit: 'Avril à Octobre',
  
        review1: 'Expérience absolument incroyable ! Les paysages étaient à couper le souffle et notre guide était très compétent.',
        review2: 'Belle destination avec un excellent hébergement.',
        review3: 'L\'un des meilleurs voyages que nous ayons jamais faits. Fortement recommandé pour les familles !',
  
        backToDestinations: 'Retour aux destinations',
        overview: 'Aperçu',
        itinerary: 'Itinéraire',
        accommodations: 'Hébergements',
        reviews: 'Avis',
        hotelAccommodation: "Hébergement à l'hôtel",
        planYourTrip: "Planifiez votre voyage",
transportation: "Transport",
dailyBreakfast: "Petit déjeuner quotidien",
localGuide: "Guide local",
packagePrice: "Prix du forfait",
priceIncludes: "Comprend l'hébergement, les visites guidées et le transport",
departureDates: "Dates de départ",
everySaturday: "Chaque samedi",
groupSize: "Taille du groupe",
maximumPeople: "Maximum 15 personnes",
bookingPolicy: "Politique de réservation",
advancePayment: "Un acompte de 50 % est requis",

        bookThisTrip: 'Réserver ce voyage',
        departureDates: 'Dates de départ',
        groupSize: 'Taille du groupe',
        bookingPolicy: 'Politique de réservation',
        advancePayment: 'Paiement anticipé de 50% requis',

        aboutTagline: 'Partager la beauté naturelle du Pakistan avec le monde depuis 2018',
        ourStory: 'Notre Histoire',
        northernPakistanMountains: 'Montagnes du nord du Pakistan',
        storyParagraph1: 'Map My Trip a été fondée avec une mission simple : mettre en valeur la beauté à couper le souffle des régions du nord du Pakistan tout en soutenant les communautés locales et en promouvant un tourisme durable.',
        storyParagraph2: 'Ce qui a commencé comme un petit projet passionné par un groupe d\'amateurs d\'aventures est devenu un service de voyage de confiance qui a aidé des milliers de voyageurs à découvrir la magie des montagnes, des vallées et des cultures du Pakistan.',
        storyParagraph3: 'Nous croyons que les voyages doivent être transformateurs, éducatifs et responsables. Notre équipe est composée d\'experts locaux passionnés par le partage de leur patrie avec les visiteurs, tout en veillant à ce que le tourisme profite aux communautés locales et préserve l\'environnement naturel.',
        
        ourValues: 'Nos Valeurs',
        environmentalResponsibility: 'Responsabilité Environnementale',
        environmentalResponsibilityDesc: 'Nous minimisons notre empreinte écologique grâce à des programmes de gestion des déchets, en soutenant les efforts de conservation et en éduquant les voyageurs sur les pratiques durables.',
        communitySupport: 'Soutien Communautaire',
        communitySupportDesc: 'Nous employons des guides locaux, séjournons dans des hébergements appartenant à des locaux et contribuons une partie de nos bénéfices à des projets de développement communautaire.',
        safetyFirst: 'La Sécurité d\'Abord',
        safetyFirstDesc: 'Votre sécurité est notre priorité. Nous maintenons des normes de sécurité élevées, fournissons des informations complètes avant le voyage et offrons un soutien 24/7 pendant votre voyage.',
        authenticExperiences: 'Expériences Authentiques',
        authenticExperiencesDesc: 'Nous allons au-delà des attractions touristiques pour offrir des échanges culturels authentiques et des aventures hors des sentiers battus qui vous connectent avec le vrai Pakistan.',
        
        meetOurTeam: 'Rencontrez Notre Équipe',
        founder: 'Fondateur et PDG',
        founderBio: 'Avec plus de 15 ans d\'expérience dans l\'exploration des régions du nord du Pakistan, Imran a fondé Map My Trip pour partager sa passion pour l\'aventure et l\'exploration culturelle.',
        operations: 'Responsable des Opérations',
        operationsBio: 'Sara s\'assure que tous nos voyages se déroulent sans problème, de la logistique des transports aux arrangements d\'hébergement, rendant chaque voyage sans tracas.',
        tourGuide: 'Guide Touristique Senior',
        tourGuideBio: 'Né et élevé à Hunza, Ali a une connaissance intime des régions du nord et parle plusieurs langues locales, enrichissant votre expérience de voyage.',
        customerRelations: 'Relations Clients',
        customerRelationsBio: 'Zainab se consacre à fournir un service exceptionnel avant, pendant et après votre voyage, veillant à ce que tous vos besoins soient satisfaits avec le sourire.',
        
        whatOurTravelersSay: 'Ce Que Disent Nos Voyageurs',
        karachi: 'Karachi',
        lahore: 'Lahore',
        islamabad: 'Islamabad',
        testimonial1: 'Notre voyage à Hunza a été absolument transformateur. Les guides étaient compétents, l\'hébergement confortable et le paysage à couper le souffle!',
        testimonial2: 'En tant que voyageuse en solo, j\'étais préoccupée par la sécurité, mais Map My Trip m\'a fait sentir en sécurité tout au long de mon voyage à Skardu. Hautement recommandé!',
        testimonial3: 'Notre voyage en famille à Naran était parfaitement organisé, avec des activités adaptées à tous les âges. Mes enfants parlent encore de l\'aventure!',
        
        readyToExperience: 'Prêt à Découvrir la Beauté du Pakistan?',
        joinUsOnJourney: 'Rejoignez-nous pour un voyage inoubliable à travers le paradis du nord du Pakistan',
        browseDestinations: 'Parcourir les Destinations',
        
        "Loading destinations...": "Chargement des destinations...",
        "Explore Our Destinations": "Explorez Nos Destinations",
        "View Details": "Voir les Détails",

        myWishlist: 'Ma Liste de Souhaits',
        loading: 'Chargement...',
        failedToLoadWishlist: 'Échec du chargement de la liste de souhaits. Veuillez réessayer plus tard.',
        wishlistEmpty: 'Votre liste de souhaits est vide',
        exploreDestinations: 'Explorer les Destinations',
        unnamedDestination: 'Destination sans nom',
        viewDetails: 'Voir les Détails',
        remove: 'Supprimer',

        customizeYourTrip: "Personnalisez votre voyage",
        requestSubmittedSuccessfully: "Votre demande de voyage personnalisé a été soumise avec succès ! Notre équipe vous contactera bientôt.",
        errorSubmittingRequest: "Une erreur s'est produite lors de la soumission de votre demande. Veuillez réessayer.",
        contactInformation: "Coordonnées",
        fullName: "Nom complet",
        email: "Email",
        phone: "Numéro de téléphone",
        tripDetails: "Détails du voyage",
        startDate: "Date de début",
        endDate: "Date de fin",
        numberOfTravelers: "Nombre de voyageurs",
        preferences: "Préférences",
        travelPreferences: "Préférences de voyage",
        selectMultiple: "sélectionner plusieurs",
        adventure: "Aventure",
        cultural: "Culturel",
        relaxation: "Relaxation",
        wildlife: "Faune",
        historical: "Historique",
        accommodationPreference: "Préférence d'hébergement",
        budget: "Économique",
        standard: "Standard",
        luxury: "Luxe",
        budgetRange: "Gamme de budget",
        economy: "Économique (PKR 20,000-50,000 par personne)",
        medium: "Moyen (PKR 50,000-100,000 par personne)",
        luxuryBudget: "Luxe (PKR 100,000+ par personne)",
        additionalOptions: "Options supplémentaires",
        includeInPackage: "Inclure dans le forfait",
        transportation: "Transport",
        tourGuide: "Guide touristique",
        allMeals: "Tous les repas",
        specialRequirements: "Exigences spéciales ou demandes",
        specialRequirementsPlaceholder: "Toutes demandes spéciales, restrictions alimentaires, besoins d'accessibilité ou activités que vous aimeriez inclure...",
        submitting: "Soumission en cours...",
        requestCustomTour: "Demander un circuit personnalisé",
        customTourNote: "* Notre équipe vous contactera dans les 24 heures pour discuter des détails de votre circuit personnalisé et vous fournir un devis personnalisé.",
        backToDestination: "Retour à la Destination",

        viewMyBookings: 'Voir Mes Réservations',
        myBookings: {
          title: 'Mes Réservations',
          loading: 'Chargement de vos réservations...',
          error: 'Échec du chargement de vos réservations. Veuillez réessayer plus tard.',
          noBookings: 'Vous n\'avez pas encore de réservations.',
          exploreDestinations: 'Explorer les Destinations',
          shareTitle: 'Mon prochain voyage à {{destination}}',
          shareDescription: 'Je vais à {{destination}} {{location}}',
          shareLocation: 'à {{location}}',
          bookingDetails: {
            bookingId: 'ID de Réservation:',
            destination: 'Destination:',
            date: 'Date:',
            duration: 'Durée:',
            travelers: 'Voyageurs:',
            accommodation: 'Hébergement:',
            totalPrice: 'Prix Total:',
            status: 'Statut:',
            unknownDestination: 'Destination Inconnue',
          },
          actions: {
            cancelBooking: 'Annuler la Réservation',
            viewDestination: 'Voir la Destination',
            confirmCancel: 'Êtes-vous sûr de vouloir annuler cette réservation?',
          },
          durations: {
            '3days': '3 Jours',
            '5days': '5 Jours',
            '7days': '7 Jours',
            '14days': '14 Jours',
          }
        },
        tryAgain: 'Réessayer',
    },
    currentlyUnavailable: "Actuellement Indisponible",
    day1Title: "Arrivée et orientation",
day1Desc: "Arrivée à destination, enregistrement à l'hébergement, dîner de bienvenue et briefing sur le tour.",
day2Title: "Jour d'exploration",
day2Desc: "Journée complète d'exploration des principales attractions, y compris des visites guidées et du temps libre.",
day3Title: "Jour de départ",
day3Desc: "Temps libre le matin, achats de souvenirs, départ pour Lahore/Islamabad dans l'après-midi.",
day2Title5: "Exploration locale",
day2Desc5: "Exploration des principales attractions avec un guide local.",
day3Title5: "Jour d'aventure",
day3Desc5: "Journée complète d'activités de plein air et d'aventures adaptées à la destination.",
day4Title: "Immersion culturelle",
day4Desc: "Découverte de la culture locale, des traditions et de la cuisine avec des interactions avec la communauté locale.",
day5Title: "Jour de départ",
day5Desc: "Temps libre le matin, achats de souvenirs, départ pour Lahore/Islamabad dans l'après-midi.",
day5Title7: "Tour des joyaux cachés",
day5Desc7: "Visite de lieux hors des sentiers battus connus principalement des habitants.",
day6Title: "Jour de détente",
day6Desc: "Journée libre pour se détendre, revisiter des endroits préférés ou essayer des activités optionnelles.",
day7Title: "Jour de départ",
day7Desc: "Temps libre le matin, achats de souvenirs, départ pour Lahore/Islamabad dans l'après-midi.",

chatbot: {
  title: "Service Client",
  welcome: "Bienvenue sur notre assistant de voyage ! Comment puis-je vous aider aujourd'hui ?",
  inputPlaceholder: "Tapez votre message ici...",
  sendButton: "Envoyer",
  feedbackQuestion: "Cette réponse a-t-elle été utile ?",
  feedbackYes: "Oui 👍",
  feedbackNo: "Non 👎",
  feedbackThank: "Merci pour votre retour !",
  errorMessage: "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard."
}
  },
  de: {
    translation: {
      review: {
    writeAReview: "Bewertung schreiben",
    rating: "Bewertung",
    reviewTitle: "Titel der Bewertung",
    reviewTitlePlaceholder: "Fassen Sie Ihre Erfahrung zusammen oder heben Sie hervor, was besonders aufgefallen ist",
    yourReview: "Ihre Bewertung",
    reviewCommentPlaceholder: "Teilen Sie anderen Ihre Erfahrung mit - was Ihnen gefallen hat, was verbessert werden könnte...",
    dateOfVisit: "Besuchsdatum",
    uploadPhotos: "Fotos hochladen",
    optional: "optional",
    photoGuidelines: "Bitte laden Sie Bilder im JPG, JPEG oder PNG-Format hoch (max. 5MB pro Bild)",
    submitting: "Wird übermittelt...",
    submitReview: "Bewertung absenden",
    titleRequired: "Bitte geben Sie einen Titel für Ihre Bewertung an",
    commentTooShort: "Ihre Bewertung muss mindestens 10 Zeichen lang sein",
    dateRequired: "Bitte wählen Sie das Datum Ihres Besuchs",
    futureDateInvalid: "Sie können kein zukünftiges Datum auswählen",
    invalidImageFiles: "Bitte laden Sie nur Bilder im JPG oder PNG-Format hoch (max. 5MB pro Bild)",
    reviewSubmittedAwaitingApproval: "Vielen Dank! Ihre Bewertung wurde übermittelt und wartet auf Freigabe.",
    alreadyReviewed: "Sie haben diese Destination bereits bewertet",
    reviewSubmitError: "Beim Absenden Ihrer Bewertung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
  },
      contactPage: {
        title: "Kontaktieren Sie uns",
        description: "Wir würden uns freuen, von Ihnen zu hören. Bitte füllen Sie das untenstehende Formular aus oder nutzen Sie unsere Kontaktinformationen.",
        getInTouch: "Kontakt aufnehmen",
        address: "123 Geschäftsstraße, Lahore",
        phone: "+1 (555) 123-4567",
        email: "MapMyTrip@gmail.com",
        hours: "Montag-Freitag: 9-17 Uhr",
        sendMessage: "Schicken Sie uns eine Nachricht",
        yourName: "Ihr Name",
        yourEmail: "Ihre E-Mail",
        subject: "Betreff",
        yourMessage: "Ihre Nachricht",
        sendBtn: "Nachricht senden",
        formSubmitted: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."
      },
     booking: {
      title: "Buchen Sie Ihre Reise nach",
      defaultDestination: "Reiseziel",
      loading: "Buchungsdetails werden geladen...",
      errors: {
      failedToLoad: "Fehler beim Laden der Zieldetails",
      selectDate: "Bitte wählen Sie ein Reisedatum",
      invalidEasypaisa: "Bitte geben Sie eine gültige 11-stellige Easypaisa-Nummer ein",
      bookingFailed: "Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut."
      },
      success: {
      confirmed: "Buchung Bestätigt!",
      transactionId: "Ihre Transaktions-ID:",
      redirecting: "Weiterleitung zu Ihrer Buchungsseite..."
      },
      sections: {
      tripDetails: "Reisedetails",
      contactInfo: "Kontaktinformationen",
      payment: "Zahlung",
      bookingSummary: "Buchungsübersicht",
      },
      fields: {
      travelDate: "Reisedatum:",
      duration: "Dauer:",
      travelers: "Anzahl der Reisenden:",
      accommodation: "Unterkunft:",
      firstName: "Vorname:",
      lastName: "Nachname:",
      email: "E-Mail:",
      phone: "Telefon:",
      specialRequests: "Besondere Wünsche:"
      },
      durations: {
      "3days": "3 Tage",
      "5days": "5 Tage",
      "7days": "7 Tage"
      },
      payment: {
      basePrice: "Grundpreis:",
      travelers: "Reisende",
      accommodationAdjustment: "Unterkunftsanpassung:",
      totalPrice: "Gesamtpreis:",
      method: "Zahlungsmethode:",
      methods: {
      creditCard: "Kreditkarte",
      creditCardDesc: "Visa, MasterCard, American Express",
      paypal: "PayPal",
      paypalDesc: "Sichere Online-Zahlung",
      easypaisa: "Easypaisa",
      easypaisaDesc: "Zahlen Sie mit Ihrem Mobilkonto"
      },
      easypaisaNumber: "Easypaisa Mobilnummer:",
      easypaisaInfo1: "Bitte geben Sie Ihre bei Easypaisa registrierte 11-stellige Mobilnummer ein",
      easypaisaInfo2: "Sie erhalten einen Bestätigungscode, um die Zahlung abzuschließen",
      securityInfo: "Ihre Zahlungsinformationen sind verschlüsselt und sicher. Wir speichern niemals Ihre vollständigen Kreditkartendaten."
      },
      buttons: {
      processing: "Verarbeitung...",
      bookNow: "Jetzt buchen für PKR {{price}}",
      continueToPayment: "Weiter zur Zahlung",

      }
     },

      blog: {
        title: 'Bergreisen',
        subtitle: 'Entdecken Sie atemberaubende Landschaften und Abenteuer',
        categories: {
          all: 'Alle',
          destinations: 'Ziele',
          adventure: 'Abenteuer',
          food: 'Bergküche'
        },
        readMore: 'Mehr lesen',
        readTime: '{{count}} Min. Lesezeit',
        posts: {
          hunza: {
            title: 'Erkundung der verborgenen Juwelen des Hunza-Tals',
            excerpt: 'Eine Reise durch die magischen Landschaften des nördlichen Paradieses von Pakistan',
            fullContent: 'Eingebettet im Herzen des Karakoram-Gebirges ist das Hunza-Tal ein atemberaubendes Ziel, das Reisenden ein unvergleichliches Erlebnis von natürlicher Schönheit und kulturellem Reichtum bietet. Dieses abgelegene Tal, umgeben von majestätischen Gipfeln und uralten Gletschern, beherbergt einige der gastfreundlichsten Menschen der Erde. Unsere Expedition enthüllte beeindruckende Landschaften, von terrassierten Aprikosenbaumfeldern bis zu kristallklaren Flüssen, die durch raues Gelände fließen.'
          },
          skardu: {
            title: 'Skardu: Eingang zu extremen Abenteuern',
            excerpt: 'Adrenalin in der Abenteuerhauptstadt von Pakistan freisetzen',
            fullContent: 'Skardu, gelegen im Herzen von Gilgit-Baltistan, ist ein Paradies für Abenteuerlustige und Naturliebhaber. Dieser bemerkenswerte Ort dient als Basislager für einige der herausforderndsten Bergexpeditionen der Welt, einschließlich Routen zum K2, dem zweithöchsten Gipfel der Erde.'
          },
          mountainCuisine: {
            title: 'Bergküche: Geschmäcker der Gipfel',
            excerpt: 'Eine kulinarische Reise durch traditionelle Bergrezepte',
            fullContent: 'Die Bergregionen von Pakistan bieten ein kulinarisches Erlebnis, so spektakulär wie ihre Landschaften. Unsere gastronomische Erkundung enthüllte ein reichhaltiges Geschmacksteppich, beeinflusst von lokalen Traditionen, verfügbaren Zutaten und Jahrhunderten kulturellen Austauschs.'
          }
        }
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        subtitle: 'Finden Sie Antworten auf häufige Fragen zu Ihrem Bergabenteuer',
        categories: {
          booking: {
            title: 'Buchung und Reservierung',
            questions: {
              howToBook: {
                question: 'Wie buche ich eine Bergtour?',
                answer: 'Eine Bergtour zu buchen ist einfach! Besuchen Sie unsere Website, wählen Sie Ihr bevorzugtes Ziel und Ihre Daten, füllen Sie das Buchungsformular aus und schließen Sie die Zahlung ab. Unser Kundenservice-Team steht Ihnen rund um die Uhr zur Verfügung, um Ihre Fragen zu beantworten.'
              },
              cancelModify: {
                question: 'Kann ich meine Buchung stornieren oder ändern?',
                answer: 'Ja, Sie können Ihre Buchung bis zu 14 Tage vor der geplanten Tour stornieren oder ändern. Je nach Zeitpunkt und Art der Tour können Stornierungsgebühren anfallen. Bitte kontaktieren Sie unseren Kundenservice für detaillierte Informationen.'
              }
            }
          },
          payments: {
            title: 'Zahlungen und Methoden',
            questions: {
              paymentMethods: {
                question: 'Welche Zahlungsmethoden akzeptieren Sie?',
                answer: 'Wir akzeptieren mehrere Zahlungsmethoden, einschließlich Kredit-/Debitkarten, Banküberweisung, PayPal und lokale Zahlungsplattformen wie EasyPaisa.'
              },
              easyPaisa: {
                question: 'Wie nutze ich EasyPaisa zur Zahlung?',
                answer: 'EasyPaisa ist ein bequemes Mobile-Wallet- und Zahlungsservice. Wählen Sie einfach EasyPaisa beim Checkout, geben Sie Ihre Mobilnummer ein und folgen Sie den Anweisungen, um Ihre Transaktion abzuschließen.'
              }
            }
          },
          travel: {
            title: 'Reisevorbereitung',
            questions: {
              specialty: {
                question: 'Was macht Ihre Bergtouren besonders?',
                answer: 'Unsere Bergtouren werden von lokalen Experten mit tiefgreifender Kenntnis der Region kuratiert. Wir bieten einzigartige Erlebnisse, nachhaltigen Tourismus und Unterstützung für lokale Gemeinschaften, während wir sichere und unvergessliche Abenteuer bieten.'
              },
              packing: {
                question: 'Was sollte ich für eine Bergtour einpacken?',
                answer: 'Packen Sie Kleidungsschichten, robuste Wanderschuhe, wasserdichte Ausrüstung, persönliche Medikamente, Sonnenschutz und eine gute Kamera. Wir stellen bei der Buchung eine detaillierte Packliste zur Verfügung.'
              }
            }
          },
          support: {
            title: 'Kundenservice',
            questions: {
              contact: {
                question: 'Wie kann ich den Kundenservice kontaktieren?',
                answer: 'Sie können unseren Kundenservice per E-Mail unter support@mountainjourneys.com, telefonisch unter +92 123 4567890 oder über unseren 24/7-Live-Chat auf unserer Website erreichen.'
              }
            }
          }
        }
      },
      payment: {
        title: "Zahlung abschließen",
        bookingSummary: "Buchungsübersicht",
        destination: "Reiseziel",
        selectedDestination: "Ausgewähltes Reiseziel",
        duration: "Dauer",
        duration3Days: "3 Tage",
        duration5Days: "5 Tage",
        duration7Days: "7 Tage",
        travelers: "Reisende",
        accommodation: "Unterkunft",
        totalAmount: "Gesamtbetrag",
        paymentDetails: "Zahlungsdetails",
        email: "E-Mail",
        enterEmail: "Geben Sie Ihre E-Mail-Adresse ein",
        paymentMethod: "Zahlungsmethode",
        methods: {
          creditCard: "Kreditkarte",
          paypal: "PayPal",
          easyPaisa: "EasyPaisa",
          jazzCash: "JazzCash"
        },
        creditCard: {
          cardNumber: "Kartennummer",
          expiryDate: "Ablaufdatum",
          cvc: "CVC",
          securityMessage: "Ihre Kartendaten sind sicher und verschlüsselt."
        },
        easypaisa: {
          mobileNumber: "EasyPaisa-Handynummer",
          instruction: "Geben Sie Ihre bei EasyPaisa registrierte Handynummer ein."
        },
        jazzcash: {
          mobileNumber: "JazzCash-Handynummer",
          instruction: "Geben Sie Ihre bei JazzCash registrierte Handynummer ein."
        },
        confirmationCode: {
          label: "Bestätigungscode eingeben",
          placeholder: "Geben Sie den 4-stelligen Code ein, der an Ihr Handy gesendet wurde",
          sent: "Ein Bestätigungscode wurde an Ihre Nummer {mobileNumber} gesendet.",
          demo: "Für die Demo verwenden Sie den Code: {code}"
        },
        paypal: {
          redirectMessage: "Sie werden zu PayPal weitergeleitet, um Ihre Zahlung sicher abzuschließen.",
          checkoutTitle: "PayPal-Zahlung",
          processing: "Ihre Zahlung wird über PayPal verarbeitet...",
          amount: "Betrag: PKR {amount}"
        },
        buttons: {
          back: "Zurück",
          confirmPayment: "Zahlung bestätigen",
          cancel: "Abbrechen",
          processing: "Wird verarbeitet...",
          continuePaypal: "Weiter zu PayPal",
          pay: "Zahlen PKR {amount}",
          payNow: "Jetzt bezahlen"
        },
        processing: "Ihre Zahlung wird verarbeitet...",
        success: {
          title: "Zahlung erfolgreich!",
          message: "Ihre Buchung wurde bestätigt.",
          redirecting: "Weiterleitung zu Ihren Buchungen..."
        },
        backToBookings: "Zurück zu meinen Buchungen",
        errors: {
          failedToLoadBooking: "Buchungsdetails konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
          emailRequired: "E-Mail ist erforderlich",
          selectPaymentMethod: "Bitte wählen Sie eine Zahlungsmethode aus",
          fillCardDetails: "Bitte füllen Sie alle Kartendaten aus",
          invalidCardNumber: "Bitte geben Sie eine gültige Kartennummer ein",
          invalidExpiry: "Bitte geben Sie ein gültiges Ablaufdatum ein (MM/JJ)",
          invalidCvc: "Bitte geben Sie einen gültigen Sicherheitscode ein",
          invalidMobileNumber: "Bitte geben Sie eine gültige Handynummer ein",
          invalidConfirmationCode: "Bitte geben Sie einen gültigen Bestätigungscode ein",
          paymentFailed: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          processingFailed: "Zahlungsverarbeitung fehlgeschlagen. Bitte versuchen Sie es später erneut."
        }
      },
      
      home: 'Startseite',
      destinations: 'Reiseziele',
      wishlist: "Wunschliste",
      aboutUs: 'Über Uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      register: 'Registrieren',
      tagline: 'Erkunden. Entdecken. Abenteuer.',
      bestTimeToVisit: "Beste Reisezeit",
      bestTimeToVisitLabel: "Beste Reisezeit",
      location: "Standort",
      startingPrice: "Grundpreis",
      activitiesExperiences: "Aktivitäten und Erlebnisse",
      highlights: "Höhepunkte",
      about: "Über",

      discoverNextAdventure: 'Entdecken Sie Ihr Nächstes Abenteuer',
      heroDescription: 'Entdecken Sie die atemberaubenden Landschaften, majestätischen Berge und ruhigen Täler von Nordpakistan. Von den schneebedeckten Gipfeln von Skardu bis zu den üppigen grünen Wiesen von Naran und Hunza - erleben Sie die Natur wie nie zuvor.',
      startExploring: 'Beginnen Sie zu Erkunden',
      journeyBeginsHere: 'Ihre Reise Beginnt Hier',
      introDescription: 'Wir haben die außergewöhnlichsten Reiseerlebnisse für Abenteurer wie Sie zusammengestellt. Mit erfahrenen Führern, exklusiven Unterkünften und sorgfältig geplanten Reiserouten müssen Sie nur noch Ihre Koffer packen und sich auf eine unvergessliche Reise begeben.',
      idealVacationLength: 'Wie lang ist Ihr idealer Urlaub?',
      weekendEscape: 'Wochenendausflug',
      oneToTwoWeeks: '1-2 Wochen',
      extendedTrip: 'Längere Reise',
      popularDestinations: 'Beliebte Reiseziele',
      from: 'Ab',
      threeDays: '3 Tage',
      fiveDays: '5 Tage',
      sevenDays: '7 Tage',
      viewDetails: 'Details Anzeigen',
      viewAllDestinations: 'Alle Reiseziele Anzeigen',
      readyForNextAdventure: 'Bereit für Ihr Nächstes Abenteuer?',
      ctaDescription: 'Schließen Sie sich Tausenden von Reisenden an, die mit uns die Welt erlebt haben. Sonderangebote für Frühbuchungen und Gruppenreisen verfügbar.',
      findYourTrip: 'Finden Sie Ihre Reise',
      contactExperts: 'Kontaktieren Sie Unsere Experten',
      loadingDestinations: 'Lade fantastische Reiseziele...',
      tryAgain: 'Erneut Versuchen',
      failedToLoadDestinations: 'Laden der Reiseziele fehlgeschlagen',
      searchPlaceholder: "Entdecke dein nächstes Abenteuer...",
      navigationLinks: "Navigationslinks",
      customerSupport: "Kundendienst",
      contactUs: "Kontaktieren Sie uns",
      resources: "Ressourcen",
      exploreOurDestinations: "Entdecke unsere Reiseziele",
      available: "Verfügbar",
      unavailable: "Derzeit nicht verfügbar",
      save: "Speichern",
      saved: "Gespeichert",
      shareDestination: "Dieses Reiseziel teilen",
      exploreHighlights: "Highlights erkunden",
      savedDestinations: "Gespeicherte Reiseziele",
      addMore: "Mehr Hinzufügen",
      confirmRemoval: "Entfernung Bestätigen",
      removeConfirmationText: "Sind Sie sicher, dass Sie dieses Reiseziel von Ihrer Wunschliste entfernen möchten?",
      cancel: "Abbrechen",
      remove: "Entfernen",
      wishlistEmpty: "Ihre Wunschliste ist leer",
      exploreDestinations: "Reiseziele Erkunden",
      unnamedDestination: "Unbenanntes Reiseziel",
      viewDetails: "Details Anzeigen",
      loading: "Wird geladen...",
      failedToLoadWishlist: "Fehler beim Laden der Wunschliste. Bitte versuchen Sie es später erneut.",
        // Register page translations
        joinUs: 'Werden Sie Mitglied und beginnen Sie Ihre Reise',
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail',
        password: 'Passwort',
        confirmPassword: 'Passwort Bestätigen',
        firstNamePlaceholder: 'Hans',
        lastNamePlaceholder: 'Müller',
        emailPlaceholder: 'ihre@email.de',
        passwordPlaceholder: 'Erstellen Sie ein Passwort',
        confirmPasswordPlaceholder: 'Bestätigen Sie Ihr Passwort',
        termsAgreement: 'Ich stimme den',
        termsOfService: 'Nutzungsbedingungen',
        and: 'und der',
        privacyPolicy: 'Datenschutzrichtlinie zu',
        createAccount: 'Konto Erstellen',
        creatingAccount: 'Konto wird erstellt...',
        alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
        hotels: "Hotels",
        signIn: 'Anmelden',
        registrationSuccessful: 'Registrierung Erfolgreich!',
        welcomeAboard: 'Willkommen an Bord! Überprüfen Sie Ihre E-Mail, um Ihr Konto zu verifizieren.',
        goToLogin: 'Zur Anmeldung',
        passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
        quote: 'Reisen ist nicht immer schön. Es ist nicht immer bequem. Aber das ist in Ordnung. Die Reise verändert dich.',
        quoteAuthor: 'Anthony Bourdain',
        'passwordStrength.0': 'Zu schwach',
        'passwordStrength.1': 'Zu schwach',
        'passwordStrength.2': 'Könnte stärker sein',
        'passwordStrength.3': 'Mittlere Stärke',
        'passwordStrength.4': 'Starkes Passwort',
        'passwordStrength.5': 'Sehr starkes Passwort',

            welcomeBack: 'Willkommen Zurück',
    signInToContinue: 'Melden Sie sich an, um Ihr Abenteuer fortzusetzen',
    loginSuccessful: 'Anmeldung Erfolgreich!',
    redirectingToAccount: 'Weiterleitung zu Ihrem Konto...',
    rememberMe: 'Angemeldet bleiben',
    forgotPassword: 'Passwort vergessen?',
    signingIn: 'Anmeldung läuft...',
    dontHaveAccount: 'Haben Sie kein Konto?',
    fillAllFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
    loginFailed: 'Anmeldung fehlgeschlagen',
    loginFailedCheckCredentials: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.',
    passwordLoginPlaceholder: 'Ihr Passwort',
    loginQuote: '"Eine Reise von tausend Meilen beginnt mit einem einzigen Schritt."',
    loginQuoteAuthor: '— Laotse',

    failedToLoadDestinations: 'Reiseziele konnten nicht geladen werden',
    activity1: 'Besichtigung und Fotografie malerischer Landschaften',
    activity2: 'Wandern auf schönen Bergpfaden',
    activity3: 'Erkundung lokaler Märkte und Handwerkskunst',
    activity4: 'Besuch historischer Stätten und kultureller Wahrzeichen',
    activity5: 'Erleben lokaler Küche und traditioneller Gerichte',

    standardHotel: 'Standardhotel',
    standardHotelDesc: 'Komfortable Zimmer mit grundlegenden Annehmlichkeiten',
    luxuryResort: 'Luxusresort',
    luxuryResortDesc: 'Geräumige Zimmer mit Premium-Einrichtungen und Aussicht',
    localGuesthouse: 'Lokales Gästehaus',
    localGuesthouseDesc: 'Authentisches Erlebnis mit einheimischen Familien',

    bestTimeToVisit: 'April bis Oktober',

    review1: 'Absolut erstaunliche Erfahrung! Die Landschaft war atemberaubend und unser Reiseleiter war sehr kompetent.',
    review2: 'Schöne Destination mit toller Unterkunft.',
    review3: 'Eine der besten Reisen, die wir je gemacht haben. Sehr zu empfehlen für Familien!',

    backToDestinations: 'Zurück zu den Reisezielen',
    overview: 'Überblick',
    itinerary: 'Reiseverlauf',
    accommodations: 'Unterkünfte',
    reviews: 'Bewertungen',
    hotelAccommodation: "Hotelunterkunft",
    planYourTrip: "Planen Sie Ihre Reise",    
transportation: "Transport",
dailyBreakfast: "Tägliches Frühstück",
localGuide: "Örtlicher Reiseführer",
packagePrice: "Paketpreis",
priceIncludes: "Beinhaltet Unterkunft, geführte Touren und Transport",
departureDates: "Abreisedaten",
everySaturday: "Jeden Samstag",
groupSize: "Gruppengröße",
maximumPeople: "Maximal 15 Personen",
bookingPolicy: "Buchungsrichtlinien",
advancePayment: "50 % Anzahlung erforderlich",
saveYourDreamDestinations: 'Speichere deine Traumziele',

    bookThisTrip: 'Diese Reise buchen',
    departureDates: 'Abfahrtsdaten',
    groupSize: 'Gruppengröße',
    bookingPolicy: 'Buchungsrichtlinie',
    advancePayment: '50% Vorauszahlung erforderlich',

    aboutTagline: 'Seit 2018 teilen wir die natürliche Schönheit Pakistans mit der Welt',
    ourStory: 'Unsere Geschichte',
    northernPakistanMountains: 'Berge in Nordpakistan',
    storyParagraph1: 'Map My Trip wurde mit einer einfachen Mission gegründet: die atemberaubende Schönheit der nördlichen Gebiete Pakistans zu präsentieren und gleichzeitig lokale Gemeinschaften zu unterstützen und nachhaltigen Tourismus zu fördern.',
    storyParagraph2: 'Was als kleines Leidenschaftsprojekt einer Gruppe von Abenteurenthusiasten begann, ist zu einem vertrauenswürdigen Reiseservice geworden, der Tausenden von Reisenden geholfen hat, die Magie der Berge, Täler und Kulturen Pakistans zu erleben.',
    storyParagraph3: 'Wir glauben, dass Reisen transformativ, lehrreich und verantwortungsvoll sein sollte. Unser Team besteht aus lokalen Experten, die leidenschaftlich ihre Heimat mit Besuchern teilen und gleichzeitig sicherstellen, dass der Tourismus den lokalen Gemeinschaften zugute kommt und die natürliche Umwelt bewahrt.',
    
    ourValues: 'Unsere Werte',
    environmentalResponsibility: 'Umweltverantwortung',
    environmentalResponsibilityDesc: 'Wir minimieren unseren ökologischen Fußabdruck durch Abfallmanagementprogramme, unterstützen Naturschutzmaßnahmen und klären Reisende über nachhaltige Praktiken auf.',
    communitySupport: 'Gemeinschaftsunterstützung',
    communitySupportDesc: 'Wir beschäftigen lokale Führer, übernachten in lokalen Unterkünften und tragen einen Teil unserer Gewinne zu Gemeindeentwicklungsprojekten bei.',
    safetyFirst: 'Sicherheit zuerst',
    safetyFirstDesc: 'Ihre Sicherheit ist unsere Priorität. Wir halten hohe Sicherheitsstandards ein, bieten umfassende Informationen vor der Reise und bieten 24/7 Unterstützung während Ihrer Reise.',
    authenticExperiences: 'Authentische Erlebnisse',
    authenticExperiencesDesc: 'Wir gehen über touristische Attraktionen hinaus, um echten kulturellen Austausch und Abenteuer abseits der ausgetretenen Pfade zu bieten, die Sie mit dem echten Pakistan verbinden.',
    
    meetOurTeam: 'Lernen Sie unser Team kennen',
    founder: 'Gründer & CEO',
    founderBio: 'Mit über 15 Jahren Erfahrung bei der Erkundung der nördlichen Regionen Pakistans gründete Imran Map My Trip, um seine Leidenschaft für Abenteuer und kulturelle Erkundung zu teilen.',
    operations: 'Leiterin der Betriebsführung',
    operationsBio: 'Sara sorgt dafür, dass alle unsere Reisen reibungslos ablaufen, von der Transportlogistik bis hin zu Unterkunftsarrangements, und macht jede Reise problemlos.',
    tourGuide: 'Senior-Reiseführer',
    tourGuideBio: 'Ali, der in Hunza geboren und aufgewachsen ist, hat ein intimes Wissen über die nördlichen Gebiete und spricht mehrere lokale Sprachen, was Ihr Reiseerlebnis bereichert.',
    customerRelations: 'Kundenbeziehungen',
    customerRelationsBio: 'Zainab ist bestrebt, einen außergewöhnlichen Service vor, während und nach Ihrer Reise zu bieten und stellt sicher, dass alle Ihre Bedürfnisse mit einem Lächeln erfüllt werden.',
    
    whatOurTravelersSay: 'Was unsere Reisenden sagen',
    karachi: 'Karatschi',
    lahore: 'Lahore',
    islamabad: 'Islamabad',
    testimonial1: 'Unsere Reise nach Hunza war absolut lebensverändernd. Die Führer waren sachkundig, die Unterkünfte komfortabel und die Landschaft atemberaubend!',
    testimonial2: 'Als Alleinreisende war ich besorgt um die Sicherheit, aber Map My Trip ließ mich während meiner Reise in Skardu sicher fühlen. Sehr empfehlenswert!',
    testimonial3: 'Unsere Familienreise nach Naran war perfekt organisiert, mit Aktivitäten für alle Altersgruppen. Meine Kinder sprechen immer noch von dem Abenteuer!',
    
    readyToExperience: 'Bereit, die Schönheit Pakistans zu erleben?',
    joinUsOnJourney: 'Begleiten Sie uns auf einer unvergesslichen Reise durch das nördliche Paradies Pakistans',
    browseDestinations: 'Reiseziele durchsuchen',

    "Loading destinations...": "Reiseziele werden geladen...",
    "Explore Our Destinations": "Entdecke Unsere Reiseziele",
    "View Details": "Details Anzeigen", 

    myWishlist: 'Meine Wunschliste',
      loading: 'Wird geladen...',
      failedToLoadWishlist: 'Fehler beim Laden der Wunschliste. Bitte versuchen Sie es später erneut.',
      wishlistEmpty: 'Ihre Wunschliste ist leer',
      exploreDestinations: 'Reiseziele erkunden',
      unnamedDestination: 'Unbenanntes Reiseziel',
      viewDetails: 'Details anzeigen',
      remove: 'Entfernen',

      customizeYourTrip: "Gestalten Sie Ihre Reise ",
  requestSubmittedSuccessfully: "Ihre Anfrage für eine maßgeschneiderte Tour wurde erfolgreich übermittelt! Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.",
  errorSubmittingRequest: "Bei der Übermittlung Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  contactInformation: "Kontaktinformationen",
  fullName: "Vollständiger Name",
  email: "E-Mail",
  phone: "Telefonnummer",
  tripDetails: "Reisedetails",
  startDate: "Startdatum",
  endDate: "Enddatum",
  numberOfTravelers: "Anzahl der Reisenden",
  preferences: "Präferenzen",
  travelPreferences: "Reisepräferenzen",
  selectMultiple: "Mehrfachauswahl möglich",
  adventure: "Abenteuer",
  cultural: "Kulturell",
  relaxation: "Entspannung",
  wildlife: "Tierwelt",
  historical: "Historisch",
  accommodationPreference: "Unterkunftspräferenz",
  budget: "Budget",
  standard: "Standard",
  luxury: "Luxus",
  budgetRange: "Budgetbereich",
  economy: "Ökonomisch (PKR 20.000-50.000 pro Person)",
  medium: "Mittel (PKR 50.000-100.000 pro Person)",
  luxuryBudget: "Luxus (PKR 100.000+ pro Person)",
  additionalOptions: "Zusätzliche Optionen",
  includeInPackage: "Im Paket enthalten",
  transportation: "Transport",
  tourGuide: "Reiseführer",
  allMeals: "Alle Mahlzeiten",
  specialRequirements: "Besondere Anforderungen oder Wünsche",
  specialRequirementsPlaceholder: "Besondere Wünsche, Ernährungseinschränkungen, Barrierefreiheit oder Aktivitäten, die Sie einschließen möchten...",
  submitting: "Wird übermittelt...",
  requestCustomTour: "Maßgeschneiderte Tour anfragen",
  customTourNote: "* Unser Team wird sich innerhalb von 24 Stunden mit Ihnen in Verbindung setzen, um die Details Ihrer maßgeschneiderten Tour zu besprechen und Ihnen ein personalisiertes Angebot zu unterbreiten.",
  backToDestination: "Zurück zum Ziel",

  viewMyBookings: 'Meine Buchungen anzeigen',
  myBookings: {
    title: 'Meine Buchungen',
    loading: 'Buchungen werden geladen...',
    error: 'Fehler beim Laden Ihrer Buchungen. Bitte versuchen Sie es später erneut.',
    noBookings: 'Sie haben noch keine Buchungen.',
    exploreDestinations: 'Reiseziele erkunden',
    shareTitle: 'Meine bevorstehende Reise nach {{destination}}',
    shareDescription: 'Ich reise nach {{destination}} {{location}}',
    shareLocation: 'in {{location}}',
    bookingDetails: {
      bookingId: 'Buchungs-ID:',
      destination: 'Reiseziel:',
      date: 'Datum:',
      duration: 'Dauer:',
      travelers: 'Reisende:',
      accommodation: 'Unterkunft:',
      totalPrice: 'Gesamtpreis:',
      status: 'Status:',
      unknownDestination: 'Unbekanntes Reiseziel',
    },
    actions: {
      cancelBooking: 'Buchung stornieren',
      viewDestination: 'Reiseziel anzeigen',
      confirmCancel: 'Sind Sie sicher, dass Sie diese Buchung stornieren möchten?',

    },
    durations: {
      '3days': '3 Tage',
      '5days': '5 Tage',
      '7days': '7 Tage',
      '14days': '14 Tage',
    }
  },
  tryAgain: 'Erneut versuchen',
  day1Title: "Ankunft & Orientierung",
  day1Desc: "Ankunft am Zielort, Check-in in der Unterkunft, Willkommensdinner und Einführung in die Tour.",
  day2Title: "Erkundungstag",
  day2Desc: "Ganzer Tag zur Erkundung der Hauptattraktionen, einschließlich geführter Touren und Freizeit.",
  day3Title: "Abreisetag",
  day3Desc: "Freizeit am Morgen, Souvenirshopping und Abreise nach Lahore/Islamabad am Nachmittag.",
  day2Title5: "Lokale Erkundung",
  day2Desc5: "Erkundung der Hauptattraktionen mit einem lokalen Reiseführer.",
  day3Title5: "Abenteuerstag",
  day3Desc5: "Ganzer Tag mit Outdoor-Aktivitäten und Abenteuern, die zum Zielort passen.",
  day4Title: "Kulturelle Immersion",
  day4Desc: "Erleben der lokalen Kultur, Traditionen und Küche mit Interaktionen mit der lokalen Gemeinschaft.",
  day5Title: "Abreisetag",
  day5Desc: "Freizeit am Morgen, Souvenirshopping und Abreise nach Lahore/Islamabad am Nachmittag.",
  day5Title7: "Tour der versteckten Schätze",
  day5Desc7: "Besuch von abgelegenen Orten, die hauptsächlich den Einheimischen bekannt sind.",
  day6Title: "Entspannungstag",
  day6Desc: "Freier Tag zum Entspannen, Wiederbesuchen von Lieblingsorten oder Ausprobieren von optionalen Aktivitäten.",
  day7Title: "Abreisetag",
  day7Desc: "Freizeit am Morgen, Souvenirshopping und Abreise nach Lahore/Islamabad am Nachmittag."

    },
    chatbot: {
      title: "Kundendienst",
      welcome: "Willkommen bei unserem Reiseassistenten! Wie kann ich Ihnen heute helfen?",
      inputPlaceholder: "Geben Sie Ihre Nachricht hier ein...",
      sendButton: "Senden",
      feedbackQuestion: "War diese Antwort hilfreich?",
      feedbackYes: "Ja 👍",
      feedbackNo: "Nein 👎",
      feedbackThank: "Vielen Dank für Ihr Feedback!",
      errorMessage: "Entschuldigung, ich bin auf einen Fehler gestoßen. Bitte versuchen Sie es später erneut."
    }
  },
  zh: {
    translation: {
      review: {
        writeAReview: "写评论",
        rating: "评分",
        reviewTitle: "评论标题",
        reviewTitlePlaceholder: "总结您的体验或强调令您印象深刻的地方",
        yourReview: "您的评论",
        reviewCommentPlaceholder: "向他人分享您的体验 - 您喜欢什么，什么地方可以改进...",
        dateOfVisit: "参观日期",
        uploadPhotos: "上传照片",
        optional: "可选",
        photoGuidelines: "请上传JPG、JPEG或PNG格式的图片（每张最大5MB）",
        submitting: "提交中...",
        submitReview: "提交评论",
        titleRequired: "请为您的评论提供一个标题",
        commentTooShort: "您的评论必须至少包含10个字符",
        dateRequired: "请选择您的参观日期",
        futureDateInvalid: "您不能选择未来的日期",
        invalidImageFiles: "请只上传JPG或PNG格式的图片（每张最大5MB）",
        reviewSubmittedAwaitingApproval: "谢谢！您的评论已提交，正在等待审核。",
        alreadyReviewed: "您已经评论过这个目的地",
        reviewSubmitError: "提交评论时发生错误。请稍后再试。"
      },
      contactPage: {
        title: "联系我们",
        description: "我们很乐意听取您的意见。请填写下面的表格或使用我们的联系信息。",
        getInTouch: "取得联系",
        address: "123 商业大道，拉合尔",
        phone: "+1 (555) 123-4567",
        email: "MapMyTrip@gmail.com",
        hours: "星期一至星期五：上午9点至下午5点",
        sendMessage: "给我们发送消息",
        yourName: "您的姓名",
        yourEmail: "您的邮箱",
        subject: "主题",
        yourMessage: "您的信息",
        sendBtn: "发送消息",
        formSubmitted: "谢谢！您的消息已成功发送。"
      },
      booking: {
        title: "预订您的旅行目的地",
        defaultDestination: "目的地",
        loading: "正在加载预订详情...",
        errors: {
        failedToLoad: "无法加载目的地详情",
        selectDate: "请选择出行日期",
        invalidEasypaisa: "请输入有效的11位Easypaisa号码",
        bookingFailed: "预订失败。请重试。"
        },
        success: {
        confirmed: "预订已确认！",
        transactionId: "您的交易ID：",
        redirecting: "正在重定向到您的预订页面..."
        },
        sections: {
        tripDetails: "行程详情",
        contactInfo: "联系信息",
        payment: "支付",
        bookingSummary: "预订摘要",
        },
        fields: {
        travelDate: "出行日期：",
        duration: "持续时间：",
        travelers: "旅行者人数：",
        accommodation: "住宿：",
        firstName: "名字：",
        lastName: "姓氏：",
        email: "电子邮件：",
        phone: "电话：",
        specialRequests: "特殊要求："
        },
        durations: {
        "3days": "3天",
        "5days": "5天",
        "7days": "7天"
        },
        payment: {
        basePrice: "基础价格：",
        travelers: "旅行者",
        accommodationAdjustment: "住宿调整：",
        totalPrice: "总价：",
        method: "支付方式：",
        methods: {
        creditCard: "信用卡",
        creditCardDesc: "Visa、MasterCard、American Express",
        paypal: "PayPal",
        paypalDesc: "安全在线支付",
        easypaisa: "Easypaisa",
        easypaisaDesc: "使用您的手机账户支付"
        },
        easypaisaNumber: "Easypaisa手机号码：",
        easypaisaInfo1: "请输入您在Easypaisa注册的11位手机号码",
        easypaisaInfo2: "您将收到一个确认码以完成支付",
        securityInfo: "您的支付信息已加密并安全。我们绝不会存储您的完整信用卡详情。"
        },
        buttons: {
        processing: "处理中...",
        bookNow: "立即预订，价格PKR {{price}}",
        continueToPayment: "继续付款",
        }
      },
      blog: {
        title: '山地旅行',
        subtitle: '探索令人惊叹的景观和冒险',
        categories: {
          all: '全部',
          destinations: '目的地',
          adventure: '冒险',
          food: '山地美食'
        },
        readMore: '阅读更多',
        readTime: '{{count}} 分钟阅读',
        posts: {
          hunza: {
            title: '探索洪扎山谷的隐藏瑰宝',
            excerpt: '穿越巴基斯坦北部天堂的神奇景观',
            fullContent: '坐落在喀喇昆仑山脉的心脏地带，洪扎山谷是一个令人叹为观止的目的地，为旅行者提供了无与伦比的自然美景和文化底蕴。这个被高耸的山峰和古老冰川环绕的偏远山谷，拥有地球上最好客的人们。我们的探险揭示了令人惊叹的景观，从杏树梯田到穿越崎岖地形的晶莹剔透的河流。'
          },
          skardu: {
            title: '斯卡杜：极限冒险之门',
            excerpt: '在巴基斯坦冒险之都释放激情',
            fullContent: '斯卡杜位于吉尔吉特-巴尔蒂斯坦的中心，是冒险爱好者和自然爱好者的天堂。这个非凡的目的地是世界上一些最具挑战性的山地远征的大本营，包括通往地球第二高峰K2的路线。'
          },
          mountainCuisine: {
            title: '山地美食：山峰的味道',
            excerpt: '穿越传统山地菜谱的美食之旅',
            fullContent: '巴基斯坦的山地地区提供了与其景观一样壮观的美食体验。我们的美食探索揭示了一个丰富的味道锦缎，受到本地传统、可用食材和几个世纪的文化交流的影响。'
          }
        }
      },
      faq: {
        title: '常见问题',
        subtitle: '找到关于您的山地冒险的常见问题的答案',
        categories: {
          booking: {
            title: '预订',
            questions: {
              howToBook: {
                question: '如何预订山地之旅？',
                answer: '预订山地之旅很简单！访问我们的网站，选择您喜欢的目的地和日期，填写预订表格并完成付款。我们的客户支持团队全天候为您提供帮助。'
              },
              cancelModify: {
                question: '我可以取消或修改我的预订吗？',
                answer: '是的，您可以在预定游览前14天取消或修改预订。根据时间和旅游类型，可能会收取取消费用。请联系我们的客户支持获取详细信息。'
              }
            }
          },
          payments: {
            title: '支付和方法',
            questions: {
              paymentMethods: {
                question: '您接受哪些支付方式？',
                answer: '我们接受多种支付方式，包括信用卡/借记卡、银行转账、PayPal和本地支付平台如EasyPaisa。'
              },
              easyPaisa: {
                question: '如何使用EasyPaisa支付？',
                answer: 'EasyPaisa是一个方便的移动钱包和支付服务。在结账时简单选择EasyPaisa，输入您的手机号码，然后按提示完成交易。'
              }
            }
          },
          travel: {
            title: '旅行准备',
            questions: {
              specialty: {
                question: '是什么让您的山地之旅如此特别？',
                answer: '我们的山地之旅由对该地区有深入了解的本地专家策划。我们提供独特的体验、可持续旅游和对当地社区的支持，同时提供安全而难忘的冒险。'
              },
              packing: {
                question: '我应该为山地之旅准备什么？',
                answer: '打包多层衣物、结实的徒步鞋、防水装备、个人药品、防晒用品和一台好相机。我们在预订时提供详细的打包清单。'
              }
            }
          },
          support: {
            title: '客户支持',
            questions: {
              contact: {
                question: '如何联系客户支持？',
                answer: '您可以通过电子邮件support@mountainjourneys.com、电话+92 123 4567890或我们网站上的24/7在线聊天联系我们的客户支持。'
              }
            }
          }
        }
      },
      payment: {
        title: "完成付款",
        bookingSummary: "预订摘要",
        destination: "目的地",
        selectedDestination: "已选目的地",
        duration: "时长",
        duration3Days: "3天",
        duration5Days: "5天",
        duration7Days: "7天",
        travelers: "旅客",
        accommodation: "住宿",
        totalAmount: "总金额",
        paymentDetails: "付款详情",
        email: "电子邮箱",
        enterEmail: "请输入你的电子邮箱",
        paymentMethod: "付款方式",
        methods: {
          creditCard: "信用卡",
          paypal: "PayPal",
          easyPaisa: "EasyPaisa",
          jazzCash: "JazzCash"
        },
        creditCard: {
          cardNumber: "卡号",
          expiryDate: "到期日期",
          cvc: "CVC",
          securityMessage: "您的卡片信息是安全且加密的。"
        },
        easypaisa: {
          mobileNumber: "EasyPaisa 手机号",
          instruction: "请输入您在 EasyPaisa 注册的手机号。"
        },
        jazzcash: {
          mobileNumber: "JazzCash 手机号",
          instruction: "请输入您在 JazzCash 注册的手机号。"
        },
        confirmationCode: {
          label: "输入验证码",
          placeholder: "请输入发送到您手机上的4位验证码",
          sent: "验证码已发送至您的手机号 {mobileNumber}。",
          demo: "演示用验证码为：{code}"
        },
        paypal: {
          redirectMessage: "您将被重定向到 PayPal 完成安全付款。",
          checkoutTitle: "PayPal 结账",
          processing: "正在通过 PayPal 处理您的付款...",
          amount: "金额：PKR {amount}"
        },
        buttons: {
          back: "返回",
          confirmPayment: "确认付款",
          cancel: "取消",
          processing: "处理中...",
          continuePaypal: "继续前往 PayPal",
          pay: "支付 PKR {amount}",
          payNow: "立即支付"
        },
        processing: "正在处理您的付款...",
        success: {
          title: "付款成功！",
          message: "您的预订已确认。",
          redirecting: "正在跳转到您的预订页面..."
        },
        backToBookings: "返回我的预订",
        errors: {
          failedToLoadBooking: "无法加载预订信息。请稍后再试。",
          emailRequired: "请输入邮箱地址",
          selectPaymentMethod: "请选择一种付款方式",
          fillCardDetails: "请填写完整的信用卡信息",
          invalidCardNumber: "请输入有效的卡号",
          invalidExpiry: "请输入有效的到期日期 (MM/YY)",
          invalidCvc: "请输入有效的安全码",
          invalidMobileNumber: "请输入有效的手机号",
          invalidConfirmationCode: "请输入有效的验证码",
          paymentFailed: "付款失败，请重试。",
          processingFailed: "付款处理失败，请稍后再试。"
        }
      },

      home: '首页',
      destinations: '目的地',
      wishlist: "愿望清单",
      aboutUs: '关于我们',
      contact: '联系我们',
      login: '登录',
      register: '注册',
      tagline: '探索. 发现. 冒险.',
      bestTimeToVisit: "最佳游览时间",
      bestTimeToVisitLabel: "最佳游览时间",
      location: "位置",
      startingPrice: "起始价格",
      activitiesExperiences: "活动和体验",
      highlights: "亮点",
      about: "关于",
      savedDestinations: "已保存的目的地",
      addMore: "添加更多",
      confirmRemoval: "确认移除",
      removeConfirmationText: "您确定要从心愿单中移除此目的地吗？",
      cancel: "取消",
      remove: "移除",
      wishlistEmpty: "您的心愿单为空",
      exploreDestinations: "探索目的地",
      unnamedDestination: "未命名目的地",
      viewDetails: "查看详情",
      loading: "加载中...",
      failedToLoadWishlist: "加载心愿单失败。请稍后再试。",
      discoverNextAdventure: '发现您的下一次冒险',
      heroDescription: '探索巴基斯坦北部令人叹为观止的风景、高耸的山脉和宁静的山谷。从斯卡都的雪山到纳兰和洪扎的郁郁葱葱的草原，以前所未有的方式体验大自然。',
      startExploring: '开始探索',
      journeyBeginsHere: '您的旅程从这里开始',
      introDescription: '我们为像您这样的冒险者精心策划了最非凡的旅行体验。有了专业向导、独家住宿和精心计划的行程，您只需收拾行装，踏上一段难忘的旅程。',
      idealVacationLength: '您理想的假期有多长？',
      weekendEscape: '周末短途',
      oneToTwoWeeks: '1-2周',
      extendedTrip: '长期旅行',
      popularDestinations: '热门目的地',
      from: '起价',
      threeDays: '3天',
      fiveDays: '5天',
      sevenDays: '7天',
      hotels: "酒店",         
      viewDetails: '查看详情',
      viewAllDestinations: '查看所有目的地',
      readyForNextAdventure: '准备好您的下一次冒险了吗？',
      ctaDescription: '加入数千名与我们一起体验世界的旅行者。提前预订和团体冒险有特别优惠。',
      findYourTrip: '找到您的旅行',
      contactExperts: '联系我们的专家',
      loadingDestinations: '正在加载精彩目的地...',
      tryAgain: '再试一次',
      failedToLoadDestinations: '加载目的地失败',
      exploreOurDestinations: "探索我们的目的地",
      searchPlaceholder: "发现你的下一个冒险之旅...",
      navigationLinks: "导航链接",
      customerSupport: "客户支持",
      contactUs: "联系我们",
      resources: "资源",
      available: "可预订",
      unavailable: "暂时无法预订",
      save: "保存",
      saved: "已保存",
      shareDestination: "分享此目的地",
      exploreHighlights: "探索亮点",

      // Registration page translations for Chinese
joinUs: '加入我们，开始您的旅行之旅',
firstName: '名字',
lastName: '姓氏',
email: '电子邮箱',
password: '密码',
confirmPassword: '确认密码',
firstNamePlaceholder: '张',
lastNamePlaceholder: '伟',
emailPlaceholder: '您的邮箱@example.com',
passwordPlaceholder: '创建密码',
confirmPasswordPlaceholder: '确认您的密码',
termsAgreement: '我同意',
termsOfService: '服务条款',
and: '和',
privacyPolicy: '隐私政策',
createAccount: '创建账户',
creatingAccount: '正在创建账户...',
alreadyHaveAccount: '已有账户？',
signIn: '登录',
registrationSuccessful: '注册成功！',
welcomeAboard: '欢迎加入！请查看您的邮箱以验证账户。',
goToLogin: '前往登录',
passwordsDoNotMatch: '密码不匹配',
quote: '旅行并不总是美丽的。它并不总是舒适的。但没关系。旅途会改变你。',
quoteAuthor: '安东尼·波登',
'passwordStrength.0': '太弱',
'passwordStrength.1': '太弱',
'passwordStrength.2': '可以更强',
'passwordStrength.3': '中等强度',
'passwordStrength.4': '强密码',
'passwordStrength.5': '非常强的密码',

welcomeBack: '欢迎回来',
signInToContinue: '登录以继续您的冒险',
loginSuccessful: '登录成功！',
redirectingToAccount: '正在重定向到您的账户...',
rememberMe: '记住我',
forgotPassword: '忘记密码？',
signingIn: '正在登录...',
dontHaveAccount: '没有账户？',
fillAllFields: '请填写所有必填字段',
loginFailed: '登录失败',
loginFailedCheckCredentials: '登录失败。请检查您的凭据。',
passwordLoginPlaceholder: '您的密码',
loginQuote: '"千里之行，始于足下。"',
loginQuoteAuthor: '— 老子',
saveYourDreamDestinations: '保存您梦想的目的地',
failedToLoadDestinations: '目的地加载失败',
activity1: '观光和风景摄影',
activity2: '在美丽的山间小径上徒步旅行',
activity3: '探索当地市场和手工艺品',
activity4: '参观历史遗迹和文化地标',
activity5: '体验当地美食和传统菜肴',

standardHotel: '标准酒店',
standardHotelDesc: '配备基本设施的舒适客房',
luxuryResort: '豪华度假村',
luxuryResortDesc: '宽敞的房间，配备高级设施和美景',
localGuesthouse: '当地民宿',
localGuesthouseDesc: '与当地家庭共度真实体验',

bestTimeToVisit: '四月至十月',

review1: '绝对令人惊叹的体验！风景美得令人窒息，我们的导游知识渊博。',
review2: '美丽的目的地，住宿条件很好。',
review3: '我们经历过的最佳旅行之一。强烈推荐给家庭旅行！',

backToDestinations: '返回目的地',
overview: '概览',
itinerary: '行程',
accommodations: '住宿',
reviews: '评论',
hotelAccommodation: "酒店住宿",
planYourTrip: "规划您的行程",                 
transportation: "交通",
dailyBreakfast: "每日早餐",
localGuide: "本地导游",
packagePrice: "套餐价格",
priceIncludes: "包含住宿、导览行程和交通",
departureDates: "出发日期",
everySaturday: "每周六",
groupSize: "团队人数",
maximumPeople: "最多15人",
bookingPolicy: "预订政策",
advancePayment: "需支付50%预付款",

bookThisTrip: '预订此旅行',
departureDates: '出发日期',
groupSize: '团队规模',
bookingPolicy: '预订政策',
advancePayment: '需要支付50%预付款',

aboutTagline: '自2018年以来与世界分享巴基斯坦的自然美景',
ourStory: '我们的故事',
northernPakistanMountains: '巴基斯坦北部山脉',
storyParagraph1: 'Map My Trip的创立有一个简单的使命：在支持当地社区和促进可持续旅游的同时，展示巴基斯坦北部地区令人惊叹的美景。',
storyParagraph2: '从一群冒险爱好者的小型热情项目开始，已经发展成为一个值得信赖的旅行服务，帮助数千名旅行者体验巴基斯坦的山脉、山谷和文化的魔力。',
storyParagraph3: '我们相信旅行应该是变革性的、教育性的和负责任的。我们的团队由当地专家组成，他们热衷于与游客分享他们的家园，同时确保旅游业有利于当地社区并保护自然环境。',

ourValues: '我们的价值观',
environmentalResponsibility: '环境责任',
environmentalResponsibilityDesc: '我们通过废物管理计划，支持保护工作，以及教育旅行者可持续实践来最小化我们的生态足迹。',
communitySupport: '社区支持',
communitySupportDesc: '我们聘用当地导游，住在当地拥有的住宿，并将我们利润的一部分贡献给社区发展项目。',
safetyFirst: '安全第一',
safetyFirstDesc: '您的安全是我们的首要任务。我们保持高安全标准，提供全面的旅行前信息，并在您的旅程中提供24/7支持。',
authenticExperiences: '真实体验',
authenticExperiencesDesc: '我们超越了旅游景点，提供真正的文化交流和非常规冒险，让您与真实的巴基斯坦建立联系。',

meetOurTeam: '认识我们的团队',
founder: '创始人兼首席执行官',
founderBio: '凭借超过15年探索巴基斯坦北部地区的经验，Imran创立了Map My Trip，以分享他对冒险和文化探索的热情。',
operations: '运营主管',
operationsBio: 'Sara确保我们所有的旅行顺利进行，从交通物流到住宿安排，使每次旅程都无忧无虑。',
tourGuide: '高级导游',
tourGuideBio: 'Ali在洪扎出生和长大，对北部地区有着深入的了解，并且会说几种当地语言，丰富您的旅行体验。',
customerRelations: '客户关系',
customerRelationsBio: 'Zainab致力于在您的旅行前、中、后提供卓越的服务，确保您的所有需求都得到微笑的满足。',

whatOurTravelersSay: '我们的旅行者怎么说',
karachi: '卡拉奇',
lahore: '拉合尔',
islamabad: '伊斯兰堡',
testimonial1: '我们去洪扎的旅行绝对是改变生活的。导游知识渊博，住宿舒适，风景令人叹为观止！',
testimonial2: '作为一个单独女性旅行者，我很担心安全问题，但Map My Trip让我在斯卡都的整个旅程中感到安全。强烈推荐！',
testimonial3: '我们去纳兰的家庭旅行组织得很完美，有适合所有年龄段的活动。我的孩子们仍然谈论这次冒险！',

readyToExperience: '准备体验巴基斯坦的美丽？',
joinUsOnJourney: '加入我们，踏上穿越巴基斯坦北部天堂的难忘旅程',
browseDestinations: '浏览目的地',

"Loading destinations...": "正在加载目的地...",
"Explore Our Destinations": "探索我们的目的地",
"View Details": "查看详情",

myWishlist: '我的收藏列表',
loading: '加载中...',
failedToLoadWishlist: '加载收藏列表失败。请稍后再试。',
wishlistEmpty: '您的收藏列表为空',
exploreDestinations: '探索目的地',
unnamedDestination: '未命名目的地',
viewDetails: '查看详情',
remove: '移除',

customizeYourTrip: "定制您的旅行到",
requestSubmittedSuccessfully: "您的定制旅行请求已成功提交！我们的团队将很快与您联系。",
errorSubmittingRequest: "提交请求时出错。请再试一次。",
contactInformation: "联系信息",
fullName: "全名",
email: "电子邮件",
phone: "电话号码",
tripDetails: "行程详情",
startDate: "开始日期",
endDate: "结束日期",
numberOfTravelers: "旅行者数量",
preferences: "偏好",
travelPreferences: "旅行偏好",
selectMultiple: "可多选",
adventure: "冒险",
cultural: "文化",
relaxation: "放松",
wildlife: "野生动物",
historical: "历史",
accommodationPreference: "住宿偏好",
budget: "经济",
standard: "标准",
luxury: "豪华",
budgetRange: "预算范围",
economy: "经济型 (PKR 20,000-50,000 每人)",
medium: "中等 (PKR 50,000-100,000 每人)",
luxuryBudget: "豪华 (PKR 100,000+ 每人)",
additionalOptions: "附加选项",
includeInPackage: "包含在套餐中",
transportation: "交通",
tourGuide: "导游",
allMeals: "所有餐食",
specialRequirements: "特殊要求或请求",
specialRequirementsPlaceholder: "任何特殊要求、饮食限制、无障碍需求或您想包含的活动...",
submitting: "提交中...",
requestCustomTour: "请求定制旅行",
customTourNote: "* 我们的团队将在24小时内与您联系，讨论您的定制旅行细节并提供个性化报价。",
backToDestination: "返回目的地",

viewMyBookings: '查看我的预订',
myBookings: {
  title: '我的预订',
  loading: '正在加载您的预订...',
  error: '加载预订失败。请稍后再试。',
  noBookings: '您还没有任何预订。',
  exploreDestinations: '探索目的地',
  shareTitle: '我即将前往{{destination}}的旅行',
  shareDescription: '我将前往{{destination}} {{location}}',
  shareLocation: '在{{location}}',
  bookingDetails: {
    bookingId: '预订编号:',
    destination: '目的地:',
    date: '日期:',
    duration: '持续时间:',
    travelers: '旅行者:',
    accommodation: '住宿:',
    totalPrice: '总价:',
    status: '状态:',
    unknownDestination: '未知目的地',
  },
  actions: {
    cancelBooking: '取消预订',
    viewDestination: '查看目的地',
    confirmCancel: '您确定要取消此预订吗？',
  },
  durations: {
    '3days': '3 天',
    '5days': '5 天',
    '7days': '7 天',
    '14days': '14 天',
  }
},
tryAgain: '重试',

day1Title: "到达与导览",
day1Desc: "到达目的地，入住住宿，欢迎晚宴并简要介绍行程。",
day2Title: "探索日",
day2Desc: "全天探索主要景点，包括导览和自由活动时间。",
day3Title: "离境日",
day3Desc: "早晨自由活动，购买纪念品，下午前往拉合尔/伊斯兰堡。",
day2Title5: "本地探索",
day2Desc5: "与本地导游一起探索主要景点。",
day3Title5: "冒险日",
day3Desc5: "全天进行适合目的地的户外活动和冒险。",
day4Title: "文化沉浸",
day4Desc: "与当地社区互动，体验当地文化、传统和美食。",
day5Title: "离境日",
day5Desc: "早晨自由活动，购买纪念品，下午前往拉合尔/伊斯兰堡。",
day5Title7: "隐藏宝藏之旅",
day5Desc7: "参观主要为当地人所知的偏远景点。",
day6Title: "休闲日",
day6Desc: "自由活动日，可以放松，重游喜爱的景点或尝试可选活动。",
day7Title: "离境日",
day7Desc: "早晨自由活动，购买纪念品，下午前往拉合尔/伊斯兰堡。",
    },

    chatbot: {
      title: "客户支持",
      welcome: "欢迎使用我们的旅行助手！今天我能为您提供什么帮助？",
      inputPlaceholder: "请在此输入您的消息...",
      sendButton: "发送",
      feedbackQuestion: "这个回答有帮助吗？",
      feedbackYes: "有帮助 👍",
      feedbackNo: "没帮助 👎",
      feedbackThank: "感谢您的反馈！",
      errorMessage: "很抱歉，我遇到了一个错误。请稍后再试。"
    }
    
  },
  ur: {
     translation: {
         review: {
    writeAReview: "جائزہ لکھیں",
    rating: "ریٹنگ",
    reviewTitle: "جائزے کا عنوان",
    reviewTitlePlaceholder: "اپنے تجربے کا خلاصہ کریں یا جو چیز آپ کو سب سے زیادہ متاثر کی اس کو اجاگر کریں",
    yourReview: "آپ کا جائزہ",
    reviewCommentPlaceholder: "دوسروں کو اپنے تجربے کے بارے میں بتائیں - آپ نے کیا لطف اٹھایا، کیا بہتر ہو سکتا ہے...",
    dateOfVisit: "دورے کی تاریخ",
    uploadPhotos: "تصاویر اپ لوڈ کریں",
    optional: "اختیاری",
    photoGuidelines: "براہ کرم JPG، JPEG یا PNG فارمیٹ میں تصاویر اپ لوڈ کریں (ہر ایک کا زیادہ سے زیادہ 5MB)",
    submitting: "جمع کر رہے ہیں...",
    submitReview: "جائزہ جمع کریں",
    titleRequired: "براہ کرم اپنے جائزے کے لیے عنوان فراہم کریں",
    commentTooShort: "آپ کے جائزے میں کم از کم 10 حروف ہونے چاہیے",
    dateRequired: "براہ کرم اپنے دورے کی تاریخ منتخب کریں",
    futureDateInvalid: "آپ مستقبل کی تاریخ منتخب نہیں کر سکتے",
    invalidImageFiles: "براہ کرم صرف JPG یا PNG فارمیٹ میں تصاویر اپ لوڈ کریں (ہر ایک کا زیادہ سے زیادہ 5MB)",
    reviewSubmittedAwaitingApproval: "شکریہ! آپ کا جائزہ جمع کر دیا گیا ہے اور منظوری کا انتظار ہے۔",
    alreadyReviewed: "آپ پہلے سے ہی اس منزل کے لیے جائزہ شائع کر چکے ہیں",
    reviewSubmitError: "آپ کا جائزہ جمع کرنے میں خرابی ہوئی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔"
  },
      contactPage: {
        title: "ہم سے رابطہ کریں",
        description: "ہم آپ سے سننا پسند کریں گے۔ براہ کرم مندرجہ ذیل فارم بھریں یا ہماری رابطہ کی معلومات استعمال کریں۔",
        getInTouch: "رابطے میں رہیں",
        address: "123 بزنس ایونیو، لاہور",
        phone: "+92 (300) 123-4567",
        email: "MapMyTrip@gmail.com",
        hours: "پیر سے جمعہ: صبح 9 بجے سے شام 5 بجے",
        sendMessage: "ہمیں پیغام بھیجیں",
        yourName: "آپ کا نام",
        yourEmail: "آپ کا ای میل",
        subject: "موضوع",
        yourMessage: "آپ کا پیغام",
        sendBtn: "پیغام بھیجیں",
        formSubmitted: "شکریہ! آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔"
      },
    
      booking: {
        title: "اپنے سفر کا بکنگ کریں",
defaultDestination: "منزل",
loading: "بکنگ کی تفصیلات لوڈ کر رہے ہیں...",
errors: {
failedToLoad: "منزل کی تفصیلات لوڈ نہیں ہو سکیں",
selectDate: "براہ کرم سفر کی تاریخ منتخب کریں",
invalidEasypaisa: "براہ کرم 11 ہندسوں کا درست ایزی پیسہ نمبر درج کریں",
bookingFailed: "بکنگ مکمل نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔"
},
success: {
confirmed: "بکنگ تصدیق ہو گئی!",
transactionId: "آپ کا ٹرانزیکشن ID:",
redirecting: "آپ کے بکنگز کے صفحے پر بھیج رہے ہیں..."
},
sections: {
tripDetails: "سفر کی تفصیلات",
contactInfo: "رابطے کی معلومات",
payment: "ادائیگی",
bookingSummary: "بکنگ کا خلاصہ",
},
fields: {
travelDate: "سفر کی تاریخ:",
duration: "مدت:",
travelers: "مسافروں کی تعداد:",
accommodation: "قیام گاہ:",
firstName: "پہلا نام:",
lastName: "آخری نام:",
email: "ای میل:",
phone: "فون:",
specialRequests: "خصوصی درخواستیں:"
},
durations: {
"3days": "3 دن",
"5days": "5 دن",
"7days": "7 دن"
},
payment: {
basePrice: "بنیادی قیمت:",
travelers: "مسافر",
accommodationAdjustment: "قیام گاہ کی تبدیلی:",
totalPrice: "کل قیمت:",
method: "ادائیگی کا طریقہ:",
methods: {
creditCard: "کریڈٹ کارڈ",
creditCardDesc: "ویزا، ماسٹر کارڈ، امریکن ایکسپریس",
paypal: "پے پال",
paypalDesc: "محفوظ آن لائن ادائیگی",
easypaisa: "ایزی پیسہ",
easypaisaDesc: "اپنے موبائل اکاؤنٹ سے ادائیگی کریں"
},
easypaisaNumber: "ایزی پیسہ موبائل نمبر:",
easypaisaInfo1: "براہ کرم اپنا 11 ہندسوں کا موبائل نمبر درج کریں جو ایزی پیسہ میں رجسٹرڈ ہے",
easypaisaInfo2: "آپ کو ادائیگی مکمل کرنے کے لیے تصدیقی کوڈ ملے گا",
securityInfo: "آپ کی ادائیگی کی معلومات انکرپٹ اور محفوظ ہیں۔ ہم کبھی بھی آپ کے کریڈٹ کارڈ کی مکمل تفصیلات محفوظ نہیں کرتے۔"
},
buttons: {
processing: "پروسیسنگ...",
bookNow: "اب بک کریں PKR {{price}}",
continueToPayment: "ادائیگی جاری رکھیں",
}
      },

      blog: {
        title: 'پہاڑی سفر',
        subtitle: 'حیرت انگیز مناظر اور مہم جوئی دریافت کریں',
        categories: {
          all: 'تمام',
          destinations: 'منزلیں',
          adventure: 'مہم جوئی',
          food: 'پہاڑی کھانا'
        },
        readMore: 'مزید پڑھیں',
        readTime: '{{count}} منٹ پڑھنے کا وقت',
        posts: {
          hunza: {
            title: 'ہنزہ ویلی کے چھپے ہوئے جواہرات کی تلاش',
            excerpt: 'شمالی پاکستان کی جنت کے جادوئی مناظر کا سفر',
            fullContent: 'قراقرم پہاڑوں کے دل میں واقع، ہنزہ ویلی ایک شاندار منزل ہے جو مسافروں کو قدرتی خوبصورتی اور ثقافتی دولت کا بے مثال تجربہ فراہم کرتی ہے۔ یہ دور دراز کی وادی، عظیم چوٹیوں اور قدیم برفانی ندیوں سے گھری ہوئی، زمین کے سب سے مہمان نواز لوگوں کا گھر ہے۔ ہمارے مہم نے حیرت انگیز مناظر کا انکشاف کیا، خوبانی کے درختوں کی چھتوں سے لے کر صاف پانی کی ندیوں تک جو کھردرے زمین کو کاٹتی ہیں۔'
          },
          skardu: {
            title: 'سکردو: انتہائی مہم جوئی کا دروازہ',
            excerpt: 'پاکستان کے مہم جوئی کے دارالحکومت میں جوش و خروش',
            fullContent: 'گلگت بلتستان کے دل میں واقع سکردو، مہم جوئی کے شوقین افراد اور فطرت سے محبت کرنے والوں کے لیے جنت ہے۔ یہ غیر معمولی منزل دنیا کی کچھ انتہائی مشکل پہاڑی مہمات کے لیے بیس کیمپ کا کام کرتی ہے، جن میں K2 تک کے راستے شامل ہیں، جو زمین کی دوسری بلند ترین چوٹی ہے۔'
          },
          mountainCuisine: {
            title: 'پہاڑی کھانا: چوٹیوں کے ذائقے',
            excerpt: 'روایتی پہاڑی ترکیبوں کا پاک سفر',
            fullContent: 'پاکستان کے پہاڑی علاقے اپنے مناظر کی طرح ہی شاندار پاک تجربہ پیش کرتے ہیں۔ ہماری خوراکی کھوج نے مقامی روایات، دستیاب اجزاء اور صدیوں پرانے ثقافتی تبادلوں سے متاثر ذائقوں کا ایک بھرپور تانا بانا ظاہر کیا۔'
          }
        }
      },
      faq: {
        title: 'اکثر پوچھے جانے والے سوالات',
        subtitle: 'اپنی پہاڑی مہم جوئی کے بارے میں عام سوالات کے جوابات تلاش کریں',
        categories: {
          booking: {
            title: 'بکنگز',
            questions: {
              howToBook: {
                question: 'پہاڑی ٹور کیسے بک کروں؟',
                answer: 'پہاڑی ٹور بک کرنا آسان ہے! ہماری ویب سائٹ پر جائیں، اپنی پسندیدہ منزل اور تاریخیں منتخب کریں، بکنگ فارم بھریں اور ادائیگی کریں۔ ہماری کسٹمر سپورٹ ٹیم کسی بھی سوال میں آپ کی مدد کے لیے 24 گھنٹے دستیاب ہے۔'
              },
              cancelModify: {
                question: 'کیا میں اپنی بکنگ منسوخ یا تبدیل کر سکتا ہوں؟',
                answer: 'ہاں، آپ اپنے مقررہ ٹور سے 14 دن پہلے تک اپنی بکنگ منسوخ یا تبدیل کر سکتے ہیں۔ وقت اور ٹور کی قسم کے لحاظ سے منسوخی کی فیس لاگو ہو سکتی ہے۔ تفصیلی معلومات کے لیے براہ کرم ہماری کسٹمر سپورٹ سے رابطہ کریں۔'
              }
            }
          },
          payments: {
            title: 'ادائیگی اور طریقے',
            questions: {
              paymentMethods: {
                question: 'آپ کون سے ادائیگی کے طریقے قبول کرتے ہیں؟',
                answer: 'ہم متعدد ادائیگی کے طریقے قبول کرتے ہیں، جن میں کریڈٹ/ڈیبٹ کارڈز، بینک ٹرانسفرز، پے پال اور مقامی ادائیگی کے پلیٹ فارمز جیسے ایزی پیسہ شامل ہیں۔'
              },
              easyPaisa: {
                question: 'ادائیگی کے لیے ایزی پیسہ کیسے استعمال کروں؟',
                answer: 'ایزی پیسہ ایک آسان موبائل والیٹ اور ادائیگی کی سروس ہے۔ ادائیگی کے وقت صرف ایزی پیسہ منتخب کریں، اپنا موبائل نمبر درج کریں اور اپنے لین دین کو مکمل کرنے کے لیے ہدایات کی پیروی کریں۔'
              }
            }
          },
          travel: {
            title: 'سفر کی تیاری',
            questions: {
              specialty: {
                question: 'آپ کے پہاڑی ٹورز کو کیا چیز خاص بناتی ہے؟',
                answer: 'ہمارے پہاڑی ٹورز مقامی ماہرین کی طرف سے تیار کیے جاتے ہیں جن کو علاقے کا گہرا علم ہے۔ ہم منفرد تجربات، پائیدار سیاحت اور مقامی کمیونٹیز کی حمایت پیش کرتے ہیں جبکہ محفوظ اور یادگار مہم جوئی فراہم کرتے ہیں۔'
              },
              packing: {
                question: 'پہاڑی ٹور کے لیے میں کیا پیک کروں؟',
                answer: 'کپڑوں کی تہیں، مضبوط ہائیکنگ بوٹس، بارش سے بچنے والا سامان، ذاتی ادویات، دھوپ سے تحفظ اور ایک اچھا کیمرہ پیک کریں۔ ہم بکنگ کے وقت تفصیلی پیکنگ کی فہرست فراہم کرتے ہیں۔'
              }
            }
          },
          support: {
            title: 'کسٹمر سپورٹ',
            questions: {
              contact: {
                question: 'میں کسٹمر سپورٹ سے کیسے رابطہ کر سکتا ہوں؟',
                answer: 'آپ ہماری کسٹمر سپورٹ سے support@mountainjourneys.com پر ای میل، +92 123 4567890 پر فون، یا ہماری ویب سائٹ پر 24/7 لائیو چیٹ کے ذریعے رابطہ کر سکتے ہیں۔'
              }
            }
          }
        }
      },
     
      payment: {
        title: "اپنی ادائیگی مکمل کریں",
        bookingSummary: "بکنگ کا خلاصہ",
        destination: "منزل",
        selectedDestination: "منتخب شدہ منزل",
        duration: "مدت",
        duration3Days: "3 دن",
        duration5Days: "5 دن",
        duration7Days: "7 دن",
        travelers: "مسافر",
        accommodation: "قیام گاہ",
        totalAmount: "کل رقم",
        paymentDetails: "ادائیگی کی تفصیلات",
        email: "ای میل",
        enterEmail: "اپنا ای میل درج کریں",
        paymentMethod: "ادائیگی کا طریقہ",
        methods: {
          creditCard: "کریڈٹ کارڈ",
          paypal: "پے پال",
          easyPaisa: "ایزی پیسہ",
          jazzCash: "جاز کیش"
        },
        creditCard: {
          cardNumber: "کارڈ نمبر",
          expiryDate: "ختم ہونے کی تاریخ",
          cvc: "CVC",
          securityMessage: "آپ کے کارڈ کی تفصیلات محفوظ اور انکرپٹ ہیں۔"
        },
        easypaisa: {
          mobileNumber: "ایزی پیسہ موبائل نمبر",
          instruction: "ایزی پیسہ میں رجسٹرڈ موبائل نمبر درج کریں۔"
        },
        jazzcash: {
          mobileNumber: "جاز کیش موبائل نمبر",
          instruction: "جاز کیش میں رجسٹرڈ موبائل نمبر درج کریں۔"
        },
        confirmationCode: {
          label: "تصدیقی کوڈ درج کریں",
          placeholder: "آپ کے موبائل پر بھیجا گیا 4 ہندسوں کا کوڈ درج کریں",
          sent: "آپ کے نمبر {mobileNumber} پر تصدیقی کوڈ بھیج دیا گیا ہے۔",
          demo: "ڈیمو کے مقاصد کے لیے، یہ کوڈ استعمال کریں: {code}"
        },
        paypal: {
          redirectMessage: "آپ کو محفوظ ادائیگی کے لیے پے پال پر بھیج دیا جائے گا۔",
          checkoutTitle: "پے پال سے ادائیگی",
          processing: "پے پال سے آپ کی ادائیگی پروسیس کر رہے ہیں...",
          amount: "رقم: PKR {amount}"
        },
        buttons: {
          back: "واپس",
          confirmPayment: "ادائیگی کی تصدیق کریں",
          cancel: "منسوخ کریں",
          processing: "پروسیسنگ...",
          continuePaypal: "پے پال جاری رکھیں",
          pay: "PKR {amount} ادا کریں",
          payNow: "ابھی ادا کریں"
        },
        processing: "آپ کی ادائیگی پروسیس کر رہے ہیں...",
        success: {
          title: "ادائیگی کامیاب!",
          message: "آپ کی بکنگ کی تصدیق ہو گئی ہے۔",
          redirecting: "آپ کی بکنگز پر بھیج رہے ہیں..."
        },
        backToBookings: "میری بکنگز پر واپس",
        errors: {
          failedToLoadBooking: "بکنگ کی تفصیلات لوڈ نہیں ہو سکیں۔ براہ کرم دوبارہ کوشش کریں۔",
          emailRequired: "ای میل ضروری ہے",
          selectPaymentMethod: "براہ کرم ادائیگی کا طریقہ منتخب کریں",
          fillCardDetails: "براہ کرم کریڈٹ کارڈ کی تمام تفصیلات بھریں",
          invalidCardNumber: "براہ کرم درست کارڈ نمبر درج کریں",
          invalidExpiry: "براہ کرم درست ختم ہونے کی تاریخ درج کریں (MM/YY)",
          invalidCvc: "براہ کرم درست سیکیورٹی کوڈ درج کریں",
          invalidMobileNumber: "براہ کرم درست موبائل نمبر درج کریں",
          invalidConfirmationCode: "براہ کرم درست تصدیقی کوڈ درج کریں",
          paymentFailed: "ادائیگی ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
          processingFailed: "ادائیگی کی پروسیسنگ ناکام۔ براہ کرم بعد میں کوشش کریں۔"
        }
      },
      
      home: 'ہوم',
      destinations: 'منزلیں',
       wishlist: "خواہشات کی فہرست",
      aboutUs: 'ہمارے بارے میں',
      contact: 'رابطہ',
      login: 'لاگ ان',
      register: 'رجسٹر',
      tagline: 'دریافت کریں۔ تلاش کریں۔ مہم جوئی۔',
      bestTimeToVisit: "دورے کا بہترین وقت",
      bestTimeToVisitLabel: "دورے کا بہترین وقت",
      location: "مقام",
      startingPrice: "ابتدائی قیمت",
      activitiesExperiences: "سرگرمیاں اور تجربات",
      highlights: "خصوصیات",
      about: "کے بارے میں",
      available: "دستیاب",
      unavailable: "فی الوقت دستیاب نہیں",
      save: "محفوظ کریں",
      saved: "محفوظ شدہ",
      shareDestination: "یہ منزل شیئر کریں",
      exploreHighlights: "خصوصیات دریافت کریں",
      discoverNextAdventure: 'اپنی اگلی مہم جوئی دریافت کریں',
      heroDescription: 'شمالی پاکستان کے حیرت انگیز مناظر، بلند پہاڑ اور پُرسکون وادیاں دریافت کریں۔ سکردو کی برف پوش چوٹیوں سے نارن اور ہنزہ کے سبز چراگاہوں تک، فطرت کا تجربہ پہلے جیسا کبھی نہیں۔',
      startExploring: 'تلاش شروع کریں',
      journeyBeginsHere: 'آپ کا سفر یہاں سے شروع ہوتا ہے',
      introDescription: 'ہم نے آپ جیسے مہم جو افراد کے لیے سب سے غیر معمولی سفری تجربات منتخب کیے ہیں۔ ماہر گائیڈز، خصوصی قیام گاہوں اور احتیاط سے منصوبہ بند سفری پروگراموں کے ساتھ، آپ کو صرف اپنا سامان پیک کرنا ہے اور ایک یادگار سفر پر نکلنا ہے۔',
      idealVacationLength: 'آپ کی مثالی چھٹیوں کی مدت کتنی ہے؟',
      weekendEscape: 'ویک اینڈ کا فرار',
      oneToTwoWeeks: '1-2 ہفتے',
      extendedTrip: 'طویل سفر',
      saveYourDreamDestinations: 'اپنی خوابوں کی منزلیں محفوظ کریں',
      popularDestinations: 'مقبول منزلیں',
      savedDestinations: "محفوظ شدہ منزلیں",
      addMore: "مزید شامل کریں",
      confirmRemoval: "ہٹانے کی تصدیق کریں",
      removeConfirmationText: "کیا آپ واقعی یہ منزل اپنی خواہشات کی فہرست سے ہٹانا چاہتے ہیں؟",
      cancel: "منسوخ کریں",
      remove: "ہٹائیں",
      from: 'سے',
      threeDays: '3 دن',
      fiveDays: '5 دن',
      sevenDays: '7 دن',
      viewDetails: 'تفصیلات دیکھیں',
      viewAllDestinations: 'تمام منزلیں دیکھیں',
      readyForNextAdventure: 'اپنی اگلی مہم جوئی کے لیے تیار؟',
      ctaDescription: 'ہزاروں مسافروں میں شامل ہوں جنہوں نے ہمارے ساتھ دنیا کا تجربہ کیا ہے۔ پیشگی بکنگز اور گروپ مہم جوئی کے لیے خصوصی پیشکشیں دستیاب ہیں۔',
      findYourTrip: 'اپنا سفر تلاش کریں',
      contactExperts: 'ہمارے ماہرین سے رابطہ کریں',
      loadingDestinations: 'حیرت انگیز منزلیں لوڈ کر رہے ہیں...',
      tryAgain: 'دوبارہ کوشش کریں',
      failedToLoadDestinations: 'منزلیں لوڈ کرنے میں خرابی',
      searchPlaceholder:"اپنی اگلی مہم جوئی دریافت کریں...",
      navigationLinks:"نیویگیشن لنکس",
      customerSupport:"کسٹمر سپورٹ",
      contactUs:"ہم سے رابطہ کریں",
      resources: "وسائل",
      exploreOurDestinations:"ہماری منزلیں دریافت کریں",
      joinUs: 'ہمارے ساتھ شامل ہوں اور اپنا سفر شروع کریں',
      firstName: 'پہلا نام',
      lastName: 'آخری نام',
      email: 'ای میل ایڈریس',
      password: 'پاسورڈ',
      confirmPassword: 'پاسورڈ کی تصدیق کریں',
      firstNamePlaceholder: 'احمد',
      lastNamePlaceholder: 'علی',
      emailPlaceholder: 'آپ@ای میل.com',
      passwordPlaceholder: 'پاسورڈ بنائیں',
      confirmPasswordPlaceholder: 'اپنے پاسورڈ کی تصدیق کریں',
      termsAgreement: 'میں',
      termsOfService: 'شرائط و ضوابط',
      and: 'اور',
      privacyPolicy: 'رازداری کی پالیسی',
      createAccount: 'اکاؤنٹ بنائیں',
      creatingAccount: 'اکاؤنٹ بنایا جا رہا ہے...',
      alreadyHaveAccount: 'کیا آپ کا پہلے سے اکاؤنٹ ہے؟',
      signIn: 'لاگ ان کریں',
      registrationSuccessful: 'رجسٹریشن کامیاب!',
      welcomeAboard: 'خوش آمدید! اپنا اکاؤنٹ تصدیق کرنے کے لیے اپنی ای میل چیک کریں۔',
      goToLogin: 'لاگ ان پر جائیں',
      passwordsDoNotMatch: 'پاسورڈز میں مماثلت نہیں',
      quote: 'سفر ہمیشہ خوبصورت نہیں ہوتا۔ یہ ہمیشہ آرام دہ نہیں ہوتا۔ لیکن یہ ٹھیک ہے۔ سفر آپ کو بدل دیتا ہے۔',
      quoteAuthor: 'انتھونی بورڈین',
      'passwordStrength.0': 'بہت کمزور',
      'passwordStrength.1': 'بہت کمزور',
      'passwordStrength.2': 'مضبوط ہو سکتا ہے',
      'passwordStrength.3': 'درمیانی طاقت',
      'passwordStrength.4': 'مضبوط پاسورڈ',
      'passwordStrength.5': 'بہت مضبوط پاسورڈ',

        welcomeBack: 'واپس خوش آمدید',
    signInToContinue: 'اپنا مہم جوئی جاری رکھنے کے لیے لاگ ان کریں',
    loginSuccessful: 'لاگ ان کامیاب!',
    redirectingToAccount: 'آپ کے اکاؤنٹ پر بھیجا جا رہا ہے...',
    rememberMe: 'مجھے یاد رکھیں',
    forgotPassword: 'پاسورڈ بھول گئے؟',
    signingIn: 'لاگ ان ہو رہے ہیں...',
    dontHaveAccount: 'اکاؤنٹ نہیں ہے؟',
    fillAllFields: 'براہ کرم تمام ضروری فیلڈز بھریں',
    loginFailed: 'لاگ ان میں خرابی',
    loginFailedCheckCredentials: 'لاگ ان میں خرابی۔ براہ کرم اپنی تفصیلات چیک کریں۔',
    passwordLoginPlaceholder: 'آپ کا پاسورڈ',
    loginQuote: '"ہزار میل کا سفر ایک قدم سے شروع ہوتا ہے۔"',
    loginQuoteAuthor: '— لاؤ تزو',

    failedToLoadDestinations: 'منزلیں لوڈ نہیں ہو سکیں',
    activity1: 'سیاحت اور قدرتی مناظر کی فوٹوگرافی',
    activity2: 'پہاڑی راستوں میں پیدل سفر',
    activity3: 'مقامی بازاروں اور ہنر و صنعت کی تلاش',
    activity4: 'تاریخی مقامات اور ثقافتی یادگاروں کا دورہ',
    activity5: 'مقامی کھانوں اور روایتی پکوانوں کا تجربہ',

    standardHotel: 'معیاری ہوٹل',
    standardHotelDesc: 'بنیادی سہولات کے ساتھ آرام دہ کمرے',
    luxuryResort: 'لگژری ریزورٹ',
    luxuryResortDesc: 'بہترین سہولات اور نظاروں کے ساتھ کشادہ کمرے',
    localGuesthouse: 'مقامی گیسٹ ہاؤس',
    localGuesthouseDesc: 'مقامی خاندانوں کے ساتھ حقیقی تجربہ',

    day1Title: 'پہنچنا اور تعارف',
    day1Desc: 'منزل پر پہنچنا، چیک ان، خوش آمدیدی رات کا کھانا اور ٹور کی معلومات۔',
    day2Title: 'تلاش کا دن',
    day2Desc: 'اہم مقامات کی تلاش میں مکمل دن۔',
    day3Title: 'رخصتی کا دن',
    day3Desc: 'صبح کا فارغ وقت، یادگاری خریداری اور دوپہر میں رخصتی۔',

    bestTimeToVisit: 'اپریل سے اکتوبر',

    review1: 'بالکل ناقابل یقین تجربہ! منظر حیرت انگیز تھا اور ہمارا گائیڈ بہت جانکار تھا۔',
    review2: 'بہترین قیام گاہ کے ساتھ خوبصورت منزل۔',
    review3: 'ہمارے بہترین سفروں میں سے ایک۔ خاندانوں کے لیے انتہائی تجویز!',
      hotels: "ہوٹلز",
    backToDestinations: 'منزلوں پر واپس',
    overview: 'جائزہ',
    itinerary: 'سفری منصوبہ',
    accommodations: 'قیام گاہ',
    reviews: 'جائزے',
    about: 'کے بارے میں',
    highlights: 'خاص باتیں',
    tourItinerary: 'ٹور کا منصوبہ',
    hotelAccommodation: "ہوٹل میں قیام",
transportation: "نقل و حمل",
dailyBreakfast: "روزانہ ناشتہ",
localGuide: "مقامی گائیڈ",
packagePrice: "پیکج کی قیمت",
priceIncludes: "قیام گاہ، رہنمائی شدہ دورے اور نقل و حمل شامل ہے",
departureDates: "روانگی کی تاریخیں",
everySaturday: "ہر ہفتہ",
groupSize: "گروپ کا سائز",
maximumPeople: "زیادہ سے زیادہ 15 افراد",
bookingPolicy: "بکنگ کی پالیسی",
advancePayment: "50% پیشگی ادائیگی ضروری ہے",


    selectDuration: 'مدت منتخب کریں',
    threeDays: '3 دن',
    fiveDays: '5 دن',
    sevenDays: '7 دن',

    accommodationOptions: 'قیام گاہ کے اختیارات',
    chooseAccommodation: 'ہمارے احتیاط سے منتخب کردہ قیام گاہ کے اختیارات میں سے انتخاب کریں:',
    includedInBasePrice: 'بنیادی قیمت میں شامل',
    additionalCost: '+PKR {{amount}} اضافی',
    discountAmount: 'PKR {{amount}} رعایت',

    travelerReviews: 'مسافروں کے جائزے',
    planYourTrip: 'اپنا سفر منصوبہ بندی کریں',
    packagePrice: 'پیکج کی قیمت',
    priceIncludes: 'قیام گاہ، رہنمائی شدہ ٹورز اور نقل و حمل شامل ہے',

    hotelAccommodation: 'ہوٹل میں قیام',
    transportation: 'نقل و حمل',
    dailyBreakfast: 'روزانہ ناشتہ',
    localGuide: 'مقامی گائیڈ',

    bookThisTrip: 'اس سفر کو بک کریں',
    departureDates: 'روانگی کی تاریخیں',
    groupSize: 'گروپ کا سائز',
    bookingPolicy: 'بکنگ کی پالیسی',
    advancePayment: '50% پیشگی ادائیگی ضروری ہے',

    aboutTagline: '2018 سے پاکستان کی قدرتی خوبصورتی کو دنیا کے ساتھ بانٹ رہے ہیں',
    ourStory: 'ہماری کہانی',
    northernPakistanMountains: 'شمالی پاکستان کے پہاڑ',
    storyParagraph1: 'Map My Trip ایک سادہ مشن کے ساتھ قائم کیا گیا: پاکستان کے شمالی علاقوں کی حیرت انگیز خوبصورتی کو دکھانا اور ساتھ ہی مقامی کمیونٹیز کی مدد کرنا اور پائیدار سیاحت کو فروغ دینا۔',
    storyParagraph2: 'جو کچھ مہم جوئی کے شوقین افراد کے ایک چھوٹے گروپ کے جذباتی پروجیکٹ کے طور پر شروع ہوا تھا، وہ اب ایک قابل اعتماد سفری سروس بن گیا ہے جس نے ہزاروں مسافروں کو پاکستان کے پہاڑوں، وادیوں اور ثقافتوں کا جادو تجربہ کرنے میں مدد کی ہے۔',
    storyParagraph3: 'ہم یقین رکھتے ہیں کہ سفر تبدیلی لانے والا، تعلیمی اور ذمہ دارانہ ہونا چاہیے۔ ہماری ٹیم مقامی ماہرین پر مشتمل ہے جو اپنے آبائی علاقے کو زائرین کے ساتھ بانٹنے کے لیے پرجوش ہیں، اس بات کو یقینی بناتے ہوئے کہ سیاحت مقامی کمیونٹیز کو فائدہ پہنچائے اور قدرتی ماحول کو محفوظ رکھے۔',
    
    ourValues: 'ہماری اقدار',
    environmentalResponsibility: 'ماحولیاتی ذمہ داری',
    environmentalResponsibilityDesc: 'ہم فضلہ کے انتظام کے پروگراموں کے ذریعے اپنے ماحولیاتی اثرات کو کم کرتے ہیں، تحفظ کی کوششوں کی حمایت کرتے ہیں اور مسافروں کو پائیدار طریقوں کے بارے میں تعلیم دیتے ہیں۔',
    communitySupport: 'کمیونٹی کی مدد',
    communitySupportDesc: 'ہم مقامی گائیڈز کو ملازمت دیتے ہیں، مقامی ملکیتی اداروں میں ٹھہرتے ہیں اور اپنے منافع کا حصہ کمیونٹی ڈیولپمنٹ پروجیکٹس میں لگاتے ہیں۔',
    safetyFirst: 'حفاظت پہلے',
    safetyFirstDesc: 'آپ کی حفاظت ہماری ترجیح ہے۔ ہم اعلیٰ حفاظتی معیارات برقرار رکھتے ہیں، سفر سے پہلے مکمل معلومات فراہم کرتے ہیں اور آپ کے سفر کے دوران 24/7 مدد فراہم کرتے ہیں۔',
    authenticExperiences: 'حقیقی تجربات',
    authenticExperiencesDesc: 'ہم سیاحتی مقامات سے آگے بڑھ کر حقیقی ثقافتی تبادلے اور غیر معمولی مہم جوئی فراہم کرتے ہیں جو آپ کو حقیقی پاکستان سے جوڑتے ہیں۔',
    
    meetOurTeam: 'ہماری ٹیم سے ملیں',
    founder: 'بانی اور سی ای او',
    founderBio: 'شمالی پاکستان کے علاقوں کی تلاش میں 15 سال سے زیادہ تجربے کے ساتھ، عمران نے اپنے مہم جوئی اور ثقافتی تلاش کے جذبے کو بانٹنے کے لیے Map My Trip کی بنیاد رکھی۔',
    operations: 'آپریشنز کی سربراہ',
    operationsBio: 'سارہ اس بات کو یقینی بناتی ہے کہ ہمارے تمام سفر بآسانی چلیں، نقل و حمل کی لاجسٹکس سے لے کر قیام گاہ کے انتظامات تک، ہر سفر کو پریشانی سے پاک بناتے ہوئے۔',
    tourGuide: 'سینئر ٹور گائیڈ',
    tourGuideBio: 'ہنزہ میں پیدا اور پلا بڑھا، علی کو شمالی علاقوں کا گہرا علم ہے اور وہ کئی مقامی زبانیں بولتا ہے، جو آپ کے سفری تجربے کو مالا مال بناتا ہے۔',
    customerRelations: 'کسٹمر ریلیشنز',
    customerRelationsBio: 'زینب آپ کے سفر سے پہلے، دوران اور بعد میں شاندار خدمات فراہم کرنے کے لیے وقف ہے، اس بات کو یقینی بناتے ہوئے کہ آپ کی تمام ضروریات مسکراہٹ کے ساتھ پوری ہوں۔',
    
    whatOurTravelersSay: 'ہمارے مسافر کیا کہتے ہیں',
    karachi: 'کراچی',
    lahore: 'لاہور',
    islamabad: 'اسلام آباد',
    testimonial1: 'ہنزہ کا ہمارا سفر بالکل تبدیلی لانے والا تھا۔ گائیڈز جانکار تھے، قیام گاہ آرام دہ اور مناظر حیرت انگیز!',
    testimonial2: 'اکیلی مسافر کے طور پر، میں حفاظت کے بارے میں فکر مند تھی، لیکن Map My Trip نے مجھے سکردو میں اپنے پورے سفر کے دوران محفوظ محسوس کرایا۔ انتہائی تجویز!',
    testimonial3: 'نارن میں ہمارا خاندانی سفر بالکل منظم تھا، تمام عمروں کے لیے موزوں سرگرمیوں کے ساتھ۔ میرے بچے اب بھی اس مہم جوئی کی بات کرتے ہیں!',
    
    readyToExperience: 'پاکستان کی خوبصورتی کا تجربہ کرنے کے لیے تیار ہیں؟',
    joinUsOnJourney: 'شمالی پاکستان کی جنت میں ناقابل فراموش سفر پر ہمارے ساتھ شامل ہوں',
    browseDestinations: 'منزلیں دیکھیں',

    "Loading destinations...": "منزلیں لوڈ ہو رہی ہیں...",
    "Explore Our Destinations": "ہماری منزلوں کو دیکھیں",
    "View Details": "تفصیلات دیکھیں",

    
    myWishlist: 'میری خواہشات کی فہرست',
    loading: 'لوڈ ہو رہا ہے...',
    failedToLoadWishlist: 'خواہشات کی فہرست لوڈ کرنے میں خرابی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔',
    wishlistEmpty: 'آپ کی خواہشات کی فہرست خالی ہے',
    exploreDestinations: 'منزلوں کو دیکھیں',
    unnamedDestination: 'بے نام منزل',
    viewDetails: 'تفصیلات دیکھیں',
    remove: 'ہٹائیں',


    customizeYourTrip: "اپنے سفر کو اپنی مرضی کے مطابق بنائیں",
  requestSubmittedSuccessfully: "آپ کی مخصوص ٹور کی درخواست کامیابی سے بھیج دی گئی ہے! ہماری ٹیم جلد آپ سے رابطہ کرے گی۔",
  errorSubmittingRequest: "آپ کی درخواست بھیجنے میں خرابی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔",
  contactInformation: "رابطے کی معلومات",
  fullName: "مکمل نام",
  email: "ای میل",
  phone: "فون نمبر",
  tripDetails: "سفر کی تفصیلات",
  startDate: "شروع کی تاریخ",
  endDate: "ختم کی تاریخ",
  numberOfTravelers: "مسافروں کی تعداد",
  preferences: "ترجیحات",
  travelPreferences: "سفری ترجیحات",
  selectMultiple: "متعدد منتخب کریں",
  adventure: "مہم جوئی",
  cultural: "ثقافتی",
  relaxation: "آرام",
  wildlife: "جنگلی حیات",
  historical: "تاریخی",
  accommodationPreference: "قیام گاہ کی ترجیح",
  budget: "بجٹ",
  standard: "معیاری",
  luxury: "لگژری",
  budgetRange: "بجٹ کی رینج",
  economy: "اقتصادی (PKR 20,000-50,000 فی شخص)",
  medium: "درمیانی (PKR 50,000-100,000 فی شخص)",
  luxuryBudget: "لگژری (PKR 100,000+ فی شخص)",
  additionalOptions: "اضافی اختیارات",
  includeInPackage: "پیکج میں شامل کریں",
  transportation: "نقل و حمل",
  tourGuide: "ٹور گائیڈ",
  allMeals: "تمام کھانے",
  specialRequirements: "خصوصی ضروریات یا درخواستیں",
  specialRequirementsPlaceholder: "کوئی خصوصی درخواست، غذائی پابندیاں، رسائی کی ضروریات یا سرگرمیاں جو آپ شامل کرنا چاہتے ہیں...",
  submitting: "بھیجا جا رہا ہے...",
  requestCustomTour: "مخصوص ٹور کی درخواست کریں",
  customTourNote: "* ہماری ٹیم آپ کے مخصوص ٹور کی تفصیلات پر بات چیت کرنے اور آپ کو ذاتی اقتباس فراہم کرنے کے لیے 24 گھنٹے کے اندر آپ سے رابطہ کرے گی۔",
    backToDestination: 'منزل پر واپس',

    viewMyBookings: 'میری بکنگز دیکھیں',
      myBookings: {
        title: 'میری بکنگز',
        loading: 'آپ کی بکنگز لوڈ ہو رہی ہیں...',
        error: 'آپ کی بکنگز لوڈ کرنے میں خرابی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔',
        noBookings: 'آپ کی ابھی تک کوئی بکنگ نہیں ہے۔',
        exploreDestinations: 'منزلوں کو دیکھیں',
        shareTitle: '{{destination}} میں میرا آنے والا سفر',
        shareDescription: 'میں {{destination}} {{location}} جانے والا ہوں',
        shareLocation: '{{location}} میں',
        bookingDetails: {
          bookingId: 'بکنگ ID:',
          destination: 'منزل:',
          date: 'تاریخ:',
          duration: 'مدت:',
          travelers: 'مسافر:',
          accommodation: 'قیام گاہ:',
          totalPrice: 'کل قیمت:',
          status: 'حالت:',
          unknownDestination: 'نامعلوم منزل',

        },
        actions: {
          cancelBooking: 'بکنگ منسوخ کریں',
          viewDestination: 'منزل دیکھیں',
          confirmCancel: 'کیا آپ واقعی اس بکنگ کو منسوخ کرنا چاہتے ہیں؟',

        },
        durations: {
          '3days': '3 دن',
          '5days': '5 دن',
          '7days': '7 دن',
          '14days': '14 دن',

        }
      },
      tryAgain: 'دوبارہ کوشش کریں',  
    },
    currentlyUnavailable: "فی الوقت دستیاب نہیں",

    day1Title: "پہنچنا اور تعارف",
day1Desc: "منزل پر پہنچنا، قیام گاہ میں رجسٹر، خوش آمدیدی رات کا کھانا اور ٹور کے بارے میں بریفنگ۔",
day2Title: "تلاش کا دن",
day2Desc: "اہم مقامات کی تلاش میں مکمل دن، رہنمائی شدہ دورے اور فارغ وقت شامل ہے۔",
day3Title: "رخصتی کا دن",
day3Desc: "صبح کا فارغ وقت، یادگاری خریداری اور دوپہر میں لاہور/اسلام آباد کے لیے روانگی۔",
day2Title5: "مقامی تلاش",
day2Desc5: "مقامی گائیڈ کے ساتھ اہم مقامات کی تلاش۔",
day3Title5: "مہم جوئی کا دن",
day3Desc5: "منزل کے مطابق بیرونی سرگرمیوں اور مہم جوئی کا مکمل دن۔",
day4Title: "ثقافتی شمولیت",
day4Desc: "مقامی کمیونٹی کے ساتھ تعامل کے ذریعے مقامی ثقافت، روایات اور کھانوں کا تجربہ۔",
day5Title: "رخصتی کا دن",
day5Desc: "صبح کا فارغ وقت، یادگاری خریداری اور دوپہر میں لاہور/اسلام آباد کے لیے روانگی۔",
day5Title7: "چھپے ہوئے جواہرات کا ٹور",
day5Desc7: "ان جگہوں کا دورہ جو بنیادی طور پر صرف مقامی لوگ جانتے ہیں۔",
day6Title: "آرام کا دن",
day6Desc: "آرام کرنے، پسندیدہ جگہوں کو دوبارہ دیکھنے یا اختیاری سرگرمیاں کرنے کا آزاد دن۔",
day7Title: "رخصتی کا دن",
day7Desc: "صبح کا فارغ وقت، یادگاری خریداری اور دوپہر میں لاہور/اسلام آباد کے لیے روانگی۔",
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;