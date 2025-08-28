const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Create a new destination
router.post("/", async (req, res) => {
  try {
    const { name, location, description, price, image } = req.body;
    const newDestination = new Destination({ name, location, description, price, image });
    await newDestination.save();
    res.status(201).json({ message: "Destination added successfully", newDestination });
  } catch (error) {
    res.status(500).json({ error: "Error adding destination" });
  }
});

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching destinations" });
  }
});

// Get a single destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: "Destination not found" });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: "Error fetching destination" });
  }
});

// Update a destination
router.put("/:id", async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDestination) return res.status(404).json({ error: "Destination not found" });
    res.json({ message: "Destination updated", updatedDestination });
  } catch (error) {
    res.status(500).json({ error: "Error updating destination" });
  }
});

// Delete a destination
router.delete("/:id", async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ error: "Destination not found" });
    res.json({ message: "Destination deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting destination" });
  }
});

module.exports = router;
