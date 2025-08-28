// Save this as a separate file and run it to reset passwords for existing users
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://sammad1249:Dlsw2zV7YjPS9H2K@cluster0.nx0xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to reset a specific user's password
async function resetUserPassword(email, newPassword) {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      return false;
    }
    
    // Set the new password - this will trigger the pre-save hook
    // which will properly hash the password
    user.password = newPassword;
    await user.save();
    
    console.log(`Password reset successfully for ${email}`);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}

// Function to reset all users' passwords to a default value
async function resetAllPasswords(defaultPassword) {
  try {
    const users = await User.find({});
    
    console.log(`Found ${users.length} users`);
    
    for (const user of users) {
      user.password = defaultPassword;
      await user.save();
      console.log(`Reset password for ${user.email}`);
    }
    
    console.log('All passwords have been reset');
  } catch (error) {
    console.error('Error resetting passwords:', error);
  }
}

// Example usage:
// Reset a specific user's password
// resetUserPassword('emanchaudhary07@gmail.com', 'newpassword123')
//   .then(() => mongoose.disconnect());

// Or reset all users' passwords (use with caution)
// resetAllPasswords('defaultpassword123')
//   .then(() => mongoose.disconnect());

// Choose which function to run and uncomment it
// For now, just show available options
console.log('Password reset script loaded. Uncomment the function you want to use.');
setTimeout(() => mongoose.disconnect(), 3000);