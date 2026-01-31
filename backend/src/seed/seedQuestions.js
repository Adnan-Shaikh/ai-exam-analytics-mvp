const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/Questions");

dotenv.config({ path: "../../.env" });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error(err));


const data = [
  {
    examType: "JEE",
    section: "Physics",
    topic: "Electrostatics",
    difficulty: "easy",
    questionText: "Coulomb's law states force is proportional to?",
    options: ["q1q2/r²", "q1+q2", "r²", "1/r"],
    correctAnswer: "q1q2/r²"
  }
];

Question.insertMany(data).then(() => {
  console.log("Seeded");
  process.exit();
});
