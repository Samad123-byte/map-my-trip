// App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer"; 
import Home from "./Components/Home";
import Destinations from "./Components/Destinations";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Register from "./Components/Register";
import DestinationDetail from "./Components/DestinationDetails";
import Booking from "./Components/Booking"
import MyBookings from "./Components/MyBookings";
import Payment from "./Components/Payment";
import ChatbotWidget from "./Components/ChatbotWidget"; 
import ProtectedRoute from "./Components/ProtectedRoute";
import Wishlist from "./Components/Wishlist";
import CustomTourRequestForm from "./Components/CustomTourRequestForm";
import Blog from "./Components/Blog";
import FAQ from "./Components/FAQ";

import AdminLayout from "./Components/admin/layout/AdminLayout";
import Dashboard from "./Components/admin/Dashboard";
import UsersList from "./Components/admin/UsersList";
import BookingsList from "./Components/admin/BookingsList";
import BookingDetails from "./Components/admin/BookingDetails";
import DestinationsList from "./Components/admin/DestinationsList";
import ReviewsList from "./Components/admin/ReviewsList";
import ReviewDetails from "./Components/admin/ReviewDetails";
import CustomToursList from "./Components/admin/CustomToursList";
import CustomTourDetails from "./Components/admin/CustomTourDetails";
import ContactManagement from "./Components/admin/contactManagement";
import ChatbotFeedbackManagement from "./Components/admin/ChatbotFeedbackManagement";

import './i18n';
import "./Components/darkMode.css";


export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Layout component for pages that should have footer (informational/marketing pages)
const PublicLayoutWithFooter = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
    <ChatbotWidget />
  </>
);

// Layout component for pages that shouldn't have footer (user actions/transactions)
const PublicLayoutWithoutFooter = ({ children }) => (
  <>
    <Header />
    {children}
    <ChatbotWidget />
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    // This will run once on initial render
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
    <Router>
      <Routes>
        {/* Pages WITH footer - informational/marketing pages */}
        <Route path="/" element={<PublicLayoutWithFooter><Home /></PublicLayoutWithFooter>} />
        <Route path="/destinations" element={<PublicLayoutWithFooter><Destinations /></PublicLayoutWithFooter>} />
        <Route path="/destinations/:id" element={<PublicLayoutWithFooter><DestinationDetail /></PublicLayoutWithFooter>} />
        <Route path="/about" element={<PublicLayoutWithFooter><About /></PublicLayoutWithFooter>} />
        <Route path="/contact" element={<PublicLayoutWithFooter><Contact /></PublicLayoutWithFooter>} />
        <Route path="/blog" element={<PublicLayoutWithFooter><Blog /></PublicLayoutWithFooter>} />
        <Route path="/faq" element={<PublicLayoutWithFooter><FAQ /></PublicLayoutWithFooter>} />

        {/* Pages WITHOUT footer - user actions/transactions/auth */}
        <Route path="/login" element={<PublicLayoutWithoutFooter><Login /></PublicLayoutWithoutFooter>} />
        <Route path="/forgot-password" element={<PublicLayoutWithoutFooter><ForgotPassword /></PublicLayoutWithoutFooter>} />
        <Route path="/reset-password/:token" element={<PublicLayoutWithoutFooter><ResetPassword /></PublicLayoutWithoutFooter>} />
        <Route path="/register" element={<PublicLayoutWithoutFooter><Register /></PublicLayoutWithoutFooter>} />
        
        <Route path="/booking/:id" element={
          <PublicLayoutWithoutFooter>
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          </PublicLayoutWithoutFooter>
        } />
        
        <Route path="/my-bookings" element={<PublicLayoutWithoutFooter><MyBookings /></PublicLayoutWithoutFooter>} />
        <Route path="/payment/:bookingId" element={<PublicLayoutWithoutFooter><Payment /></PublicLayoutWithoutFooter>} />

        <Route path="/wishlist" element={
          <PublicLayoutWithoutFooter>
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          </PublicLayoutWithoutFooter>
        } />

        <Route 
          path="/customize-tour/:id" 
          element={
            <PublicLayoutWithoutFooter>
              <ProtectedRoute>
               <CustomTourRequestForm />
              </ProtectedRoute>    
            </PublicLayoutWithoutFooter>
          } 
        />

        {/* Admin routes - no footer needed */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
          <Route path="destinations" element={<DestinationsList />} />
          <Route path="reviews" element={<ReviewsList />} />
          <Route path="reviews/:id" element={<ReviewDetails />} />
          <Route path="custom-tours" element={<CustomToursList />} />
          <Route path="custom-tours/:id" element={<CustomTourDetails />} />
          <Route path="contacts" element={<ContactManagement />} />
          <Route path="chatbot-feedback" element={<ChatbotFeedbackManagement />} />
        </Route>
      </Routes>
    </Router>
    </ThemeContext.Provider>
  );
}

export default App;