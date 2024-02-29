// Protected routes that requires authentication
const express = require('express');
const {
    getPeriods,
    setPeriod, 
    updatePeriod,
    deletePeriod
} = require('../controllers/periodController');
const { 
    requireAuth 
} = require('../middleware/authMiddleware');
const noteRoutes = require('./noteRoutes');

const periodRouter = express.Router({ mergeParams: true });

// profile/timelines/:timelineId/periods/
periodRouter.route('/').get(requireAuth, getPeriods).post(requireAuth, setPeriod)
periodRouter.route('/:periodId').delete(requireAuth, deletePeriod).put(requireAuth, updatePeriod)

// profile/timelines/:timelineId/periods/:periodId/notes
periodRouter.use('/:periodId/notes', noteRoutes);

module.exports = periodRouter;