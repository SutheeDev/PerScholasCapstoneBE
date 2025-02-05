import Restaurant from "../models/Restaurant.mjs";

const createRestaurant = async (req, res) => {
  try {
    const userId = req.params.userId;

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

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      userId: req.params.userId,
    }).sort({ visitDate: -1 });

    console.log(restaurants);

    if (!restaurants || restaurants.length === 0) {
      return res.status(400).json("You don't have any restaurant yet");
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const getSingleRestaurant = async (req, res) => {
  try {
    const { userId, restaurantId } = req.params;
    const restaurant = await Restaurant.findOne({ _id: restaurantId, userId });

    if (!restaurant) {
      return res.status(404).json("Restaurant not found");
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { userId, restaurantId } = req.params;
    const { name, visitDate, rating } = req.body;

    if (!name || !visitDate || !rating) {
      return res.status(400).json("Please fill in all required fields");
    }

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      {
        _id: restaurantId,
        userId,
      },
      req.body,
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { userId, restaurantId } = req.params;

    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: restaurantId,
      userId,
    });

    res.status(200).json(deletedRestaurant);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export {
  createRestaurant,
  getRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
