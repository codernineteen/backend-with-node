const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomErrors = require('../errors');
const {attachCookiesToResponse} = require('../utils')

const register = async (req, res) => {
    const {email, name, password} = req.body
    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new CustomErrors.BadRequestError("Email is already existed")
    }
    //first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({name, email, password, role});
    const tokenPayload = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res, eachPayload: tokenPayload})
    res.status(StatusCodes.CREATED).json({user: {tokenPayload}})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomErrors.BadRequestError('Please provide both email and password')
    }
    const user = await User.findOne({email});
    
    if(!user) {
        throw new CustomErrors.UnauthenticatedError(`No user with that email : ${email}`)
    }
    const isPasswordMatch = await user.comparePassword(password);
    
    if(!isPasswordMatch) {
        throw new CustomErrors.UnauthenticatedError('Either Password or Email is incorrect')
    }
    
    const tokenPayload = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res, eachPayload: tokenPayload})
    res.status(StatusCodes.ACCEPTED).json({user: {name: user.name}})
}

const logout = async (req, res) => {
   const tokenCookie = req.signedCookies.token;
   res.cookie(
       'token', 
       tokenCookie, 
       {
           httpOnly: true,
           expires: new Date(Date.now())
        }
    )
   res.status(StatusCodes.OK).json({msg : "you logged out"})
}

module.exports = {
    register, login, logout
}