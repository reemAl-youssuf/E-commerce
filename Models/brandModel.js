const mongoose = require('mongoose')
//create schema
const BrandSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,' name is required'],
        unique:[true ,'brand must be uniqe'],
        minlength:[3, 'brand name is too short'],
        maxlength:[32, 'brand name is too long'],
    },
    slug :{
        type: String,
        lowercase : true
    },
    image :String
},
    {timestamps: true}
)
//create model
const Brand = mongoose.model('Brand',BrandSchema)
module.exports = Brand
