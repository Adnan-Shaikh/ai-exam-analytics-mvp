const express = require("express");
const Question = require("../models/Questions");
const router = express.Router();

router.get("/", async (req, res) => {
  const { exam, section } = req.query;
  const questions = await Question.aggregate([
    { $match: { examType: exam, section } },
    { $sample: { size: 5 } }
  ]);
  res.json(questions);
});

module.exports = router;
