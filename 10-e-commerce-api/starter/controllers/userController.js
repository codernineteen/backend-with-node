const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomErrors = require('../errors')
const {attachCookiesToResponse, createTokenPayload, checkPermissions} = require('../utils')

const getAllUsers = async (req, res) => {
    const users = await User.find({role: 'user'}, 'name email role');
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    if(!user) {
        throw new CustomErrors.NotFoundError('No users with that id : ' + userId);
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json(req.user)
}

//update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//     const {name, email} = req.body;
//     if(!name || !email) {
//         throw new CustomErrors.BadRequestError('Please provide both name and email')
//     }
//     const user = await User.findOneAndUpdate(
//         {_id: req.user.userId},
//         {name, email},
//         {new: true, runValidators: true}
//     )
//     const tokenPayload = createTokenPayload({user});
//     attachCookiesToResponse({res, eachPayload : tokenPayload});
//     console.log('cookie attached')
//     res.status(StatusCodes.OK).json({user, token: req.signedCookies})
// }

//update user with await user.save()
const updateUser = async (req, res) => {
    const {name, email} = req.body;
    if(!name || !email) {
        throw new CustomErrors.BadRequestError('Please provide both name and email')
    }
    const user = await User.findById(req.user.userId)

    user.name = name;
    user.email = email;

    await user.save();

    const tokenPayload = createTokenPayload({user});
    attachCookiesToResponse({res, eachPayload : tokenPayload});
    console.log('cookie attached')
    res.status(StatusCodes.OK).json({user, token: req.signedCookies})
}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
        throw new CustomErrors.BadRequestError('Be sure to provide current password and a password you want to change')
    }

    const user = await User.findById(req.user.userId);
    const isMatch = user.comparePassword(oldPassword);
    if(!isMatch) {
        throw new CustomErrors.UnauthenticatedError('Given Password is incorrect')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg: 'You can use new password from now on'})
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}