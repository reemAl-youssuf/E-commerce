const {check , body} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const CategoryValidator ={
    //rules
    getCategoryValidator :[
        check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
    ],
    createCategoryValidator :[
        check('name')
        .notEmpty()
        .withMessage('Invalid is id format')
        .isLength({min:3})
        .withMessage('category name is too short')
        .isLength({max:32})
        .withMessage('category name is too long')
        .custom((val , {req} )=>{
            req.body.slug = slugify(val)
            return true
        })
        ,
    validatorMiddleware,
    ],
    updateCategoryValidator :[
        check('id').isMongoId().withMessage('Invalid category id format'),
        body('name').custom((val , {req} )=>{
                    req.body.slug = slugify(val)
                    return true
                }),
    validatorMiddleware,
    ],
    deleteCategoryValidator :[
        check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
    ],
}
module.exports = CategoryValidator 
