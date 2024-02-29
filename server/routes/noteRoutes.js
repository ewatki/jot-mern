// Protected routes that requires authentication
const express = require('express');
const {
    getNotes,
    setNote, 
    updateNote,
    deleteNote
} = require('../controllers/noteController');
const { 
    requireAuth 
} = require('../middleware/authMiddleware');

const noteRouter = express.Router({ mergeParams: true });

// profile/timelines/:timelineId/periods/:periodId/notes
noteRouter.route('/').get(requireAuth, getNotes).post(requireAuth, setNote)
noteRouter.route('/:noteId').delete(requireAuth, deleteNote).put(requireAuth, updateNote)

module.exports = noteRouter;