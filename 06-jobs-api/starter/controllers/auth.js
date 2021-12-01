const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')

const register = async(req, res) => {
    const newUser = await User.create({...req.body})
    const token = newUser.generateToken()
    res.status(StatusCodes.CREATED).json({user: {name: newUser.getName()}, token })
}

const login = async(req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login 
}