const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./db.js');

// Connect to database
connectDB();

async function createAdminUser() {
  try {
    // Set admin email and password - customize these values
    const adminEmail = 'admin@yourdomain.com';
    const adminPassword = 'secureAdminPassword'; // Use a strong password
    const adminName = 'Admin User';

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (adminExists) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }
    
    // Create new admin user
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword, // Will be hashed by the pre-save hook
      isAdmin: true
    });
    
    // Save admin to database
    await adminUser.save();
    console.log('Admin user created successfully');
    
    // Disconnect from database
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.disconnect();
  }
}

createAdminUser();