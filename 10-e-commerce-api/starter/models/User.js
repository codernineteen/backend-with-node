const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('User', UserSchema);