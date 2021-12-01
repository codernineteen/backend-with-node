const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = async (req, res, next) => {
    //cheak header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authorization invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the job routes
        req.user = {userId:payload.userId, name:payload.username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authorization invalid')
    }
}

module.exports = auth