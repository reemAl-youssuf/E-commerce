const {check , body} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const BrandsValidator = {
//rules
getBrandValidator :[
    check('id')
    .isMongoId().withMessage('Invalid brand id format'),
validatorMiddleware,
],
createBrandValidator :[
    check('name')
    .notEmpty()
    .withMessage('Invalid is id format')
    .isLength({min:3})
    .withMessage('brand name is too short')
    .isLength({max:32})
    .withMessage('brand name is too long')
    .custom((val , {req} )=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
validatorMiddleware,
],
updateBrandValidator :[
    check('id').isMongoId().withMessage('Invalid brand id format'),
    body('name').custom((val , {req} )=>{
        req.body.slug = slugify(val)
        return true
    }),
validatorMiddleware,
],
deleteBrandValidator :[
    check('id').isMongoId().withMessage('Invalid brand id format'),
validatorMiddleware,
],

}
module.exports = BrandsValidator