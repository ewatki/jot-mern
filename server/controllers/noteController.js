const asyncHandler = require('express-async-handler')
const Note = require('../models/Note')
const Period = require('../models/Period')
const Timeline = require('../models/Timeline')

// @desc   Get all period's notes
// @route  GET /api/profile/timelines/:timelineId/periods/:periodId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const period = await Period.find({ _id: req.params.periodId, timeline: req.params.timelineId});

    res.status(200).json(period);
})

// @desc   Create a new note
// @route  POST /api/profile/timelines/:timelineId/periods/:periodId/notes
// @access Private
const setNote = asyncHandler(async (req, res) => {
    if (!req.body.content) {
        res.status(400)
        throw new Error('Please add content to this note')
    }

    // Query for that Timeline record to ensure it exists
    const timeline = Timeline.findById(req.params.timelineId);
    if (!timeline) {
        res.status(404);
        throw new Error('Timeline not found');
    }
    
    // Query for that Period record to ensure it exists
    const period = Period.findById(req.params.periodId);
    if (!period) {
        res.status(404);
        throw new Error('Period not found');
    }

    const note = await Note.create({
        content: req.body.content,
        period: req.params.periodI,
        timeline: req.params.timelineId,
        user: req.user.id
    })

    await Period.findByIdAndUpdate(req.params.periodId, { $push: { notes: note._id } });

    res.status(200).json(note)
})

// @desc   Update a note
// @route  POST /api/profile/timelines/:timelineId/periods/:periodId/notes/:noteId
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const period = await Period.findById(req.params.periodId)
    if (!period) {
        res.status(400)
        throw new Error('Period not found')
    }

    const note = await Note.findById(req.params.noteId)
    if (!note) {
        res.status(400)
        throw new Error('Note not found')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
        new: true,
    })

    res.status(200).json(updatedNote)
})

// @desc   Delete a note
// @route  POST /api/profile/timelines/:timelineId/periods/:periodId/notes/:noteId
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const period = await Period.findById(req.params.periodId);
    if (!period) {
        res.status(400);
        throw new Error('Period not found');
    }

    // await Period.findByIdAndDelete(req.params.periodId);
    const result = await Note.deleteOne({ _id: req.params.noteId });
    console.log("Deleted count:", result.deletedCount);

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }

    res.status(200).json({ message: `Note deleted successfully ${req.params.noteId}` });
});

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote
}