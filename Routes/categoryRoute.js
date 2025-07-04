const express = require('express')
const router = express.Router()
const {getCategoryValidator ,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/validators/categoryValidator')
const {GetAllCategories,GetCategory, CreatCategory,UpdateCategory,DeleteCategory, uploadCategoryImage } = require('../Services/categoryService')

const SubCategoryRoute = require('./subCategoryRoute')
router.use('/:categoryId/subcategories',SubCategoryRoute)

router.route('/')
.get(GetAllCategories)
.post(uploadCategoryImage,createCategoryValidator,CreatCategory)
router.route('/:id')
.get(getCategoryValidator,GetCategory)
.put(updateCategoryValidator,UpdateCategory)
.delete(deleteCategoryValidator,DeleteCategory)


module.exports = router