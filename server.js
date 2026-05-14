import "dotenv/config"; // Automatically loads your .env variables
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import process from "process";
const app = express();

/**
 * ARCHITECT'S SECURITY LAYER
 * Helmet protects against well-known web vulnerabilities by setting HTTP headers appropriately.
 * CORS is restricted to your frontend URL in production to prevent unauthorized API access.
 */
app.use(helmet());
app.use(cors({
  origin: 'https://xpweb-chi.vercel.app', // Notice: No slash at the end!
  credentials: true // Allowed to send tokens/cookies
}));
app.use(express.json({ limit: "10kb" })); // Safety: prevents large payload attacks

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
/**
 * SCALABILITY TIP: Database Connection
 * At 100k users, your DB connection strategy is vital.
 * Mongoose uses a connection pool by default. For a 'Lakh' users,
 * we would eventually tune 'maxPoolSize'.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 MongoDB Connected Locally");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
