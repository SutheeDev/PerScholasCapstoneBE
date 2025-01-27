import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import User from "./models/User.mjs";
import Restaurant from "./models/restaurant.mjs";
import users from "./config/seedUser.mjs";
import restaurants from "./config/seedRestaurant.mjs";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

// Routes
import userRouter from "./routes/userRoutes.mjs";

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/api/seed/users", async (req, res) => {
  try {
    await User.deleteMany({});
    await User.create(users);
    res.json(users);
  } catch (error) {
    console.log({ err: error.message });
  }
});

app.get("*", (req, res) => {
  res.send("Invalid Route : 404");
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
