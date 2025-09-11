const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { validateRegistration, validateLogin } = require("../middleware/validate");
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', validateRegistration, async (req,res) => {
    try {
        const {username, password, role} = req.body;
        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(400).json({message:'User already exists'});

        const user = new User({ username, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', validateLogin, async (req,res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user) return res.status(409).json({message:'Invalid credentials'});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(409).json({message:'Invalid credentials'});

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message:'Login successful',
            user: { username: user.username, role: user.role },
            token
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
