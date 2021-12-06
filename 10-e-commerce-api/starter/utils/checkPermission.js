const CustomErrors = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
    if(requestUser.role === 'admin') return;
    if(requestUser.userId === resourceUserId.toString()) return
    throw new CustomErrors.ForbiddenError('You are denied')
}

module.exports = checkPermissions;