const asyncHandler = require('express-async-handler')
const Timeline = require('../models/Timeline')
const User = require('../models/User')

// @desc   Get timelines
// @route  GET /api/timelines
// @access Private
const getTimelines = asyncHandler(async (req, res) => {
    const timelines = await Timeline.find({ user: req.user.id });

    res.status(200).json(timelines)
})

// @desc   Create a new timeline
// @route  POST /api/timelines
// @access Private
const setTimeline = asyncHandler(async (req, res) => {
    if (!req.body.periodType) {
        res.status(400)
        throw new Error('Please add a period type')
    }

    const timeline = await Timeline.create({
        periodType: req.body.periodType,
        user: req.user.id
    })

    res.status(200).json(timeline)
})

// @desc   Update a user's timeline
// @route  PUT /api/timelines/:id
// @access Private
const updateTimeline = asyncHandler(async (req, res) => {
    const timeline = await Timeline.findById(req.params.id)

    if (!timeline) {
        res.status(400)
        throw new Error('Timeline not found')
    }

    // Check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Compare logged in user to timeline user
    if (timeline.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTimeline = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTimeline)
})

// @desc   Delete a user's timeline
// @route  DELETE /api/timelines/:id
// @access Private
const deleteTimeline = asyncHandler(async (req, res) => {
    const timeline = await Timeline.findById(req.params.id)

    if (!timeline) {
        res.status(400)
        throw new Error('Timeline not found')
    }

    // Check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Compare logged in user to timeline user
    if (timeline.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Timeline.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id })})


module.exports = {
    getTimelines,
    setTimeline,
    updateTimeline,
    deleteTimeline
}