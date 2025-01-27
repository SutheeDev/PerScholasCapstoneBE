import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  cusine: {
    type: String,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
  },
  priceRange: {
    type: String,
    enum: [$, $$, $$$, $$$$],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Restaurant", restaurantSchema);
