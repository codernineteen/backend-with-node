const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomErrors = require('../errors');

const register = async (req, res) => {
    const {email, name, password} = req.body
    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new CustomErrors.BadRequestError("Email is already existed")
    }
    //first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const newUser = await User.create({name, email, password, role});
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name, email, role}, token})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomErrors.BadRequestError('Please provide both email and password')
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new CustomErrors.NotFoundError(`No user with that email : ${email}`)
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch) {
        throw new CustomErrors.UnauthenticatedError('Either Password or Email is incorrect')
    }
    const token = user.createJwt();
    res.status(StatusCodes.ACCEPTED).json({user: {name: user.name} ,token})
}

const logout = async (req, res) => {
    res.send('logout completely')
}

module.exports = {
    register, login, logout
}