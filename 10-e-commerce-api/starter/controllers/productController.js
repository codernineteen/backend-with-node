const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomErrors = require('../errors');

const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req, res) => {
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({product})
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body)
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const product = await Product.findOneAndDelete({_id: req.params.id})
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const uploadImage = async (req, res) => {
    res.send('uploadImage')
}

module.exports = {
    createProduct, 
    getAllProducts,
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    uploadImage
}