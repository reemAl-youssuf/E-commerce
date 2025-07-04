const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')
const slugify = require('slugify')
const { ExpressValidator } = require('express-validator')


exports.deleteOne = (model)=>
    asyncHandler(async(req,res,next)=>{
        const {id} = req.params
        const document = await model.findByIdAndDelete(id)
            if(!document){
                // res.status(404).json({msg:`No document for this id {id}`})
                return next(new ApiError(`No document for this id {id}`,404))
            }
            res.status(204).send()
    })
exports.updateOne = (model)=>
    asyncHandler(async(req,res,next)=>{
        const document = await model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
            if(!document){
                // res.status(404).json({msg:`No document for this id {id}`})
                return next(new ApiError(`No document for this id {id}`,404))
            }
            res.status(200).json({data:document})
    })
exports.createOne = (model) =>
    asyncHandler(async(req,res)=>{
            const newDoc = await model.create(req.body)
            res.status(201).json({data: newDoc})
        })
exports.getOne = (model) =>
    asyncHandler(async(req,res,next)=>{
            const {id} = req.params
            const document = await model.findById(id)
            if(!document){
                // res.status(404).json({msg:`No document for this id {id}`})
                return next(new ApiError(`No document for this id {id}`,404))
            }
            res.status(200).json({data:document})
        })
exports.getAll = (model, modelName ='') =>
    asyncHandler(async(req,res)=>{
        let filter = {}
        if(req.filterObj)
            filter = req.filterObj

        // Build query
        const documentsCounts = await model.countDocuments()
        const apiFeatures = new ApiFeatures(model.find(filter), req.query)
        .filter()
        .search(modelName)  
        .sort()
        .limitFields()
        .paginate(documentsCounts)
        
        // Execute query
        const {mongooseQuery , paginationResult} = apiFeatures
        const documents = await mongooseQuery
        res.status(200).json({results:documents.length,paginationResult, data:documents}) 
    })