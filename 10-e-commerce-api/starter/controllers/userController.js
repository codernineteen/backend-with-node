const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomErrors = require('../errors')

const getAllUsers = async (req, res) => {
    const users = await User.find({role: 'user'}, 'name email role')
    if (!users) {
        throw new CustomErrors.NotFoundError('No users');
    }
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId);
    if(!user) {
        throw new CustomErrors.NotFoundError('No users with that id : ' + userId);
    }
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
    res.send('get current user');
}

const updateUser = async (req, res) => {
    res.send('update user info');
}

const updateUserPassword = async (req, res) => {
    res.send('edit current password');
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}