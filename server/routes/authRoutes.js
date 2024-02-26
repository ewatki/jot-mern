const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Define authentication routes
router.post('/register', async (req, res) => {
    try {
        // 1. Grab JSON data from the post request to /register
        const { username, email, password } = req.body;
    
        // 2. Use that information to create a new User and return a response
        const user = await User.create({ username, email, password });

        // 3. Return a response back - the user
        res.status(201).json(`User created successfully: ${user}`)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', (req, res) => {
    res.status(200).send('Login endpoint');
});

router.post('/logout', (req, res) => {
    res.status(200).send('Logout endpoint');
});

module.exports = router;
