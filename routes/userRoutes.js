import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Notice we inject the 'protect' middleware before the controller
router.get("/profile", protect, getUserProfile);

export default router;
