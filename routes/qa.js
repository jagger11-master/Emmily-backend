const express = require('express');
const authenticationToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const router = express.Router();

// ==================== INTERVIEWER ====================

// Create a question
router.post(
    '/create-question',
    authenticationToken,
    checkRole('interviewer'),
    async (req,res) => {
        try {
            const { question } = req.body;
            if(!question) return res.status(400).json({message:'Question is required'});

            const newQuestion = new Question({
                question,
                createdBy: req.user.id
            });
            await newQuestion.save();

            res.status(201).json({ message: 'Question created', question: newQuestion });
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// View responses
router.get(
    '/view-responses',
    authenticationToken,
    checkRole('interviewer'),
    async (req,res) => {
        try {
            const questions = await Question.find({ createdBy: req.user.id });
            const responses = await Answer.find({ questionId: { $in: questions.map(q => q._id) } })
                .populate('answeredBy', 'username');

            res.json({ questions, responses });
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// ==================== INTERVIEWEE ====================

// Get all questions
router.get(
    '/questions',
    authenticationToken,
    checkRole('interviewee'),
    async (req,res) => {
        try {
            const questions = await Question.find();
            res.json({ questions });
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// Submit an answer
router.post(
    '/answer',
    authenticationToken,
    checkRole('interviewee'),
    async (req,res) => {
        try {
            const { questionId, answer } = req.body;
            if(!questionId || !answer) return res.status(400).json({message:'Question ID and answer required'});

            const newAnswer = new Answer({
                questionId,
                answer,
                answeredBy: req.user.id
            });
            await newAnswer.save();

            res.status(201).json({ message: 'Answer submitted', answer: newAnswer });
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;
