import redisClient from "../config/redis.js";

export const getTopTen = async (req, res) => {
  try {
    // 🏗️ zRangeWithScores is lightning fast.
    // It grabs index 0 to 9, in REVerse order (highest to lowest)
    const topUsers = await redisClient.zRangeWithScores(
      "global_leaderboard",
      0,
      9,
      {
        REV: true,
      },
    );

    // Format the data for React
    const formattedLeaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      name: user.value,
      xp: user.score,
    }));

    res.json(formattedLeaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
