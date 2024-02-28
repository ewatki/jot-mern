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

const router = express.Router();

// timelines/
router.route('/').get(requireAuth, getTimelines).post(requireAuth, setTimeline)
router.route('/:id').delete(requireAuth, deleteTimeline).put(requireAuth, updateTimeline)

module.exports = router;