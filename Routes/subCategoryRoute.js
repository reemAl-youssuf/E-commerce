const express = require('express')

//mergeparams: Allow us to access parameters on other routers
//ex" we need to access categoryId from category router
const router = express.Router({mergeParams:true})

const {CreatSubCategory,GetAllSubCategories,GetSubCategory,UpdateSubCategory,DeleteSubCategory,createFilterObj,setCategoryIdToBody} = require('../Services/subCategoryService')

const { getSubCategoryValidator,createSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator} = require('../utils/validators/subcategoryValidator')


router.route('/')
.get(createFilterObj,GetAllSubCategories)
.post(setCategoryIdToBody,createSubCategoryValidator,CreatSubCategory)
router.route('/:id')
.get(getSubCategoryValidator,GetSubCategory)
.put(updateSubCategoryValidator,UpdateSubCategory)
.delete(deleteSubCategoryValidator,DeleteSubCategory)

module.exports = router