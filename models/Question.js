import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    enum: ["English", "Social", "Science", "Physics"], // Strict validation
    index: true, // Crucial for fast queries at scale
  },
  text: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of 4 options
  correctAnswer: { type: Number, required: true }, // Index of the correct option (0-3)
});

export default mongoose.model("Question", QuestionSchema);
