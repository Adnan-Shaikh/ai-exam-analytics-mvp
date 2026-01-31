const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: String,
  examType: String,
  section: String,
  attempts: [
    {
      questionId: String,
      selectedAnswer: String,
      isCorrect: Boolean,
      timeSpent: Number
    }
  ],
  analytics: Object,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
