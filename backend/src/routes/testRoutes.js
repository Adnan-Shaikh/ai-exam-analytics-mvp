const express = require("express");
const Attempt = require("../models/Attempt");
const analyzeTest = require("../services/analyticsEngine");
const router = express.Router();

router.post("/submit", async (req, res) => {
  const analytics = analyzeTest(req.body.attempts);

  const attempt = new Attempt({
    ...req.body,
    analytics
  });

  await attempt.save();
  res.json(analytics);
});

module.exports = router;
