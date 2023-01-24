const slugify = require("slugify")
const Tags = require("../model/tags")
const customError = require("../middleware/customError")
const ErrorResponse = require("../utils/errorResponse")

exports.TagCreate = async (req,res,next) =>{
    const {name} = req.body
    let = slug = slugify(name).toLowerCase()

    let Tag = new Tags ({name,slug})
    if(!name){
        return next(new ErrorResponse("name is required", 400));
    }
    await Tag.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:customError.errorHandler(err)
            })
        }
        res.json(data)
    })
    
}

exports.TagList = async (req,res,next) =>{
    try {
        const Tag = await Tags.find({})
        if(!Tag){
            return next(new ErrorResponse("Tags is not found", 404));
        }
        res.status(200).json({
            success:true,
            data:Tag
        })
    } catch (error) {
        next(error)
    }
}

exports.TagRead = async (req,res,next) =>{
    const slug = req.params.slug.toLowerCase()

    try {
        const Tag = await  Tags.findOne({slug})
        if(!Tag){
            return next(new ErrorResponse("Tag is not found", 404));
        }
        res.status(200).json({
            success:true,
            data:Tag
        })
    } catch (error) {
        next(error)
    }

}


exports.TagRemove = async (req,res,next) =>{
    const slug = req.params.slug.toLowerCase()

    try {
        const Tag = await  Tags.findOneAndRemove({slug})
        if(!Tag){
            return next(new ErrorResponse("Tag is not found", 404));
        }
        res.status(200).json({
            message:"Tag deleted successfully",
            success:true,
        })
    } catch (error) {
        next(error)
    }
}




