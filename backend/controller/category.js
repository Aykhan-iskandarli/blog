const slugify = require("slugify")
const Categories = require("../model/categories")
const customError = require("../middleware/customError")
const ErrorResponse = require("../utils/errorResponse")

exports.categoryCreate = async (req, res, next) => {
    const { name } = req.body
    let  slug = slugify(name).toLowerCase()

    let category = new Categories({ name, slug })
    if (!name) {
        return next(new ErrorResponse("name is required", 400));
    }
    await category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: customError.errorHandler(err)
            })
        }
        res.json(data)
    })

}

exports.categoryList = async (req, res, next) => {
    try {
        const category = await Categories.find({})
        if (!category) {
            return next(new ErrorResponse("category is not found", 404));
        }
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        next(error)
    }
}

exports.categoryRead = async (req, res, next) => {
    const slug = req.params.slug.toLowerCase()

    try {
        const category = await Categories.findOne({ slug })
        if (!category) {
            return next(new ErrorResponse("category is not found", 404));
        }
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        next(error)
    }

}


exports.categoryRemove = async (req, res, next) => {
    const slug = req.params.slug.toLowerCase()

    try {
        const category = await Categories.findOneAndRemove({ slug })
        if (!category) {
            return next(new ErrorResponse("category is not found", 404));
        }
        res.status(200).json({
            message: "Category deleted successfully",
            success: true,
        })
    } catch (error) {
        next(error)
    }
}



exports.categoryUpdate = async (req, res, next) => {
    const slug = req.params.slug.toLowerCase()
    const id = req.params.id
    try {
        const category = await Categories.findOne(id)
        console.log(category,"cat")
        if (!category) {
            return next(new ErrorResponse("category is not found", 404));
        }
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        next(error)
    }
}





