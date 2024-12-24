const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register a new user
router.post("/register", async (req, res) => {
    const {name , email , password , role} = req.body;
    console.log(req.body);
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});

        res.status(201).json({message : "User Registered successfully", user});

    }catch(err){
        res.status(400).json({error : "Error registering user" , err});
    }

})

// Login a user
router.post("/login" , async (req, res) => {
    const {email , password} = req.body;

    try{
        const user = await User.findOne({where : {email} });
        if(!user) return res.status(400).json({error : "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error : "Invalid password"});

        const token = jwt.sign({id : user.id , role : user.role}, JWT_SECRET, {expiresIn : '1h'});

        res.json({message : "User logged in successfully", token});
    }catch(err){
        res.status(500).json({error : "Error logging in user", err});
    }
})
module.exports = router; 