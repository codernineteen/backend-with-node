const mongoose = require('mongoose');

const Product = await mongoose.Schema({
    name : {
        type:String
    },
    price: {
        type:Number
    },
    description: {
        type:String
    },
    image: {
        type:String
    },
    category: {
        type:String
    },
    company: {
        type:String
    },
    colors: {
        type:[]
    },
    featured: {
        type:Boolean
    },
    freeShipping: {
        type:Boolean
    },
    inventory:{
        type:Number
    },
    averageRating:{
        type:Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    timestamps: true
})

module.exports = mongoose.model('product', Product)