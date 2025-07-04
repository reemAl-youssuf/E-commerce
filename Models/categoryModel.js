const mongoose = require('mongoose')
//create schema
const CategorySchema = mongoose.Schema({
    name:{
        type : String,
        required:[true,' name is required'],
        unique:[true ,'category must be uniqe'],
        minlength:[3, 'category name is too short'],
        maxlength:[32, 'category name is too long'],
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
const  Category = mongoose.model('Category', CategorySchema)
module.exports = Category