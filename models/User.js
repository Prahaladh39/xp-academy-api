import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true, // Optimization for fast lookups
    },
    password: { type: String, required: true },
    role: { type: String, default: "student" },
    xp: { type: Number, default: 0 },
    isPro: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
