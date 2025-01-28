import Restaurant from "../models/restaurant.mjs";

const createRestaurant = async (req, res) => {
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
};

export { createRestaurant };
