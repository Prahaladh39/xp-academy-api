// routes/leaderboardRoutes.js
import express from "express";
import { getTopTen } from "../controllers/leaderboardController.js";
const router = express.Router();

router.get("/", getTopTen); // Public route, anyone can see the leaderboard
export default router;
