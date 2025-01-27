import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

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
