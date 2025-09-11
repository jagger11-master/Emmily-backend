const express = require('express');
const authenticationToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// In-memory storage
let questions = [];
let answers = [];  

// interviewe can interact here and create question
// Create question
router.post(
  '/create-question',
  authenticationToken,
  checkRole('interviewer'),
  (req, res) => {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const newQuestion = {
      id: questions.length + 1,
      question,
      createdBy: req.user.username,
    };

    questions.push(newQuestion);

    res.status(201).json({ message: 'Question created', question: newQuestion });
  }
);

// View all responses (answers) for interviewer's questions
router.get(
  '/view-responses',
  authenticationToken,
  checkRole('interviewer'),
  (req, res) => {
    // Filter answers to only those questions created by this interviewer
    const myQuestions = questions.filter(q => q.createdBy === req.user.username);
    const myResponses = answers.filter(a => myQuestions.some(q => q.id === a.questionId));

    res.json({ questions: myQuestions, responses: myResponses });
  }
);

// here interviewee can interact and view all question asked
// View all questions
router.get(
  '/questions',
  authenticationToken,
  checkRole('interviewee'),
  (req, res) => {
    res.json({ questions });
  }
);

// Submit an answer
router.post(
  '/answer',
  authenticationToken,
  checkRole('interviewee'),
  (req, res) => {
    const { questionId, answer } = req.body;
    if (!questionId || !answer) {
      return res.status(400).json({ message: 'Question ID and answer are required' });
    }

    // Check if question exists
    const questionExists = questions.find(q => q.id === questionId);
    if (!questionExists) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const newAnswer = {
      questionId,
      answer,
      answeredBy: req.user.username,
    };

    answers.push(newAnswer);

    res.status(201).json({ message: 'Answer submitted', answer: newAnswer });
  }
);

module.exports = router;
