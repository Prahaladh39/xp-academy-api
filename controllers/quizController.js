import Question from "../models/Question.js";
import User from "../models/User.js";
import redisClient from "../config/redis.js";
// @desc    Get 10 random questions for a subject
// @route   GET /api/quiz/:subject
export const getQuestions = async (req, res) => {
  try {
    const { subject } = req.params;

    // Mongoose aggregation pipeline to get 10 random documents
    const questions = await Question.aggregate([
      { $match: { subject: subject } },
      { $sample: { size: 10 } },
      // Hide the correct answer from the frontend to prevent cheating!
      // { $project: { text: 1, options: 1, _id: 1 } },
    ]);

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Submit final score and update XP
// @route   POST /api/quiz/submit
export const submitScore = async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.user._id);

    const xpEarned = score * 10;
    user.xp += xpEarned;
    await user.save();

    await redisClient.zAdd("global_leaderboard", [
      {
        score: user.xp,
        value: user.name, // We store the name so we don't have to look it up in MongoDB later!
      },
    ]);

    res.json({ message: "Score submitted", totalXP: user.xp, xpEarned });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
