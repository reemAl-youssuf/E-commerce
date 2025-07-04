const Brand = require('../Models/brandModel')
const ApiError = require('../utils/apiError')
const factory = require('./handlersFactory')


const BrandsService = {


    //@desc    Get All brands
    //@route   GET /api/v3/brands
    //@access  Public
    GetAllBrands:factory.getAll(Brand),

        //@desc    Get Specific brand
        //@route   GET /api/v3/brands/:id
        //@access  Public
    GetBrand: factory.getOne(Brand),

        //@desc    Create Brand
        //@route   POST /api/v3/Brands
        //@access  Private
    CreatBrand:factory.createOne(Brand),

        //@desc    Update brand
        //@route   PUT /api/v3/brands/:id
        //@access  Private
    UpdateBrand: factory.updateOne(Brand) ,

        //@desc    Delete brand
        //@route   DELETE /api/v3/brands/:id
        //@access  Private
    DeleteBrand: factory.deleteOne(Brand)



}

module.exports = BrandsService