const Product = require('../Models/productModel')
const ApiError = require('../utils/apiError')
const factory = require('./handlersFactory')

const ProductServices = {

    //@desc    Get All Products
    //@route   GET /api/v3/Products
    //@access  Public
GetAllProducts:factory.getAll(Product ,'Products'),

    //@desc    Get Specific Product
    //@route   GET /api/v3/Products/:id
    //@access  Public
GetProduct:factory.getOne(Product),

    //@desc    Create Product
    //@route   POST /api/v3/Products
    //@access  Private
CreatProduct:factory.createOne(Product),

    //@desc    Update Product
    //@route   PUT /api/v3/Products/:id
    //@access  Private
UpdateProduct:factory.updateOne(Product) ,

    //@desc    Delete Product
    //@route   DELETE /api/v3/Products/:id
    //@access  Private
DeleteProduct: factory.deleteOne(Product)

}
module.exports = ProductServices