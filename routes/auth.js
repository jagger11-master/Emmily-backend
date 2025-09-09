const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authenticationToken = require("../middleware/authMiddleware");
const { validateRegistration,validateLogin } = require("../middleware/validate");

// get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET;

//in memory of the user 
let users = [];

// user registering  
router.post('/register', (req,res) =>{
    const {username, password} = req.body;
    if (users.find((u) =>u.username === username)){
        return res.status(400).json({message:'user already exist'});
    }

    users.push({username,password});
    res.status(201).json({message:'user registered successfully'});
});

// user login 
router.post('/login',validateLogin, (req,res)=>{
    const {username,password} = req.body;
    const user = users.find((u) => u.username ===username && u.password === password);
    if(!user) {
      return res.status(409).json({message:'Invalid credentials'});
    }

 // generating the jsonwebtoken
    const token = jwt.sign(
        {username: user.username },
        JWT_SECRET,
        { expiresIn: '1h'}
    );

    res.json({message:'Loggin succesfuly',
        user:{username:username},
        token:token
    });
});

//protected route with JWT(jsonwebtoken)
router.get('/profile',authenticationToken,(req,res) =>{
    res.json({
        message:'the profile is protected',
        user: req.user
    });
});

module.exports = router;