// services/hotelService.js
// Hotel data service for Pakistan northern areas destinations
// This service provides hotel information that's included in travel packages

const hotelData = {
  // Deosai National Park
  "deosai": {
    name: {
      en: "Deosai National Park",
      es: "Parque Nacional Deosai",
      fr: "Parc National de Deosai",
      de: "Deosai-Nationalpark",
      zh: "德奥赛国家公园",
      ur: "دیوسائی قومی پارک"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Deosai Camping Resort",
          es: "Resort de Camping Deosai",
          fr: "Resort de Camping Deosai",
          de: "Deosai Camping Resort",
          zh: "德奥赛露营度假村",
          ur: "دیوسائی کیمپنگ ریسورٹ"
        },
        category: "Standard",
        rating: 4,
        image: "/maxresdefault.jpg",
        description: {
          en: "Traditional camping experience with modern facilities in the heart of Deosai Plains.",
          es: "Experiencia de camping tradicional con instalaciones modernas en el corazón de las Llanuras de Deosai.",
          fr: "Expérience de camping traditionnelle avec des installations modernes au cœur des plaines de Deosai.",
          de: "Traditionelles Camping-Erlebnis mit modernen Einrichtungen im Herzen der Deosai-Ebenen.",
          zh: "在德奥赛平原中心享受传统露营体验和现代设施。",
          ur: "دیوسائی میدانوں کے دل میں جدید سہولات کے ساتھ روایتی کیمپنگ کا تجربہ۔"
        },
        amenities: {
          en: ["Mountain Views", "Bonfire Area", "Local Cuisine", "Guided Tours"],
          es: ["Vistas de las Montañas", "Área de Fogata", "Cocina Local", "Tours Guiados"],
          fr: ["Vues sur les Montagnes", "Coin Feu de Camp", "Cuisine Locale", "Visites Guidées"],
          de: ["Bergblick", "Lagerfeuerplatz", "Lokale Küche", "Geführte Touren"],
          zh: ["山景", "篝火区", "当地美食", "导游服务"],
          ur: ["پہاڑی مناظر", "الاؤ کا علاقہ", "مقامی کھانا", "رہنمائی والے دورے"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Luxury Tents", "Standard Tents"],
          es: ["Tiendas de Lujo", "Tiendas Estándar"],
          fr: ["Tentes de Luxe", "Tentes Standard"],
          de: ["Luxuszelte", "Standardzelte"],
          zh: ["豪华帐篷", "标准帐篷"],
          ur: ["لگژری خیمے", "معیاری خیمے"]
        },
        location: {
          en: "Deosai Plains",
          es: "Llanuras de Deosai",
          fr: "Plaines de Deosai",
          de: "Deosai-Ebenen",
          zh: "德奥赛平原",
          ur: "دیوسائی میدان"
        }
      }
    ]
  },

  // Skardu
  "skardu": {
    name: {
      en: "Skardu",
      es: "Skardu",
      fr: "Skardu",
      de: "Skardu",
      zh: "斯卡杜",
      ur: "سکردو"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Skardu Inn Hotel",
          es: "Hotel Skardu Inn",
          fr: "Hôtel Skardu Inn",
          de: "Skardu Inn Hotel",
          zh: "斯卡杜旅馆酒店",
          ur: "سکردو ان ہوٹل"
        },
        category: "Standard",
        rating: 4,
        image: "/591987504.jpg",
        description: {
          en: "Comfortable hotel in the heart of Skardu city with easy access to all major attractions.",
          es: "Hotel cómodo en el corazón de la ciudad de Skardu con fácil acceso a todas las atracciones principales.",
          fr: "Hôtel confortable au cœur de la ville de Skardu avec un accès facile à toutes les attractions principales.",
          de: "Komfortables Hotel im Herzen der Stadt Skardu mit einfachem Zugang zu allen wichtigen Sehenswürdigkeiten.",
          zh: "位于斯卡杜市中心的舒适酒店，方便前往所有主要景点。",
          ur: "سکردو شہر کے دل میں آرام دہ ہوٹل جو تمام اہم پرکشش مقامات تک آسان رسائی فراہم کرتا ہے۔"
        },
        amenities: {
          en: ["City Views", "Restaurant", "WiFi", "Tour Desk"],
          es: ["Vistas de la Ciudad", "Restaurante", "WiFi", "Mesa de Tours"],
          fr: ["Vues sur la Ville", "Restaurant", "WiFi", "Bureau des Excursions"],
          de: ["Stadtblick", "Restaurant", "WiFi", "Tourenservice"],
          zh: ["城市景观", "餐厅", "WiFi", "旅游服务台"],
          ur: ["شہری مناظر", "ریسٹورنٹ", "وائی فائی", "ٹور ڈیسک"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Standard Rooms", "Deluxe Rooms"],
          es: ["Habitaciones Estándar", "Habitaciones Deluxe"],
          fr: ["Chambres Standard", "Chambres Deluxe"],
          de: ["Standardzimmer", "Deluxe-Zimmer"],
          zh: ["标准客房", "豪华客房"],
          ur: ["معیاری کمرے", "ڈیلکس کمرے"]
        },
        location: {
          en: "Skardu City Center",
          es: "Centro de la Ciudad de Skardu",
          fr: "Centre-ville de Skardu",
          de: "Stadtzentrum von Skardu",
          zh: "斯卡杜市中心",
          ur: "سکردو شہر کا مرکز"
        }
      },
      {
        id: 3,
        name: {
          en: "K2 Motel Skardu",
          es: "Motel K2 Skardu",
          fr: "Motel K2 Skardu",
          de: "K2 Motel Skardu",
          zh: "K2汽车旅馆斯卡杜",
          ur: "کے ٹو موٹل سکردو"
        },
        category: "Budget",
        rating: 3,
        image: "/hotel.jpg",
        description: {
          en: "Budget-friendly accommodation perfect for backpackers and adventure travelers.",
          es: "Alojamiento económico perfecto para mochileros y viajeros de aventura.",
          fr: "Hébergement économique parfait pour les routards et les voyageurs d'aventure.",
          de: "Budgetfreundliche Unterkunft, perfekt für Rucksacktouristen und Abenteuerreisende.",
          zh: "经济实惠的住宿，非常适合背包客和冒险旅行者。",
          ur: "بیک پیکرز اور ایڈونچر مسافروں کے لیے موزوں بجٹ میں قیام گاہ۔"
        },
        amenities: {
          en: ["Basic Amenities", "Shared Kitchen", "Common Area", "Trekking Support"],
          es: ["Comodidades Básicas", "Cocina Compartida", "Área Común", "Apoyo para Trekking"],
          fr: ["Équipements de Base", "Cuisine Partagée", "Espace Commun", "Support de Randonnée"],
          de: ["Grundausstattung", "Gemeinschaftsküche", "Gemeinschaftsbereich", "Trekking-Unterstützung"],
          zh: ["基本设施", "共用厨房", "公共区域", "徒步旅行支持"],
          ur: ["بنیادی سہولات", "مشترکہ کچن", "عام علاقہ", "ٹریکنگ سپورٹ"]
        },
        priceAdjustment: -3000,
        roomTypes: {
          en: ["Single Rooms", "Dormitory"],
          es: ["Habitaciones Individuales", "Dormitorio"],
          fr: ["Chambres Simples", "Dortoir"],
          de: ["Einzelzimmer", "Schlafsaal"],
          zh: ["单人房", "宿舍"],
          ur: ["سنگل کمرے", "ڈورمیٹری"]
        },
        location: {
          en: "Near Skardu Airport",
          es: "Cerca del Aeropuerto de Skardu",
          fr: "Près de l'Aéroport de Skardu",
          de: "In der Nähe des Flughafens Skardu",
          zh: "靠近斯卡杜机场",
          ur: "سکردو ایئرپورٹ کے قریب"
        }
      }
    ]
  },

  // Naran Kaghan
  "naran": {
    name: {
      en: "Naran Kaghan",
      es: "Naran Kaghan",
      fr: "Naran Kaghan",
      de: "Naran Kaghan",
      zh: "纳兰卡甘",
      ur: "نران کگھان"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Pine Park Hotel Naran",
          es: "Hotel Pine Park Naran",
          fr: "Hôtel Pine Park Naran",
          de: "Pine Park Hotel Naran",
          zh: "纳兰松树公园酒店",
          ur: "پائن پارک ہوٹل نران"
        },
        category: "Standard",
        rating: 4,
        image: "/20150928-170431-largejpg.jpg",
        description: {
          en: "Charming hotel surrounded by pine forests with easy access to Saif-ul-Malook Lake.",
          es: "Encantador hotel rodeado de bosques de pinos con fácil acceso al Lago Saif-ul-Malook.",
          fr: "Charmant hôtel entouré de forêts de pins avec un accès facile au lac Saif-ul-Malook.",
          de: "Charmantes Hotel umgeben von Pinienwäldern mit einfachem Zugang zum Saif-ul-Malook-See.",
          zh: "迷人的酒店，被松树林环绕，方便前往赛夫-乌尔-马卢克湖。",
          ur: "پائن کے جنگلوں سے گھرا دلکش ہوٹل جو صیف الملوک جھیل تک آسان رسائی فراہم کرتا ہے۔"
        },
        amenities: {
          en: ["Forest Views", "Restaurant", "Parking", "Lake Tours"],
          es: ["Vistas del Bosque", "Restaurante", "Estacionamiento", "Tours del Lago"],
          fr: ["Vues sur la Forêt", "Restaurant", "Parking", "Excursions au Lac"],
          de: ["Waldblick", "Restaurant", "Parkplatz", "Seetouren"],
          zh: ["森林景观", "餐厅", "停车场", "湖泊游览"],
          ur: ["جنگلی مناظر", "ریسٹورنٹ", "پارکنگ", "جھیل کے دورے"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Standard Rooms", "Family Rooms"],
          es: ["Habitaciones Estándar", "Habitaciones Familiares"],
          fr: ["Chambres Standard", "Chambres Familiales"],
          de: ["Standardzimmer", "Familienzimmer"],
          zh: ["标准客房", "家庭房"],
          ur: ["معیاری کمرے", "خاندانی کمرے"]
        },
        location: {
          en: "Naran Valley",
          es: "Valle de Naran",
          fr: "Vallée de Naran",
          de: "Naran-Tal",
          zh: "纳兰山谷",
          ur: "نران ویلی"
        }
      }
    ]
  },

  // Hunza Valley
  "hunza": {
    name: {
      en: "Hunza Valley",
      es: "Valle de Hunza",
      fr: "Vallée de Hunza",
      de: "Hunza-Tal",
      zh: "罕萨山谷",
      ur: "ہنزہ ویلی"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Hunza Serena Inn",
          es: "Posada Hunza Serena",
          fr: "Auberge Hunza Serena",
          de: "Hunza Serena Gasthaus",
          zh: "罕萨塞琳娜客栈",
          ur: "ہنزہ سرینا ان"
        },
        category: "Luxury",
        rating: 5,
        image: "/574998174.jpg",
        description: {
          en: "Luxury hotel with traditional Hunza architecture and modern amenities, overlooking Rakaposhi peak.",
          es: "Hotel de lujo con arquitectura tradicional de Hunza y comodidades modernas, con vista al pico Rakaposhi.",
          fr: "Hôtel de luxe avec architecture traditionnelle de Hunza et équipements modernes, surplombant le pic Rakaposhi.",
          de: "Luxushotel mit traditioneller Hunza-Architektur und modernen Annehmlichkeiten, mit Blick auf den Rakaposhi-Gipfel.",
          zh: "豪华酒店，采用传统罕萨建筑风格和现代设施，俯瞰拉卡波希峰。",
          ur: "ہنزہ کی روایتی فن تعمیر اور جدید سہولات کے ساتھ لگژری ہوٹل، راکاپوشی چوٹی کا نظارہ۔"
        },
        amenities: {
          en: ["Mountain Views", "Traditional Architecture", "Fine Dining", "Cultural Shows"],
          es: ["Vistas de las Montañas", "Arquitectura Tradicional", "Cena Fina", "Espectáculos Culturales"],
          fr: ["Vues sur les Montagnes", "Architecture Traditionnelle", "Cuisine Raffinée", "Spectacles Culturels"],
          de: ["Bergblick", "Traditionelle Architektur", "Gehobene Küche", "Kulturshows"],
          zh: ["山景", "传统建筑", "精致餐饮", "文化表演"],
          ur: ["پہاڑی مناظر", "روایتی فن تعمیر", "عمدہ کھانا", "ثقافتی شوز"]
        },
        priceAdjustment: 20000,
        roomTypes: {
          en: ["Deluxe Rooms", "Royal Suites"],
          es: ["Habitaciones Deluxe", "Suites Reales"],
          fr: ["Chambres Deluxe", "Suites Royales"],
          de: ["Deluxe-Zimmer", "Königssuiten"],
          zh: ["豪华客房", "皇家套房"],
          ur: ["ڈیلکس کمرے", "شاہی سوٹس"]
        },
        location: {
          en: "Karimabad, Hunza",
          es: "Karimabad, Hunza",
          fr: "Karimabad, Hunza",
          de: "Karimabad, Hunza",
          zh: "卡里马巴德，罕萨",
          ur: "کریم آباد، ہنزہ"
        }
      },
      {
        id: 2,
        name: {
          en: "Eagle's Nest Hotel",
          es: "Hotel Nido del Águila",
          fr: "Hôtel Nid d'Aigle",
          de: "Adlernest Hotel",
          zh: "鹰巢酒店",
          ur: "عقاب کا گھونسلہ ہوٹل"
        },
        category: "Standard",
        rating: 4,
        image: "/eagle-nest-hotel-hunza-3.jpg",
        description: {
          en: "Comfortable accommodation with panoramic views of Hunza Valley and surrounding peaks.",
          es: "Alojamiento cómodo con vistas panorámicas del Valle de Hunza y los picos circundantes.",
          fr: "Hébergement confortable avec des vues panoramiques sur la vallée de Hunza et les pics environnants.",
          de: "Komfortable Unterkunft mit Panoramablick auf das Hunza-Tal und die umliegenden Gipfel.",
          zh: "舒适的住宿，享有罕萨山谷和周围山峰的全景。",
          ur: "ہنزہ ویلی اور آس پاس کی چوٹیوں کے پینورامک منظر کے ساتھ آرام دہ قیام گاہ۔"
        },
        amenities: {
          en: ["Valley Views", "Local Cuisine", "Trekking Support", "Cultural Tours"],
          es: ["Vistas del Valle", "Cocina Local", "Apoyo para Trekking", "Tours Culturales"],
          fr: ["Vues sur la Vallée", "Cuisine Locale", "Support de Randonnée", "Excursions Culturelles"],
          de: ["Talblick", "Lokale Küche", "Trekking-Unterstützung", "Kulturtouren"],
          zh: ["山谷景观", "当地美食", "徒步旅行支持", "文化游览"],
          ur: ["وادی کے مناظر", "مقامی کھانا", "ٹریکنگ سپورٹ", "ثقافتی دورے"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Standard Rooms", "Family Rooms"],
          es: ["Habitaciones Estándar", "Habitaciones Familiares"],
          fr: ["Chambres Standard", "Chambres Familiales"],
          de: ["Standardzimmer", "Familienzimmer"],
          zh: ["标准客房", "家庭房"],
          ur: ["معیاری کمرے", "خاندانی کمرے"]
        },
        location: {
          en: "Duikar, Hunza",
          es: "Duikar, Hunza",
          fr: "Duikar, Hunza",
          de: "Duikar, Hunza",
          zh: "杜伊卡尔，罕萨",
          ur: "دوئیکر، ہنزہ"
        }
      }
    ]
  },

  // Shogran
  "shogran": {
    name: {
      en: "Shogran",
      es: "Shogran",
      fr: "Shogran",
      de: "Shogran",
      zh: "绍格兰",
      ur: "شوگران"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Pine Park Hotel and Resort",
          es: "Hotel y Resort Pine Park",
          fr: "Hôtel et Resort Pine Park",
          de: "Pine Park Hotel und Resort",
          zh: "松树公园酒店度假村",
          ur: "پائن پارک ہوٹل اینڈ ریسورٹ"
        },
        category: "Standard",
        rating: 4,
        image: "/ABR_8577_DxO-copy.jpg",
        description: {
          en: "Mountain resort offering comfortable stays with beautiful meadow views.",
          es: "Resort de montaña que ofrece estancias cómodas con hermosas vistas de prados.",
          fr: "Resort de montagne offrant des séjours confortables avec de belles vues sur les prairies.",
          de: "Bergresort mit komfortablen Aufenthalten und schönen Wiesenblicken.",
          zh: "山地度假村，提供舒适的住宿和美丽的草地景观。",
          ur: "خوبصورت چراگاہوں کے مناظر کے ساتھ آرام دہ قیام فراہم کرنے والا پہاڑی ریسورٹ۔"
        },
        amenities: {
          en: ["Meadow Views", "Restaurant", "Bonfire", "Hiking Trails"],
          es: ["Vistas de Prados", "Restaurante", "Fogata", "Senderos de Senderismo"],
          fr: ["Vues sur les Prairies", "Restaurant", "Feu de Camp", "Sentiers de Randonnée"],
          de: ["Wiesenblick", "Restaurant", "Lagerfeuer", "Wanderwege"],
          zh: ["草地景观", "餐厅", "篝火", "徒步小径"],
          ur: ["چراگاہ کے مناظر", "ریسٹورنٹ", "الاؤ", "پیدل راستے"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Standard Rooms", "Hill View Rooms"],
          es: ["Habitaciones Estándar", "Habitaciones con Vista a la Colina"],
          fr: ["Chambres Standard", "Chambres Vue Colline"],
          de: ["Standardzimmer", "Zimmer mit Hügelblick"],
          zh: ["标准客房", "山景房"],
          ur: ["معیاری کمرے", "پہاڑی منظر کے کمرے"]
        },
        location: {
          en: "Shogran Meadows",
          es: "Prados de Shogran",
          fr: "Prairies de Shogran",
          de: "Shogran-Wiesen",
          zh: "绍格兰草地",
          ur: "شوگران کی چراگاہیں"
        }
      }
    ]
  },

  // Fairy Meadows
  "fairy_meadows": {
    name: {
      en: "Fairy Meadows",
      es: "Praderas de las Hadas",
      fr: "Prairies des Fées",
      de: "Feenwiesen",
      zh: "仙女草地",
      ur: "پری میڈوز"
    },
    hotels: [
      {
        id: 1,
        name: {
          en: "Fairy Meadows Camping Resort",
          es: "Resort de Camping Praderas de las Hadas",
          fr: "Resort de Camping Prairies des Fées",
          de: "Feenwiesen Camping Resort",
          zh: "仙女草地露营度假村",
          ur: "فیری میڈوز کیمپنگ ریسورٹ"
        },
        category: "Standard",
        rating: 4,
        image: "/fairy-meadows-broad-view-hotel-and-resort-img10-02.jpg",
        description: {
          en: "Unique camping experience with direct views of Nanga Parbat, the killer mountain.",
          es: "Experiencia única de camping con vistas directas del Nanga Parbat, la montaña asesina.",
          fr: "Expérience de camping unique avec vues directes sur le Nanga Parbat, la montagne tueuse.",
          de: "Einzigartiges Camping-Erlebnis mit direktem Blick auf den Nanga Parbat, den Killerberg.",
          zh: "独特的露营体验，直接欣赏南迦帕尔巴特峰（杀手山）。",
          ur: "نانگا پربت (قاتل پہاڑ) کے براہ راست نظارے کے ساتھ منفرد کیمپنگ کا تجربہ۔"
        },
        amenities: {
          en: ["Nanga Parbat Views", "Camping Experience", "Local Food", "Trekking Base"],
          es: ["Vistas del Nanga Parbat", "Experiencia de Camping", "Comida Local", "Base de Trekking"],
          fr: ["Vues sur Nanga Parbat", "Expérience de Camping", "Nourriture Locale", "Base de Randonnée"],
          de: ["Nanga Parbat Blick", "Camping-Erlebnis", "Lokales Essen", "Trekking-Basis"],
          zh: ["南迦帕尔巴特景观", "露营体验", "当地食物", "徒步基地"],
          ur: ["نانگا پربت کے مناظر", "کیمپنگ کا تجربہ", "مقامی کھانا", "ٹریکنگ بیس"]
        },
        priceAdjustment: 0,
        roomTypes: {
          en: ["Alpine Tents", "Wooden Cottages"],
          es: ["Tiendas Alpinas", "Cabañas de Madera"],
          fr: ["Tentes Alpines", "Chalets en Bois"],
          de: ["Alpine Zelte", "Holzhütten"],
          zh: ["高山帐篷", "木屋"],
          ur: ["الپائن خیمے", "لکڑی کے کاٹیج"]
        },
        location: {
          en: "Fairy Meadows Base",
          es: "Base de Praderas de las Hadas",
          fr: "Base des Prairies des Fées",
          de: "Feenwiesen-Basis",
          zh: "仙女草地基地",
          ur: "فیری میڈوز بیس"
        }
      }
    ]
  },

// Kashmir
"kashmir": {
  name: {
    en: "Kashmir",
    es: "Cachemira",
    fr: "Cachemire",
    de: "Kaschmir",
    zh: "克什米尔",
    ur: "کشمیر"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Kashmir Crown Hotel",
        es: "Hotel Corona de Cachemira",
        fr: "Hôtel Couronne du Cachemire",
        de: "Kashmir Krone Hotel",
        zh: "克什米尔皇冠酒店",
        ur: "کشمیر کراؤن ہوٹل"
      },
      category: "Standard",
      rating: 4,
      image: "/srinagar-jammu-and-kashmir-pic-28.jpeg",
      description: {
        en: "Comfortable hotel in the heart of Kashmir with traditional hospitality.",
        es: "Hotel cómodo en el corazón de Cachemira con hospitalidad tradicional.",
        fr: "Hôtel confortable au cœur du Cachemire avec hospitalité traditionnelle.",
        de: "Komfortables Hotel im Herzen Kaschmirs mit traditioneller Gastfreundschaft.",
        zh: "位于克什米尔中心的舒适酒店，提供传统款待。",
        ur: "کشمیر کے دل میں روایتی مہمان نوازی کے ساتھ آرام دہ ہوٹل۔"
      },
      amenities: {
        en: ["Garden Views", "Traditional Cuisine", "Cultural Programs", "Shopping Tours"],
        es: ["Vistas del Jardín", "Cocina Tradicional", "Programas Culturales", "Tours de Compras"],
        fr: ["Vues sur le Jardin", "Cuisine Traditionnelle", "Programmes Culturels", "Excursions Shopping"],
        de: ["Gartenblick", "Traditionelle Küche", "Kulturprogramme", "Einkaufstouren"],
        zh: ["花园景观", "传统美食", "文化节目", "购物游览"],
        ur: ["باغ کے نظارے", "روایتی کھانا", "ثقافتی پروگرام", "خریداری کے دورے"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Family Suites"],
        es: ["Habitaciones Estándar", "Suites Familiares"],
        fr: ["Chambres Standard", "Suites Familiales"],
        de: ["Standardzimmer", "Familiensuiten"],
        zh: ["标准客房", "家庭套房"],
        ur: ["معیاری کمرے", "خاندانی سوٹس"]
      },
      location: {
        en: "Muzaffarabad City",
        es: "Ciudad de Muzaffarabad",
        fr: "Ville de Muzaffarabad",
        de: "Stadt Muzaffarabad",
        zh: "穆扎法拉巴德市",
        ur: "مظفر آباد شہر"
      }
    }
  ]
},

// Murree
"murree": {
  name: {
    en: "Murree",
    es: "Murree",
    fr: "Murree",
    de: "Murree",
    zh: "穆里",
    ur: "مری"
  },
  hotels: [
    {
      id: 2,
      name: {
        en: "Murree Hills Hotel",
        es: "Hotel Colinas de Murree",
        fr: "Hôtel des Collines de Murree",
        de: "Murree Hills Hotel",
        zh: "穆里山酒店",
        ur: "مری ہلز ہوٹل"
      },
      category: "Standard",
      rating: 4,
      image: "/476798774 (1).jpg",
      description: {
        en: "Classic hill station hotel with comfortable rooms and easy access to Mall Road.",
        es: "Hotel clásico de estación de montaña con habitaciones cómodas y fácil acceso a Mall Road.",
        fr: "Hôtel classique de station de montagne avec chambres confortables et accès facile à Mall Road.",
        de: "Klassisches Bergstationshotel mit komfortablen Zimmern und einfachem Zugang zur Mall Road.",
        zh: "经典的山站酒店，拥有舒适的客房，方便前往购物街。",
        ur: "کلاسک پہاڑی اسٹیشن ہوٹل جس میں آرام دہ کمرے اور مال روڈ تک آسان رسائی ہے۔"
      },
      amenities: {
        en: ["Mall Road Access", "Restaurant", "Parking", "City Tours"],
        es: ["Acceso a Mall Road", "Restaurante", "Estacionamiento", "Tours de la Ciudad"],
        fr: ["Accès à Mall Road", "Restaurant", "Parking", "Excursions en Ville"],
        de: ["Mall Road Zugang", "Restaurant", "Parkplatz", "Stadttouren"],
        zh: ["购物街通道", "餐厅", "停车场", "城市游览"],
        ur: ["مال روڈ تک رسائی", "ریستوران", "پارکنگ", "شہری دورے"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Hill View Rooms"],
        es: ["Habitaciones Estándar", "Habitaciones con Vista a la Colina"],
        fr: ["Chambres Standard", "Chambres Vue Colline"],
        de: ["Standardzimmer", "Zimmer mit Hügelblick"],
        zh: ["标准客房", "山景房"],
        ur: ["معیاری کمرے", "پہاڑی منظر کے کمرے"]
      },
      location: {
        en: "Mall Road, Murree",
        es: "Mall Road, Murree",
        fr: "Mall Road, Murree",
        de: "Mall Road, Murree",
        zh: "购物街，穆里",
        ur: "مال روڈ، مری"
      }
    }
  ]
},

// Swat Valley
"swat": {
  name: {
    en: "Swat Valley",
    es: "Valle de Swat",
    fr: "Vallée de Swat",
    de: "Swat-Tal",
    zh: "斯瓦特山谷",
    ur: "وادی سوات"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Swat Continental Hotel",
        es: "Hotel Continental Swat",
        fr: "Hôtel Continental Swat",
        de: "Swat Continental Hotel",
        zh: "斯瓦特大陆酒店",
        ur: "سوات کانٹی نینٹل ہوٹل"
      },
      category: "Standard",
      rating: 4,
      image: "/318183745.jpg",
      description: {
        en: "Comfortable hotel in Mingora with easy access to Swat's historical and natural attractions.",
        es: "Hotel cómodo en Mingora con fácil acceso a las atracciones históricas y naturales de Swat.",
        fr: "Hôtel confortable à Mingora avec un accès facile aux attractions historiques et naturelles de Swat.",
        de: "Komfortables Hotel in Mingora mit einfachem Zugang zu Swats historischen und natürlichen Attraktionen.",
        zh: "位于明戈拉的舒适酒店，方便前往斯瓦特的历史和自然景点。",
        ur: "منگورہ میں آرام دہ ہوٹل جہاں سوات کے تاریخی اور قدرتی مقامات تک آسان رسائی ہے۔"
      },
      amenities: {
        en: ["City Views", "Restaurant", "Tour Services", "Cultural Sites Access"],
        es: ["Vistas de la Ciudad", "Restaurante", "Servicios de Tours", "Acceso a Sitios Culturales"],
        fr: ["Vues sur la Ville", "Restaurant", "Services d'Excursions", "Accès aux Sites Culturels"],
        de: ["Stadtblick", "Restaurant", "Tourenservice", "Zugang zu Kulturstätten"],
        zh: ["城市景观", "餐厅", "旅游服务", "文化遗址通道"],
        ur: ["شہر کے نظارے", "ریستوران", "ٹور سروسز", "ثقافتی مقامات تک رسائی"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Executive Rooms"],
        es: ["Habitaciones Estándar", "Habitaciones Ejecutivas"],
        fr: ["Chambres Standard", "Chambres Exécutives"],
        de: ["Standardzimmer", "Executive-Zimmer"],
        zh: ["标准客房", "行政客房"],
        ur: ["معیاری کمرے", "ایگزیکٹو کمرے"]
      },
      location: {
        en: "Mingora, Swat",
        es: "Mingora, Swat",
        fr: "Mingora, Swat",
        de: "Mingora, Swat",
        zh: "明戈拉，斯瓦特",
        ur: "منگورہ، سوات"
      }
    }
  ]
},

// Neelum Valley
"neelum": {
  name: {
    en: "Neelum Valley",
    es: "Valle de Neelum",
    fr: "Vallée de Neelum",
    de: "Neelum-Tal",
    zh: "尼勒姆山谷",
    ur: "وادی نیلم"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Neelum View Hotel",
        es: "Hotel Vista Neelum",
        fr: "Hôtel Vue Neelum",
        de: "Neelum Aussichtshotel",
        zh: "尼勒姆景观酒店",
        ur: "نیلم ویو ہوٹل"
      },
      category: "Standard",
      rating: 4,
      image: "/895d19f7 (1).avif",
      description: {
        en: "Riverside hotel offering beautiful views of the Neelum River and surrounding mountains.",
        es: "Hotel junto al río que ofrece hermosas vistas del río Neelum y las montañas circundantes.",
        fr: "Hôtel au bord de la rivière offrant une belle vue sur la rivière Neelum et les montagnes environnantes.",
        de: "Hotel am Fluss mit herrlichem Blick auf den Neelum-Fluss und die umliegenden Berge.",
        zh: "河畔酒店，可欣赏尼勒姆河和周围山脉的美丽景色。",
        ur: "دریا کے کنارے واقع ہوٹل جو دریائے نیلم اور اردگرد کے پہاڑوں کے خوبصورت نظارے پیش کرتا ہے۔"
      },
      amenities: {
        en: ["River Views", "Local Cuisine", "Fishing", "Valley Tours"],
        es: ["Vistas al río", "Cocina local", "Pesca", "Excursiones al valle"],
        fr: ["Vues sur la rivière", "Cuisine locale", "Pêche", "Visites de la vallée"],
        de: ["Flussblick", "Lokale Küche", "Angeln", "Taltouren"],
        zh: ["河景", "当地美食", "钓鱼", "山谷游览"],
        ur: ["دریا کے نظارے", "مقامی کھانا", "ماہی گیری", "وادی کے دورے"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["River View Rooms", "Family Rooms"],
        es: ["Habitaciones con vista al río", "Habitaciones familiares"],
        fr: ["Chambres avec vue sur la rivière", "Chambres familiales"],
        de: ["Zimmer mit Flussblick", "Familienzimmer"],
        zh: ["河景房", "家庭房"],
        ur: ["دریا کے منظر والے کمرے", "خاندانی کمرے"]
      },
      location: {
        en: "Keran, Neelum Valley",
        es: "Keran, Valle de Neelum",
        fr: "Keran, Vallée de Neelum",
        de: "Keran, Neelum-Tal",
        zh: "尼勒姆山谷，克兰",
        ur: "کیران، وادی نیلم"
      }
    }
  ]
},

// Kumrat Valley
"kumrat": {
  name: {
    en: "Kumrat Valley",
    es: "Valle de Kumrat",
    fr: "Vallée de Kumrat",
    de: "Kumrat-Tal",
    zh: "库姆拉特山谷",
    ur: "وادی کمراٹ"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Kumrat Valley Rest House",
        es: "Casa de Huéspedes Valle de Kumrat",
        fr: "Maison d'Hôtes Vallée de Kumrat",
        de: "Gästehaus Kumrat-Tal",
        zh: "库姆拉特山谷宾馆",
        ur: "کمراٹ ویلی ریسٹ ہاؤس"
      },
      category: "Standard",
      rating: 3,
      image: "/9e7b17d7.avif",
      description: {
        en: "Simple accommodation in pristine valley settings with basic modern amenities.",
        es: "Alojamiento sencillo en un valle virgen con comodidades modernas básicas.",
        fr: "Hébergement simple dans un cadre de vallée préservée avec des commodités modernes de base.",
        de: "Einfache Unterkunft in unberührter Tallandschaft mit grundlegenden modernen Annehmlichkeiten.",
        zh: "位于原始山谷中的简易住宿，提供基本的现代设施。",
        ur: "قدیم وادی کے ماحول میں جدید بنیادی سہولات کے ساتھ سادہ رہائش۔"
      },
      amenities: {
        en: ["Valley Views", "Basic Facilities", "Local Food", "Nature Walks"],
        es: ["Vistas al valle", "Instalaciones básicas", "Comida local", "Paseos por la naturaleza"],
        fr: ["Vues sur la vallée", "Équipements de base", "Nourriture locale", "Promenades dans la nature"],
        de: ["Talblick", "Grundausstattung", "Lokale Küche", "Naturwanderungen"],
        zh: ["山谷景观", "基本设施", "当地美食", "自然漫步"],
        ur: ["وادی کے نظارے", "بنیادی سہولات", "مقامی کھانا", "قدرتی سیر"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Shared Rooms"],
        es: ["Habitaciones estándar", "Habitaciones compartidas"],
        fr: ["Chambres standard", "Chambres partagées"],
        de: ["Standardzimmer", "Gemeinschaftszimmer"],
        zh: ["标准客房", "共享客房"],
        ur: ["معیاری کمرے", "مشترکہ کمرے"]
      },
      location: {
        en: "Kumrat Valley",
        es: "Valle de Kumrat",
        fr: "Vallée de Kumrat",
        de: "Kumrat-Tal",
        zh: "库姆拉特山谷",
        ur: "وادی کمراٹ"
      }
    }
  ]
},

// Chitral
"chitral": {
  name: {
    en: "Chitral",
    es: "Chitral",
    fr: "Chitral",
    de: "Chitral",
    zh: "奇特拉尔",
    ur: "چترال"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Tirch Mir View Hotel",
        es: "Hotel Vista Tirch Mir",
        fr: "Hôtel Vue Tirch Mir",
        de: "Tirch Mir Aussichtshotel",
        zh: "蒂里奇米尔景观酒店",
        ur: "تیرچ میر ویو ہوٹل"
      },
      category: "Standard",
      rating: 4,
      image: "/tirch-mir-view-hotel-chitral-img3-12.jpg",
      description: {
        en: "Traditional hotel in Chitral town with views of the historic Chitral Fort.",
        es: "Hotel tradicional en la ciudad de Chitral con vistas del histórico Fuerte de Chitral.",
        fr: "Hôtel traditionnel dans la ville de Chitral avec vue sur le fort historique de Chitral.",
        de: "Traditionelles Hotel in der Stadt Chitral mit Blick auf die historische Chitral-Festung.",
        zh: "位于奇特拉尔镇的传统酒店，可欣赏历史悠久的奇特拉尔堡。",
        ur: "چترال شہر میں روایتی ہوٹل جو تاریخی چترال قلعے کے نظارے پیش کرتا ہے۔"
      },
      amenities: {
        en: ["Fort Views", "Traditional Architecture", "Local Cuisine", "Cultural Tours"],
        es: ["Vistas del Fuerte", "Arquitectura Tradicional", "Cocina Local", "Tours Culturales"],
        fr: ["Vues sur le Fort", "Architecture Traditionnelle", "Cuisine Locale", "Visites Culturelles"],
        de: ["Festungsblick", "Traditionelle Architektur", "Lokale Küche", "Kulturtouren"],
        zh: ["城堡景观", "传统建筑", "当地美食", "文化游览"],
        ur: ["قلعے کے نظارے", "روایتی فن تعمیر", "مقامی کھانا", "ثقافتی دورے"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Traditional Suites"],
        es: ["Habitaciones Estándar", "Suites Tradicionales"],
        fr: ["Chambres Standard", "Suites Traditionnelles"],
        de: ["Standardzimmer", "Traditionelle Suiten"],
        zh: ["标准客房", "传统套房"],
        ur: ["معیاری کمرے", "روایتی سوٹس"]
      },
      location: {
        en: "Chitral Town",
        es: "Ciudad de Chitral",
        fr: "Ville de Chitral",
        de: "Stadt Chitral",
        zh: "奇特拉尔镇",
        ur: "چترال شہر"
      }
    },
    {
      id: 2,
      name: {
        en: "Kalash Valley Resort",
        es: "Resort Valle de Kalash",
        fr: "Resort de la Vallée de Kalash",
        de: "Kalash-Tal Resort",
        zh: "卡拉什山谷度假村",
        ur: "کالاش ویلی ریزورٹ"
      },
      category: "Premium",
      rating: 4,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      description: {
        en: "Unique resort experience in the heart of Kalash Valley with cultural immersion opportunities.",
        es: "Experiencia única de resort en el corazón del Valle de Kalash con oportunidades de inmersión cultural.",
        fr: "Expérience de resort unique au cœur de la vallée de Kalash avec des opportunités d'immersion culturelle.",
        de: "Einzigartige Resort-Erfahrung im Herzen des Kalash-Tals mit kulturellen Immersionsmöglichkeiten.",
        zh: "位于卡拉什山谷中心的独特度假村体验，提供文化沉浸机会。",
        ur: "کالاش وادی کے دل میں منفرد ریزورٹ تجربہ جو ثقافتی آمیزش کے مواقع فراہم کرتا ہے۔"
      },
      amenities: {
        en: ["Cultural Experience", "Valley Views", "Traditional Festivals", "Local Crafts"],
        es: ["Experiencia Cultural", "Vistas del Valle", "Festivales Tradicionales", "Artesanías Locales"],
        fr: ["Expérience Culturelle", "Vues sur la Vallée", "Festivals Traditionnels", "Artisanat Local"],
        de: ["Kulturelle Erfahrung", "Talblick", "Traditionelle Festivals", "Lokales Handwerk"],
        zh: ["文化体验", "山谷景观", "传统节日", "当地工艺"],
        ur: ["ثقافتی تجربہ", "وادی کے نظارے", "روایتی تہوار", "مقامی دستکاری"]
      },
      priceAdjustment: 12000,
      roomTypes: {
        en: ["Cultural Rooms", "Valley Suites"],
        es: ["Habitaciones Culturales", "Suites del Valle"],
        fr: ["Chambres Culturelles", "Suites de la Vallée"],
        de: ["Kulturzimmer", "Tal-Suiten"],
        zh: ["文化客房", "山谷套房"],
        ur: ["ثقافتی کمرے", "وادی سوٹس"]
      },
      location: {
        en: "Kalash Valley",
        es: "Valle de Kalash",
        fr: "Vallée de Kalash",
        de: "Kalash-Tal",
        zh: "卡拉什山谷",
        ur: "کالاش وادی"
      }
    }
  ]
},

// Astore Valley
"astore": {
  name: {
    en: "Astore Valley",
    es: "Valle de Astore",
    fr: "Vallée d'Astore",
    de: "Astore-Tal",
    zh: "阿斯托尔山谷",
    ur: "وادی آسٹور"
  },
  hotels: [
    {
      id: 1,
      name: {
        en: "Astore Valley Hotel",
        es: "Hotel Valle de Astore",
        fr: "Hôtel Vallée d'Astore",
        de: "Hotel Astore-Tal",
        zh: "阿斯托尔山谷酒店",
        ur: "آسٹور ویلی ہوٹل"
      },
      category: "Standard",
      rating: 3,
      image: "/ptdc-rama-lake-motel-2.jpg",
      description: {
        en: "Simple yet comfortable accommodation in the beautiful Astore Valley.",
        es: "Alojamiento simple pero cómodo en el hermoso Valle de Astore.",
        fr: "Hébergement simple mais confortable dans la belle vallée d'Astore.",
        de: "Einfache, aber komfortable Unterkunft im schönen Astore-Tal.",
        zh: "在美丽的阿斯托尔山谷中提供简洁舒适的住宿。",
        ur: "خوبصورت وادی آسٹور میں سادہ لیکن آرام دہ رہائش۔"
      },
      amenities: {
        en: ["Mountain Views", "Basic Amenities", "Local Guide", "Trekking Base"],
        es: ["Vistas a la montaña", "Servicios básicos", "Guía local", "Base de senderismo"],
        fr: ["Vues sur la montagne", "Commodités de base", "Guide local", "Base de randonnée"],
        de: ["Bergblick", "Grundausstattung", "Lokaler Führer", "Trekking-Basis"],
        zh: ["山景", "基本设施", "当地导游", "徒步起点"],
        ur: ["پہاڑی نظارے", "بنیادی سہولات", "مقامی گائیڈ", "ٹریکنگ بیس"]
      },
      priceAdjustment: 0,
      roomTypes: {
        en: ["Standard Rooms", "Basic Suites"],
        es: ["Habitaciones estándar", "Suites básicas"],
        fr: ["Chambres standards", "Suites simples"],
        de: ["Standardzimmer", "Einfache Suiten"],
        zh: ["标准客房", "基础套房"],
        ur: ["معیاری کمرے", "بنیادی سوٹس"]
      },
      location: {
        en: "Astore Town",
        es: "Ciudad de Astore",
        fr: "Ville d'Astore",
        de: "Stadt Astore",
        zh: "阿斯托尔镇",
        ur: "آسٹور شہر"
      }
    },
    {
      id: 2,
      name: {
        en: "Rama Lake Lodge",
        es: "Lodge Lago Rama",
        fr: "Auberge du lac Rama",
        de: "Rama-See-Lodge",
        zh: "拉玛湖旅馆",
        ur: "راما لیک لاج"
      },
      category: "Premium",
      rating: 4,
      image: "/ptdc-motel-rama-lake.jpg",
      description: {
        en: "Scenic lodge near the beautiful Rama Lake with stunning alpine views.",
        es: "Albergue pintoresco cerca del hermoso lago Rama con impresionantes vistas alpinas.",
        fr: "Auberge pittoresque près du magnifique lac Rama avec des vues alpines à couper le souffle.",
        de: "Malerische Lodge in der Nähe des schönen Rama-Sees mit atemberaubendem Alpenblick.",
        zh: "靠近美丽的拉玛湖的风景旅馆，拥有迷人的高山景观。",
        ur: "خوبصورت راما جھیل کے قریب دلکش لاج جو شاندار پہاڑی نظارے پیش کرتا ہے۔"
      },
      amenities: {
        en: ["Lake Views", "Alpine Setting", "Photography", "Nature Walks"],
        es: ["Vistas al lago", "Entorno alpino", "Fotografía", "Paseos por la naturaleza"],
        fr: ["Vues sur le lac", "Cadre alpin", "Photographie", "Promenades en nature"],
        de: ["Seeblick", "Alpines Ambiente", "Fotografie", "Naturwanderungen"],
        zh: ["湖景", "高山环境", "摄影", "自然漫步"],
        ur: ["جھیل کے نظارے", "پہاڑی ماحول", "فوٹوگرافی", "قدرتی سیر"]
      },
      priceAdjustment: 8000,
      roomTypes: {
        en: ["Lake View Rooms", "Alpine Cottages"],
        es: ["Habitaciones con vista al lago", "Cabañas alpinas"],
        fr: ["Chambres avec vue sur le lac", "Chalets alpins"],
        de: ["Zimmer mit Seeblick", "Alpine Hütten"],
        zh: ["湖景房", "高山小屋"],
        ur: ["جھیل کے منظر والے کمرے", "پہاڑی کاٹیجز"]
      },
      location: {
        en: "Near Rama Lake",
        es: "Cerca del lago Rama",
        fr: "Près du lac Rama",
        de: "In der Nähe des Rama-Sees",
        zh: "靠近拉玛湖",
        ur: "راما جھیل کے قریب"
      }
    }
  ]
},
}

// Service functions
const hotelService = {
  // Get hotels by destination name (handles both string and object names)
  getHotelsByDestination: (destinationName) => {
    const key = getDestinationKey(destinationName);
    return hotelData[key] || null;
  },

  // Get all hotels
  getAllHotels: () => {
    return hotelData;
  },

  // Get hotel by destination and hotel ID
  getHotelById: (destinationName, hotelId) => {
    const destinationHotels = hotelService.getHotelsByDestination(destinationName);
    if (!destinationHotels) return null;
    
    return destinationHotels.hotels.find(hotel => hotel.id === hotelId);
  },

  // Get hotels by category
  getHotelsByCategory: (destinationName, category) => {
    const destinationHotels = hotelService.getHotelsByDestination(destinationName);
    if (!destinationHotels) return [];
    
    return destinationHotels.hotels.filter(hotel => 
      hotel.category.toLowerCase() === category.toLowerCase()
    );
  }
};

// Helper function to convert destination names to keys (handles both string and object names)
function getDestinationKey(destinationName) {
  // Handle null/undefined
  if (!destinationName) return null;
  
  let nameToMatch = '';
  
  // If it's an object (multilingual name), extract the English name or first available value
  if (typeof destinationName === 'object') {
    nameToMatch = destinationName.en || 
                  destinationName.fr || 
                  destinationName.es || 
                  destinationName.de || 
                  destinationName.zh || 
                  Object.values(destinationName)[0] || '';
  } else if (typeof destinationName === 'string') {
    nameToMatch = destinationName;
  } else {
    return null;
  }
  
  // Convert to lowercase for matching
  const lowerName = nameToMatch.toLowerCase();
  
  const keyMap = {
    'deosai national park': 'deosai',
    'deosai': 'deosai',
    'skardu': 'skardu',
    'naran kaghan': 'naran',
    'naran': 'naran',
    'kaghan': 'naran',
    'hunza valley': 'hunza',
    'hunza': 'hunza',
    'shogran': 'shogran',
    'fairy meadows': 'fairy_meadows',
    'fairy': 'fairy_meadows',
    'kashmir': 'kashmir',
    'murree': 'murree',
    'swat valley': 'swat',
    'swat': 'swat',
    'neelum valley': 'neelum',
    'neelum': 'neelum',
    'kumrat valley': 'kumrat',
    'kumrat': 'kumrat',
    'chitral': 'chitral',
    'astore valley': 'astore',
    'astore': 'astore',
    'yasin valley': 'yasin',
    'yasin': 'yasin'
  };
  
  return keyMap[lowerName] || null;
}

export default hotelService;