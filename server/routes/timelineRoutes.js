// Protected routes that requires authentication
const express = require('express');
const {
    getTimelines,
    setTimeline, 
    updateTimeline,
    deleteTimeline
} = require('../controllers/timelineController');
const { 
    requireAuth 
} = require('../middleware/authMiddleware');
const periodRoutes = require('./periodRoutes');

const timelineRouter = express.Router();

// profile/timelines/
timelineRouter.route('/').get(requireAuth, getTimelines).post(requireAuth, setTimeline)
timelineRouter.route('/:timelineId').delete(requireAuth, deleteTimeline).put(requireAuth, updateTimeline)

// profile/timelines/:timelineId/periods
timelineRouter.use('/:timelineId/periods', periodRoutes);

module.exports = timelineRouter;