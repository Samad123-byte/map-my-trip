const mongoose = require("mongoose");
const Destination = require("./models/Destination");

// ✅ Use the same MongoDB Atlas connection as in `db.js`
const MONGO_URI = "mongodb+srv://sammad1249:Dlsw2zV7YjPS9H2K@cluster0.nx0xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Destination Data
const destinations = [
  {
    name: {
      en: "Hunza Valley",
      fr: "Vallée de Hunza",
      es: "Valle de Hunza",
      de: "Hunza-Tal",
      zh: "洪扎谷"
    },
    location: "Gilgit-Baltistan",
    description: {
      en: "A beautiful valley surrounded by mountains and lakes.",
      fr: "Une belle vallée entourée de montagnes et de lacs.",
      es: "Un hermoso valle rodeado de montañas y lagos.",
      de: "Ein wunderschönes Tal, umgeben von Bergen und Seen.",
      zh: "一个被群山和湖泊环绕的美丽山谷。"
    },
    price: { "3days": 25000, "5days": 40000, "7days": 50000 }, // ✅ Fixed format
    image: "/hunza.jpg",
    highlights: ["Mountain Views", "Altit Fort", "Attabad Lake", "Passu Cones"]
  },
  {
    name: {
      en: "Skardu",
      fr: "Skardu",
      es: "Skardu",
      de: "Skardu",
      zh: "斯卡都"
    },
    location: "Gilgit-Baltistan",
    description: {
      en: "A paradise for mountain lovers and trekkers.",
      fr: "Un paradis pour les amateurs de montagne et les randonneurs.",
      es: "Un paraíso para los amantes de la montaña y los excursionistas.",
      de: "Ein Paradies für Bergliebhaber und Wanderer.",
      zh: "登山爱好者和徒步旅行者的天堂。"
    },
    price: { "3days": 30000, "5days": 45000, "7days": 60000 },
    image: "/skardu.jpg",
    highlights: ["Shangrila Resort Lower Kachura Lake","Upper Kachura Lake","Shigar Fort"]
  },
  {
    name: {
      en: "Swat Valley",
      fr: "Vallée de Swat",
      es: "Valle de Swat",
      de: "Swat-Tal",
      zh: "斯瓦特山谷"
    },
    location: "Khyber Pakhtunkhwa",
    description: {
      en: "Known as the 'Switzerland of Pakistan'.",
      fr: "Connue comme la 'Suisse du Pakistan'.",
      es: "Conocida como la 'Suiza de Pakistán'.",
      de: "Bekannt als die 'Schweiz Pakistans'.",
      zh: "被称为巴基斯坦的瑞士。"
    },
    price: { "3days": 27000, "5days": 42000, "7days": 55000 },
    image: "/swat.jpg",
    highlights: ["Malam Jabba", "Fizagat Park", "Kalam Valley"]
  },
  {
    name: {
      en: "Naran Kaghan",
      fr: "Naran Kaghan",
      es: "Naran Kaghan",
      de: "Naran Kaghan",
      zh: "纳兰卡汗"
    },
    location: "Khyber Pakhtunkhwa",
    description: {
      en: "A picturesque valley with stunning lakes.",
      fr: "Une vallée pittoresque avec des lacs magnifiques.",
      es: "Un valle pintoresco con impresionantes lagos.",
      de: "Ein malerisches Tal mit atemberaubenden Seen.",
      zh: "一个风景如画的山谷，有令人惊叹的湖泊。"
    },
    price: { "3days": 22000, "5days": 35000, "7days": 48000 },
    image: "/naran.jpg",
    highlights: ["Saif-ul-Muluk Lake", "Lulusar Lake", "Jalkhad"]
  },
  {
    name: {
      en: "Kashmir",
      fr: "Cachemire",
      es: "Cachemira",
      de: "Kaschmir",
      zh: "克什米尔"
    },
    location: "Azad Kashmir",
    description: {
      en: "A paradise with breathtaking meadows and lakes.",
      fr: "Un paradis avec des prairies et des lacs à couper le souffle.",
      es: "Un paraíso con impresionantes prados y lagos.",
      de: "Ein Paradies mit atemberaubenden Wiesen und Seen.",
      zh: "拥有令人叹为观止的草地和湖泊的天堂。"
    },
    price: { "3days": 28000, "5days": 40000, "7days": 52000 },
    image: "/kashmir.jpg",
    highlights: ["Arang Kel","Ratti Gali Lake","Banjosa Lake"]
  },
  {
    name: {
      en: "Murree",
      fr: "Murree",
      es: "Murree",
      de: "Murree",
      zh: "穆里"
    },
    location: "Punjab",
    description: {
      en: "The most famous hill station in Pakistan.",
      fr: "La station de montagne la plus célèbre du Pakistan.",
      es: "La estación de montaña más famosa de Pakistán.",
      de: "Die bekannteste Bergstation in Pakistan.",
      zh: "巴基斯坦最著名的山地度假胜地。"
    },
    price: { "3days": 20000, "5days": 35000, "7days": 45000 },
    image: "/murree.jpg",
    highlights: ["Mall Road","Patriata","Pindi Point"]
  },
  {
    name: {
      en: "Fairy Meadows",
      fr: "Prairies des Fées",
      es: "Prados de Hadas",
      de: "Feenwiesen",
      zh: "仙女草甸"
    },
    location: "Gilgit-Baltistan",
    description: {
      en: "A lush green plateau with views of Nanga Parbat.",
      fr: "Un plateau verdoyant avec vue sur le Nanga Parbat.",
      es: "Una meseta verde exuberante con vistas al Nanga Parbat.",
      de: "Eine üppig grüne Hochebene mit Blick auf den Nanga Parbat.",
      zh: "一个郁郁葱葱的绿色高原，可以欣赏南迦帕尔巴特山的景色。"
    },
    price: { "3days": 30000, "5days": 50000, "7days": 70000 },
    image: "/fairy.jpg",
    highlights: ["Nanga Parbat Viewpoint","Beyal Camp","Raikot Bridge & Jeep Track"]
  },
  {
    name: {
      en: "Neelum Valley",
      fr: "Vallée de Neelum",
      es: "Valle de Neelum",
      de: "Neelum-Tal",
      zh: "尼勒姆山谷"
    },
    location: "Azad Kashmir",
    description: {
      en: "A stunning valley with waterfalls and lakes.",
      fr: "Une vallée magnifique avec des cascades et des lacs.",
      es: "Un impresionante valle con cascadas y lagos.",
      de: "Ein atemberaubendes Tal mit Wasserfällen und Seen.",
      zh: "一个令人惊叹的山谷，有瀑布和湖泊。"
    },
    price: { "3days": 25000, "5days": 35000, "7days": 48000 },
    image: "/neelam.jpg",
    highlights: ["Keran","Kel","Chitta Katha Lake","Dhani Waterfall"]
  },
  {
    name: {
      en: "Shogran",
      fr: "Shogran",
      es: "Shogran",
      de: "Shogran",
      zh: "肖格兰"
    },
    location: "Khyber Pakhtunkhwa",
    description: {
      en: "A scenic plateau offering views of Makra Peak and home to the beautiful Siri Paye meadows.",
      fr: "Un plateau pittoresque offrant des vues sur le pic Makra et abritant les belles prairies de Siri Paye.",
      es: "Una meseta escénica que ofrece vistas del Pico Makra y alberga las hermosas praderas de Siri Paye.",
      de: "Ein malerisches Plateau mit Blick auf den Makra Peak und Heimat der wunderschönen Siri Paye Wiesen.",
      zh: "一个风景优美的高原，可以欣赏马克拉峰的景色，是美丽的西里帕耶草甸的所在地。"
    },
    price: { "3days": 25000, "5days": 40000, "7days": 55000 }, // ✅ Object format
    image: "/shogran.jpg",
    highlights: ["Siri Paye", "Makra Peak", "Payee Meadows", "Scenic Pine Forests"]
  },
  {
    name: {
      en: "Deosai National Park",
      fr: "Parc National de Deosai",
      es: "Parque Nacional Deosai",
      de: "Deosai Nationalpark",
      zh: "德奥赛国家公园"
    },
    location: "Gilgit-Baltistan",
    description: {
      en: "The second-highest plateau in the world, known as the 'Land of Giants' with unique flora and fauna.",
      fr: "Le deuxième plus haut plateau du monde, connu comme la 'Terre des Géants' avec une flore et une faune uniques.",
      es: "La segunda meseta más alta del mundo, conocida como la 'Tierra de Gigantes' con flora y fauna únicas.",
      de: "Das zweithöchste Plateau der Welt, bekannt als das 'Land der Riesen' mit einzigartiger Flora und Fauna.",
      zh: "世界第二高的高原，被称为 巨人之地 拥有独特的动植物。"
    },
    price: { "3days": 35000, "5days": 50000, "7days": 65000 }, // ✅ Object format
    image: "/deosai.jpg",
    highlights: ["Sheosar Lake", "Brown Bears", "Alpine Flowers", "Bara Pani"]
  }
];

// ✅ Insert Data into MongoDB
const seedDestinations = async () => {
  try {
    await Destination.deleteMany(); // Clear existing data
    await Destination.insertMany(destinations);
    console.log("🎉 Destinations added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error adding destinations:", error);
  }
};

// Run the seeding function
seedDestinations();
