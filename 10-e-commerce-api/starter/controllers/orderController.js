const Order = require('../models/Review');
const Product = require('../models/Product');

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {checkPermissions} = require('../utils')

const fakeStripeAPI = async({amount, currency}) => {
    const client_secret = 'randomsecretkey';
    return {client_secret, amount}
}

const createOrder = async (req, res) => {
    const {items: cartItems, tax, shippingFee} = req.body;

    if(!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided')
    }
    if(!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide shipping fee and tax')
    }
    let orderItems = [];
    let subtotal = 0;
    for (let item of cartItems) {
        const dbProduct = await Product.findOne({_id: item.product})
        if(!dbProduct) {
            throw new CustomError.NotFoundError('No product with that id: ' + item.product)
        }
        const {name, price, image, _id} = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name, 
            price, 
            image, 
            product: _id
        };
        //add item to order
        orderItems = [...orderItems, singleOrderItem]
        //calulate subtotal
        subtotal += price * item.amount
        console.log(orderItems, subtotal)
    }
    //calc total
    const total = tax + shippingFee + subtotal;
    //get cliend secret
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd'
    });
    
    const order = await Order.create({
        orderItems, 
        total, 
        subtotal, 
        tax, 
        shippingFee, 
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId
    });
    res.status(StatusCodes.CREATED).json({order, clientSecret:order.clientSecret})
}

const getAllOrders = async (req, res) => {
    res.send('getAllOrders');
}

const getSingleOrder = async (req, res) => {
    res.send('getSingleOrder');
}


const getCurrentUserOrders = async (req, res) => {
    res.send('getCurrentUserOrders');
}


const updateOrder = async (req, res) => {
    res.send('updateOrder');
}



module.exports = {
    getAllOrders, 
    getSingleOrder, 
    getCurrentUserOrders,
    createOrder, 
    updateOrder
}