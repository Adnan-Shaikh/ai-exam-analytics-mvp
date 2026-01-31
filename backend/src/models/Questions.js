const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examType: String,
  section: String,
  topic: String,
  difficulty: String,
  questionText: String,
  options: [String],
  correctAnswer: String
});

module.exports = mongoose.model("Question", questionSchema);
