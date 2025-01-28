import express from "express";
import { getUser, updateUser } from "../controllers/userController.mjs";

const router = express.Router();

router.route("/:id").get(getUser);
router.route("/:id").patch(updateUser);

export default router;
