import express from "express";
import User from "../models/User.mjs";

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

export default router;
