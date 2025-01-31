import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantsController.mjs";

const router = express.Router();

router.route("/:userId").post(createRestaurant);
router.route("/:userId").get(getRestaurants);
router.route("/:userId/:restaurantId").get(getSingleRestaurant);
router.route("/:userId/:restaurantId").patch(updateRestaurant);
router.route("/:userId/:restaurantId").delete(deleteRestaurant);

export default router;
