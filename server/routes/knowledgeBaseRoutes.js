// routes/knowledgeBaseRoutes.js
const express = require('express');
const router = express.Router();
const KnowledgeBase = require('../models/KnowledgeBase');
const authAdmin = require('../middleware/authAdmin');

// Get all knowledge base articles (public)
router.get('/', async (req, res) => {
  try {
    const articles = await KnowledgeBase.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get knowledge base article by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const article = await KnowledgeBase.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search knowledge base (public)
router.get('/search/:query', async (req, res) => {
  try {
    const articles = await KnowledgeBase.find({
      $or: [
        { question: { $regex: req.params.query, $options: 'i' } },
        { answer: { $regex: req.params.query, $options: 'i' } },
        { tags: { $in: [new RegExp(req.params.query, 'i')] } }
      ]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes - protected by authAdmin middleware
// Create new knowledge base article
router.post('/', authAdmin, async (req, res) => {
  const article = new KnowledgeBase({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    tags: req.body.tags
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update knowledge base article
router.put('/:id', authAdmin, async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const updatedArticle = await KnowledgeBase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete knowledge base article
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await KnowledgeBase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;