import mongoose from "mongoose";
import "dotenv/config";
import Question from "./models/Question.js";
import process from "process";
const sampleQuestions = [
  // --- PHYSICS (10 Questions so our randomizer works) ---
  {
    subject: "Physics",
    text: "What is the SI unit of Force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    correctAnswer: 1,
  },
  {
    subject: "Physics",
    text: "What is the speed of light in a vacuum?",
    options: ["3 x 10^8 m/s", "3 x 10^5 m/s", "3 x 10^6 m/s", "3 x 10^10 m/s"],
    correctAnswer: 0,
  },
  {
    subject: "Physics",
    text: "Who formulated the laws of motion?",
    options: [
      "Albert Einstein",
      "Nikola Tesla",
      "Isaac Newton",
      "Galileo Galilei",
    ],
    correctAnswer: 2,
  },
  {
    subject: "Physics",
    text: "What is the formula for kinetic energy?",
    options: ["mgh", "1/2 mv^2", "ma", "mc^2"],
    correctAnswer: 1,
  },
  {
    subject: "Physics",
    text: "What is the average acceleration due to gravity on Earth?",
    options: ["8.9 m/s²", "9.8 m/s²", "10.5 m/s²", "7.2 m/s²"],
    correctAnswer: 1,
  },
  {
    subject: "Physics",
    text: "What type of lens is used to correct myopia (nearsightedness)?",
    options: ["Convex", "Concave", "Cylindrical", "Bifocal"],
    correctAnswer: 1,
  },
  {
    subject: "Physics",
    text: "What is the unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Coulomb"],
    correctAnswer: 2,
  },
  {
    subject: "Physics",
    text: "Sound waves in air are what type of waves?",
    options: ["Transverse", "Longitudinal", "Electromagnetic", "Radio"],
    correctAnswer: 1,
  },
  {
    subject: "Physics",
    text: "What is the rate of change of velocity called?",
    options: ["Speed", "Momentum", "Acceleration", "Inertia"],
    correctAnswer: 2,
  },
  {
    subject: "Physics",
    text: "Which subatomic particle has a negative charge?",
    options: ["Proton", "Neutron", "Electron", "Photon"],
    correctAnswer: 2,
  },

  // --- SCIENCE (A few extras) ---
  {
    subject: "Science",
    text: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctAnswer: 1,
  },
  {
    subject: "Science",
    text: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
  },
  {
    subject: "Science",
    text: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Pb", "Fe"],
    correctAnswer: 1,
  },
];

const seedDatabase = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database");

    // 2. Clear existing questions to avoid duplicates if you run this twice
    await Question.deleteMany();
    console.log("🗑️ Cleared old questions");

    // 3. Insert new questions
    await Question.insertMany(sampleQuestions);
    console.log("🌱 Successfully seeded questions!");

    // 4. Exit the script successfully
    process.exit(0);
  } catch (error) {
    console.error("❌ Error with seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
