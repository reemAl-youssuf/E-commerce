const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/errorMiddleware')
const morgan = require('morgan')
const DBConnection = require('./config/Database')
//Routes
const CategoryRoute = require('./Routes/categoryRoute')
const SubCategoryRoute = require('./Routes/subCategoryRoute')
const BrandRoute = require('./Routes/brandRoute')
const ProductRoute = require('./Routes/productRoute')


//middleware
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(`node: ${process.env.NODE_ENV}`)
}

// Connected DB
DBConnection()

const api = process.env.API_URL
//Mount Routes
app.use(`${api}/categories`,CategoryRoute)
app.use(`${api}/subcategories`,SubCategoryRoute)
app.use(`${api}/brands` , BrandRoute)
app.use(`${api}/products` , ProductRoute)

app.all('*',(req,res,next)=>{
    //Create error and send it to error handling middleware
    // const err = new Error(`can't find this route ${req.originalUrl}`)
    // next(err.message)
    next(new ApiError(`can't find this route ${req.originalUrl}`,400))
})
//global error handling middleware
app.use(globalError)

// Server
const Port = process.env.Port || 3000
const server = app.listen(Port, ()=>{
    console.log(`app listening on port ${Port}`)
})

// Handle rejections outside express
process.on('unhandledRejection',(err)=>{
    console.error(`unhandledRejection Errors: ${err.name} | ${err.message} ` )
    server.close(()=>{
        process.exit(1)
    })
}) 