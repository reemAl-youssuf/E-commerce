const {check , body} = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Category = require('../../Models/categoryModel')
const subCategory = require('../../Models/subCategoryModel')

const ProductValidator ={
    //rules
    getProductValidator :[
        check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware,
    ],

    createProductValidator :[
        check('title')
        .notEmpty().withMessage('Product title is required')
        .isLength({min:3}).withMessage('must be at least 3 chars')
        .custom((val , {req} )=>{
            req.body.slug = slugify(val)
            return true
        })
        ,
        check('description')
        .notEmpty().withMessage('Product description is required')
        .isLength({max:1000}).withMessage('Too long description'),
        check('quantity')
        .notEmpty().withMessage('Product quantity is required')
        .isNumeric().withMessage('Product quantity must be a number'),
        check('sold')
        .optional()
        .isNumeric().withMessage('Product sold must be a number') ,
        check('price')
        .notEmpty().withMessage('Product price is required')
        .isNumeric().withMessage('Product price must be a number')
        .isLength({max:32}).withMessage('Too long price'),
        check('priceAfterDiscount')
        .optional()
        .isNumeric().withMessage('Product priceAfterDiscount must be a number')
        .isFloat()
        .custom((value,{req})=>{
            if(req.body.price <= value){
                throw new Error('priceAfterDiscount must be lower than price')
            }
            return true
        }),
        check('colors')
        .optional()
        .isArray().withMessage('colors should be array of srings'),
        check('imageCover')
        .notEmpty().withMessage('Product imageCover is required'),
        check('images')
        .optional()
        .isArray().withMessage('images should be array of srings'),
        check('category')
        .notEmpty().withMessage('Product category is required')
        .isMongoId().withMessage('Invalid ID format')
        .custom((categoryId) => 
        Category.findById(categoryId).then((category)=>{
            if(!category){return Promise.reject(
                new Error(`No Category for this id: ${categoryId}`)
            )}
        })
        ),
        check('subcategory').optional().isMongoId().withMessage('Invalid ID format')
        .custom((subCategoriesIds)=>{
            subCategory.find({ _id:{$exists:true , $in:subCategoriesIds} })
            .then( (result) =>{
            //length result equal length subCategoriesTds in body
                if(result.length < 1 || result.length !== subCategoriesIds.length){
                return Promise.reject(new Error('Invalid subcategories Ids'))
                }
            })
        })
        .custom((val,{req})=>{
            subCategory.find({category:req.body.category}).then(
                (subcategories)=>{
                    const subCategoriesIdsInDB = []
                    subcategories.forEach((subcategory)=>{subCategoriesIdsInDB.push(subcategory._id.toString())})
                    //check if subcategories ids in db include subCategories in req.body(true/false)
                    const checker = (target,arr)=> target.every((v)=>arr.includes(v))
                    if(!checker(val,subCategoriesIdsInDB)){
                        return Promise.reject(new Error ('subCategories not belong to category'))
                    }
                }
            )
        })
        ,
        check('brand').optional().isMongoId().withMessage('Invalid ID format'),
        check('ratingsAverage')
        .optional()
        .isNumeric().withMessage('ratingsAverage must be a number')
        .isLength({min:1}).withMessage('Rating must be above or equal 1.0')
        .isLength({max:5}).withMessage('Rating must be below or equal 5.0'),
        check('ratingsQuantity')
        .optional()
        .isNumeric().withMessage('ratingsQuantity must be a number')
    ,validatorMiddleware,
    ],
    updateProductValidator :[
        check('id').isMongoId().withMessage('Invalid product id format'),
        body('title').optional()
        .custom((val , {req} )=>{
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware,
    ],
    deleteProductValidator :[
        check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware,
    ],
}
module.exports = ProductValidator 