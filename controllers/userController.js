import User from "../models/User.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    // req.user comes from the 'protect' middleware we built earlier!
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
