// Protected routes that requires authentication
const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getProfile
} = require('../controllers/userController')
const { 
  requireAuth 
} = require('../middleware/authMiddleware.js');

const router = express.Router();

// users/
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', requireAuth, getProfile)


module.exports = router;
