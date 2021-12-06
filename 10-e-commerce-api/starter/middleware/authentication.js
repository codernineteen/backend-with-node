const jwt = require('jsonwebtoken');
const {isTokenValid} = require('../utils');
const CustomErrors = require('../errors');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        throw new CustomErrors.UnauthenticatedError('token is not existed')
    }
    try {
        const {name, userId, role} = isTokenValid({token})
        req.user = {name, userId, role};
        next();
    } catch (error) {
        throw new CustomErrors.UnauthenticatedError('token is invalid')
    }
}

const authorizePermission = (...roles) => {
    return function (req, res, next) {
        if(!roles.includes(req.user.role)) {
            throw new CustomErrors.ForbiddenError('Access denied to this route');
        }
        next();
    }
}

module.exports = {authenticateUser, authorizePermission}