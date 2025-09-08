const express = require('express');

const router = require('express').Router();

const { validateRegistration,validateLogin } = require("../middleware/validate");

//in memory of the user 
let users = [];

// registration process 
router.post('/register', (req,res)=>{
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
    res.json({message:'Loggin succesfuly',user:{username:username}});
});


module.exports = router;