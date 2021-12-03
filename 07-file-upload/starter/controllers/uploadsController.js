const {StatusCodes} = require('http-status-codes')
const path = require('path')
const cloudinary = require('cloudinary').v2
const Errors = require('../errors')
const fs = require('fs')

const uploadProductImageLocal = async(req, res) => {
    if(!req.files) {
        throw new Errors.BadRequestError('No file uploaded')
    }
    const productImage = req.files.image
    if(!productImage.mimetype.startsWith('image')) {
        throw new Errors.BadRequestError('Please upload Image')
    }
    const maxSize = 1000
    if(productImage.size > maxSize) {
        throw new Errors.BadRequestError('Please upload Image which is smaller than 1KB')
    }
    const imageStorage = path.join(__dirname, '../public/uploads/'+ productImage.name)


    await productImage.mv(imageStorage);
    return res
    .status(StatusCodes.OK)
    .json({image: {src: `/uploads/${productImage.name}`}})
};

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload'
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({image : {src: result.secure_url} })
}



module.exports = uploadProductImage