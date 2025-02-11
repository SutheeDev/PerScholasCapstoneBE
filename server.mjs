import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.mjs";
import User from "./models/User.mjs";
import Restaurant from "./models/Restaurant.mjs";
import users from "./config/seedUser.mjs";
import restaurants from "./config/seedRestaurant.mjs";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

// Routes
import userRouter from "./routes/userRoutes.mjs";
import restaurantRouter from "./routes/restaurantRoutes.mjs";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/restaurants", restaurantRouter);

// Seed routes
app.get("/api/seed/users", async (req, res) => {
  try {
    await User.deleteMany({});
    await User.create(users);
    res.json(users);
  } catch (error) {
    console.log({ err: error.message });
  }
});
app.get("/api/seed/restaurants", async (req, res) => {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.create(restaurants);
    res.json(restaurants);
  } catch (error) {
    console.log({ err: error.message });
  }
});

// Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ msg: "Something went wrong" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
