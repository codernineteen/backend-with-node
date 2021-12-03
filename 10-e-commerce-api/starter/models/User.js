const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 30
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        trim: true,
        validate: {
            validator: validator.isEmail, 
            message: 'Please fill a valid email'
        },
        unique: true
    },
    password : {
        type : String,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.comparePassword = async function (pwd) {
    const isMatch = await bcrypt.compare(pwd, this.password)
    return isMatch
}

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id : this._id,
            name : this.name,
            role : this.role
        }, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

UserSchema.methods.verifyJWT = function (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = mongoose.model('User', UserSchema);