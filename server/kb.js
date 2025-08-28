
require('dotenv').config();
const connectDB = require('./db');
const KnowledgeBase = require('./models/KnowledgeBase');
const knowledgeBaseEntries = require('./knowledgeBaseEntries');

async function importKnowledgeBase() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Check if entries already exist
    const count = await KnowledgeBase.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing entries. Skipping import.`);
      console.log('If you want to reimport, please clear the collection first.');
      process.exit(0);
    }
    
    // Import the entries
    const result = await KnowledgeBase.insertMany(knowledgeBaseEntries);
    console.log(`Successfully imported ${result.length} knowledge base entries.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing knowledge base:', error);
    process.exit(1);
  }
}

importKnowledgeBase();