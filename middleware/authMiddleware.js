import jwt from "jsonwebtoken";
import User from "../models/User.js";
import process from "process";
export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from 'Bearer <token>'
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database (excluding the password) and attach to the request
      req.user = await User.findById(decoded.id).select("-password");

      next(); // The user is valid, let them through to the controller!
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
