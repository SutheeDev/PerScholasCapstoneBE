import express from "express";
import Restaurant from "../models/restaurant.mjs";
import User from "../models/User.mjs";

const router = express.Router();

// Create
// Create restaurant
router.post("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { name, visitDate, rating } = req.body;
    if (!name || !visitDate || !rating) {
      return res.status(400).json("Please fill in all required fields");
    }

    req.body.userId = userId;

    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

// Read
// Get user restaurants
router.get("/:userId", async (req, res) => {
  const restaurants = await Restaurant.find({ userId: req.params.userId });

  if (!restaurants || restaurants.length === 0) {
    return res.status(400).json("You don't have any restaurant yet");
  }

  res.status(200).json(restaurants);
});

// Update

// Delete

export default router;
