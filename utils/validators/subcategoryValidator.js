const {check , body} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const SubCategoryValidator ={
    //rules
    getSubCategoryValidator :[
        check('id')
        .notEmpty().withMessage('subcategoryId required')
        .isMongoId().withMessage('Invalid subcategory id format'),
    validatorMiddleware,
    ],
    createSubCategoryValidator :[
        check('name')
        .notEmpty().withMessage('subcategory required')
        .isLength({min:2}).withMessage('subcategory name is too short')
        .isLength({max:32}).withMessage('subcategory name is too long')
        .custom((val , {req} )=>{
            req.body.slug = slugify(val)
            return true
        }),
        check('category')
        .notEmpty().withMessage('subCategory must be belon to category')
        .isMongoId().withMessage('Invalid subcategory id format')
        ,
    validatorMiddleware,
    ],
    updateSubCategoryValidator :[
        check('id')
        .notEmpty().withMessage('subcategoryId required')
        .isMongoId().withMessage('Invalid subcategory id format'),
        body('name').custom((val , {req} )=>{
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware,
    ],
    deleteSubCategoryValidator :[
        check('id')
        .notEmpty().withMessage('subcategoryId required')
        .isMongoId().withMessage('Invalid subcategory id format'),
    validatorMiddleware,
    ],
}
module.exports = SubCategoryValidator 
