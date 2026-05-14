import express from "express";
import { getQuestions, submitScore } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:subject", protect, getQuestions);
router.post("/submit", protect, submitScore);

export default router;
