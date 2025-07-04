const Category = require('../Models/categoryModel')
const ApiError = require('../utils/apiError')
const factory = require('./handlersFactory')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

// 1-DiskStorage engine
const multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , 'uploads/categories')
    },
    filename:function(req,file,cb){
        //category-${id}-Date.now().jpeg
        const ext = file.mimetype.split('/')[1]
        const filename = `category-${uuidv4()}-${Date.now()}.${ext}`
        cb(null , filename)
    }
})
const multerFilter = function(req,file,cb){
    if(file.mimetype.startsWith('image')){
        cb(null , true)
    }else{
        cb(new ApiError('Only Image Allowed',400), false)
    }
}

const upload = multer({storage: multerStorage , fileFilter: multerFilter})


const CategoryServices = {

uploadCategoryImage: upload.single('image'),


    //@desc    Get All Categories
    //@route   GET /api/v3/categories
    //@access  Public
GetAllCategories:factory.getAll(Category),

    //@desc    Get Specific Category
    //@route   GET /api/v3/categories/:id
    //@access  Public
GetCategory:factory.getOne(Category),

    //@desc    Create Category
    //@route   POST /api/v3/categories
    //@access  Private
CreatCategory:factory.createOne(Category),

    //@desc    Update Category
    //@route   PUT /api/v3/categories/:id
    //@access  Private
UpdateCategory:factory.updateOne(Category),

    //@desc    Delete Category
    //@route   DELETE /api/v3/categories/:id
    //@access  Private
DeleteCategory: factory.deleteOne(Category)

}
module.exports = CategoryServices