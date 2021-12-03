require('dotenv').config();
require('express-async-errors');

//app
const express = require('express');
const app = express();
//db
const connectDB = require('./db/connect');
//errors
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
//server info
const morgan = require('morgan')
//router
const authRouter = require('./routes/authRoutes');

//Http logger
app.use(morgan('tiny'))
//data format
app.use(express.json())

//route
app.get('/', (req, res) => {
    res.send('E-commerce API')
})

//router middleware
app.use('/api/v1/auth', authRouter);
//errors middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server listening port : ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();
