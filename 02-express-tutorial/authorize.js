const authorize = (req, res, next) => {
    const {user} = req.query
    if (user === 'yechan') {
        req.user = {name :'yechan' , id : 3}
        next()
    }
    else {
        res.status(401).send('unauthorized')
    }
}

module.exports = authorize