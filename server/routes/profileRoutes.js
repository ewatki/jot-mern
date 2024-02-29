// Protected routes that requires authentication
const express = require('express');
const { 
  getProfile, 
} = require('../controllers/profileController')
const { 
  requireAuth 
} = require('../middleware/authMiddleware.js');
const timelineRoutes = require('./timelineRoutes.js')

const profileRouter = express.Router();

// profile/
profileRouter.route('/').get(requireAuth, getProfile)

// profile/timelines
profileRouter.use('/timelines', timelineRoutes);

module.exports = profileRouter;