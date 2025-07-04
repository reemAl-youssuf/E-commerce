const express = require('express')
const router = express.Router()

const { GetAllProducts, GetProduct, CreatProduct, UpdateProduct, DeleteProduct} = require('../Services/productService')
const {getProductValidator,createProductValidator,updateProductValidator,deleteProductValidator} = require('../utils/validators/productValidator')

router.route('/')
.get(GetAllProducts)
.post(createProductValidator,CreatProduct)

router.route('/:id')
.get(getProductValidator,GetProduct)
.put(updateProductValidator,UpdateProduct)
.delete(deleteProductValidator, DeleteProduct)


module.exports = router