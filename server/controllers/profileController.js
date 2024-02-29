const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc   Get user data
// @route  GET /api/profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email
    })
})

module.exports = {
    getProfile,
}