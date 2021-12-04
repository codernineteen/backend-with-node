const jwt = require('jsonwebtoken');

const generateToken = ({payload}) => {
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_LIFETIME}
    )
    console.log('token generated')

    return token;
}

const attachCookiesToResponse = ({res, eachPayload}) => {
    const token = generateToken({payload : eachPayload});
    
    const oneDay = 1000 * 60 * 60 *24

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

const isTokenValid = ({token}) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
    generateToken,
    attachCookiesToResponse,
    isTokenValid
}