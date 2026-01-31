function analyzeTest(attempts) {
  let total = attempts.length;
  let correct = attempts.filter(a => a.isCorrect).length;
  let totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0);

  let topicStats = {};
  let difficultyStats = {};

  attempts.forEach(a => {
    const { topic, difficulty } = a;

    if (!topicStats[topic])
      topicStats[topic] = { correct: 0, total: 0 };

    if (!difficultyStats[difficulty])
      difficultyStats[difficulty] = { correct: 0, total: 0 };

    topicStats[topic].total++;
    difficultyStats[difficulty].total++;

    if (a.isCorrect) {
      topicStats[topic].correct++;
      difficultyStats[difficulty].correct++;
    }
  });

  let recommendations = [];

  Object.keys(topicStats).forEach(topic => {
    let acc = (topicStats[topic].correct / topicStats[topic].total) * 100;
    if (acc < 50) {
      recommendations.push(
        `Revise fundamentals of ${topic} and practice easy questions`
      );
    }
  });

  if (correct / total < 0.6) {
    recommendations.push("Overall accuracy is low. Focus on concept clarity.");
  }

  if (totalTime / total > 90) {
    recommendations.push("You are spending too much time per question. Practice timed tests.");
  }

  return {
    score: correct,
    accuracy: (correct / total) * 100,
    avgTime: totalTime / total,
    topicStats,
    difficultyStats,
    recommendations
  };
}

module.exports = analyzeTest;
