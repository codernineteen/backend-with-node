const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const {UnauthenticatedError} = require('../errors')

const register = async(req, res) => {
    const newUser = await User.create({...req.body})
    const token = newUser.generateToken()
    res.status(StatusCodes.CREATED).json({user: {name: newUser.getName()}, token })
}

const login = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.generateToken();
    res.status(StatusCodes.OK).json({user: {name: user.username}, token})
}

module.exports = { register, login }