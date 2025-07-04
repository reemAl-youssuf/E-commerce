const express = require('express')
const router = express.Router()

const {GetAllBrands,GetBrand,CreatBrand,UpdateBrand,DeleteBrand} = require('../Services/brandService')
const {getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator,} = require('../utils/validators/brandValidator')

router.route('/').get(GetAllBrands).post(createBrandValidator,CreatBrand)

router.route('/:id')
.get(getBrandValidator,GetBrand)
.put(updateBrandValidator,UpdateBrand)
.delete(deleteBrandValidator,DeleteBrand)

module.exports = router