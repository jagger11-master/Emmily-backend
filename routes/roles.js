// routes/roles.js
const express = require('express');
const authenticationToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.get(
  '/interviewer-only',
  authenticationToken,
  checkRole('interviewer'),
  (req, res) => {
    res.json({ message: `Welcome to the dashboard Interviewer, ${req.user.username}` });
  }
);

router.get(
  '/interviewee-only',
  authenticationToken,
  checkRole('interviewee'),
  (req, res) => {
    res.json({ message: `Welcome to the dashboard Interviewee, ${req.user.username}` });
  }
);

module.exports = router;