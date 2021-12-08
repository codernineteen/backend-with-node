const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomErrors = require('../errors');
const path = require('path')


const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products, count: products.length})
}

const getSingleProduct = async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findById(productId).populate('reviews');
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOneAndUpdate(
        { _id: productId},
        req.body,
        {new: true, runValidators: true}
    )
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOne({ _id: productId})
    if(!product) {
        throw new CustomErrors.NotFoundError(`No product with the id : ${req.params.id}`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({msg: `Success, product removed : ${product.name}`})
}

const uploadImage = async (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        throw new CustomErrors.BadRequestError('No files were uploaded');
    }

    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')) {
        throw new CustomErrors.BadRequestError('Please upload Image')
    }

    const maxSize = 1024*1024;
    if(productImage.size > maxSize) {
        throw new CustomErrors.BadRequestError('Please upload Image smaller than 1mb')
    }
    const uploadPath = path.join(__dirname, '../public/uploads/' + productImage.name)
    await productImage.mv(uploadPath, (err) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
        }
        res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`});
    })
}

module.exports = {
    createProduct, 
    getAllProducts,
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    uploadImage
}