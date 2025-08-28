
require('dotenv').config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); 
const express = require('express')
const connectDB = require('./db.js')
const cors = require('cors');



const app = express()
app.use(express.json());
app.use(cors());



// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });



const userRoutes = require("./routes/userRoutes");

const passwordResetRoutes = require('./routes/passwordResetRoutes');

const destinationRoutes = require("./routes/destinationRoutes");


const bookingRoutes = require('./routes/bookingRoutes');

const paymentRoutes = require("./routes/paymentRoutes");


const adminRoutes = require('./routes/adminRoutes');



const wishlistRoutes = require('./routes/WishlistRoutes');

const contactRoutes = require('./routes/contactRoutes');

const reviewRoutes = require('./routes/reviewRoutes');

const customTourRoutes = require('./routes/customTourRoutes');


const knowledgeBaseRoutes = require('./routes/knowledgeBaseRoutes');

const chatbotRoutes = require('./routes/chatbotRoutes');






  // Then use the routes
app.use("/api/users", userRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use("/api/destinations", destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wishlist', wishlistRoutes); 
app.use('/api/custom-tours', customTourRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/chatbot', chatbotRoutes);


const authAdmin = require('./middleware/authAdmin');
app.get('/api/admin/dashboard', authAdmin, (req, res) => {
    res.json({ message: 'Admin dashboard data' });
});

connectDB()

app.listen(3000, () => {
    console.log("app is running")
})