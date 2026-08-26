const express = require("express");
const { answerQuestion } = require("../services/rag.service");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        status: "ERROR",
        message: "Question is required"
      });
    }

    console.log("Query received:", question);

    const result = await answerQuestion(question.trim(), 3);
    res.json({
      status: "OK",
      question: question.trim(),
      answer: result.answer,
      sources: result.sources
    });

  } catch (error) {
    console.error("Query failed:", error);

    res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
});

module.exports = router;