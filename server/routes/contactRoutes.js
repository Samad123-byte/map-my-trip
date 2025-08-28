const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const authAdmin = require('../middleware/authAdmin');

// Submit a contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'unread',
      createdAt: new Date()
    });
    
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
// Get all contact submissions (admin only)
router.get('/', authAdmin, async (req, res) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build query
    let query = {};
    if (status) query.status = status;
    
    // Create sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = order === 'desc' ? -1 : 1;
    
    const contacts = await Contact.find(query)
      .sort(sortConfig);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Error fetching contact submissions' });
  }
});

// Mark contact as read/unread
router.put('/:contactId/status', authAdmin, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a contact submission
router.delete('/:contactId', authAdmin, async (req, res) => {
  try {
    const { contactId } = req.params;
    
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get contact statistics
router.get('/stats', authAdmin, async (req, res) => {
  try {
    // Get total contacts
    const totalContacts = await Contact.countDocuments();
    
    // Get unread contacts count
    const unreadCount = await Contact.countDocuments({ status: 'unread' });
    
    // Get contact trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrend = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Format monthly trend
    const formattedTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }));
    
    res.json({
      totalContacts,
      unreadCount,
      monthlyTrend: formattedTrend
    });
  } catch (error) {
    console.error('Error getting contact statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;