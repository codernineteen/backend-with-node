require('dotenv').config()
//async errors
require('express-async-errors')


const express = require('express');
const app = express();
//connect db
const connectDB = require('./db/connect')
//router
const productsRouter = require('./routes/products')


const notFoundMiddleware =  require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middlware
app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('<h1>store api</h1><a href="/api/v1/products">products page</a>')
})


app.use('/api/v1/products', productsRouter)
//product route


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('listening' + port) 
        })
    } catch (error) {
        console.log(error)
    }
}

start()