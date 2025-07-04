const mongoose = require('mongoose')
//create schema
const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"],
        unique:[true,"name must be unique"],
        minlength:[2,"too short"],
        maxlength:[32,"too long"]
    },
    slug:{
        type: String,
        lowercase : true
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required:[true,"subCategory must be belon to parent category"],
    }
},
{timestamp:true})

//create model
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = SubCategory