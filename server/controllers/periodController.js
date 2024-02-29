const asyncHandler = require('express-async-handler')
const Period = require('../models/Period')
const Timeline = require('../models/Timeline')

// @desc   Get a timeline's periods
// @route  GET api/profile/timelines/:timelineId/periods
// @access Private
const getPeriods = asyncHandler(async (req, res) => {
    const timeline = await Timeline.findById(req.params.timelineId);

    if (!timeline) {
        return res.status(404).json({ message: 'Timeline not found' });
    }

    const periods = timeline.periods;
    res.status(200).json({ periods });
})

// @desc   Create a new period
// @route  POST api/profile/timelines/:timelineId/periods/
// @access Private
const setPeriod = asyncHandler(async (req, res) => {
    if (!req.body.startDate) {
        res.status(400)
        throw new Error('Please add a start date for this period')
    }

    // Query for timeline record to ensure it exists
    const timeline = Timeline.findById(req.params.timelineId);
    if (!timeline) {
        res.status(404);
        throw new Error('Timeline not found');
    }

    const period = await Period.create({
        startDate: req.body.startDate,
        timeline: req.params.timelineId,
        user: req.user.id
    })

    // Add newly created period's ID to the timeline's periods array
    await Timeline.findByIdAndUpdate(req.params.timelineId, { $push: { periods: period._id } });

    res.status(200).json(period)
})

// @desc   Update a timeline's period
// @route  PUT api/profile/timelines/:timelineId/periods/:periodId
// @access Private
const updatePeriod = asyncHandler(async (req, res) => {
    const timeline = await Timeline.findById(req.params.timelineId);

    if (!timeline) {
        return res.status(404).json({ message: 'Timeline not found' });
    }

    const period = await Period.findById(req.params.periodId)
    if (!period) {
        res.status(400)
        throw new Error('Period not found')
    }

    const updatedPeriod = await Period.findByIdAndUpdate(req.params.periodId, req.body, {
        new: true,
    })

    res.status(200).json(updatedPeriod)
})

// @desc   Delete a timeline's period
// @route  DELETE api/profile/timelines/:timelineId/periods/:periodId
// @access Private
const deletePeriod = asyncHandler(async (req, res) => {
    const timeline = await Timeline.findById(req.params.timelineId);

    if (!timeline) {
        return res.status(404).json({ message: 'Timeline not found' });
    }
    
    const period = await Period.findById(req.params.periodId)
    if (!period) {
        res.status(400)
        throw new Error('Period not found')
    }

    await Period.findByIdAndDelete(req.params.periodId);

    res.status(200).json({ id: req.params.periodId })
})


module.exports = {
    getPeriods,
    setPeriod,
    updatePeriod,
    deletePeriod
}