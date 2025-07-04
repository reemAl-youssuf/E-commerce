const SubCategory = require('../Models/subCategoryModel')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const slugify = require('slugify')
const ApiFeatures = require('../utils/apiFeatures')
const factory = require('./handlersFactory')

const subCategoryService = {
// Nested Route (creat)
setCategoryIdToBody:(req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
},

        //@desc    Create SubCategory
        //@route   POST /api/v3/subcategories
        //@access  Private
CreatSubCategory:factory.createOne(SubCategory),

        // Nested Route (Get)
        // GET    /api/v3/categories/categoryId/subcategories
createFilterObj:(req,res,next)=>{
        let filterObject = {}
        if(req.params.categoryId) filterObject = {category: req.params.categoryId}
        req.filterObj = filterObject
        next()
        },

        //@desc    Get All SubCategories
        //@route   GET /api/v3/subcategories
        //@access  Public
GetAllSubCategories:factory.getAll(SubCategory),

        //@desc    Get Specific SubCategory
        //@route   GET /api/v3/subcategories/:id
        //@access  Public
GetSubCategory:factory.getOne(SubCategory),

        //@desc    Update SubCategory
        //@route   PUT /api/v3/subcategories/:id
        //@access  Private
UpdateSubCategory:factory.updateOne(SubCategory),

        //@desc    Delete SubCategory
        //@route   DELETE /api/v3/subcategories/:id
        //@access  Private
DeleteSubCategory: factory.deleteOne(SubCategory)

}


module.exports = subCategoryService