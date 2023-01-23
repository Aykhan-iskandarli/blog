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
        let { pageNumber, pageSize } = req.query
        if (!pageNumber) pageNumber = 1;
        if (!pageSize) pageSize = 10;
        const limit = parseInt(pageSize)
        const skip = (pageNumber - 1) * pageSize

        const category = await Categories.find({}).skip(skip).limit(limit)
        let totalPage = await Categories.countDocuments()
        if (!category) {
            return next(new ErrorResponse("category is not found", 404));
        }
        res.status(200).json({
            success: true,
            data: category,
            page:{
                totalCount:totalPage,
                pageIndex:pageNumber,
                pageSize:pageSize,
                previous:false,
                next:false
            }
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
  const slug = req.params.slug?.toLowerCase();
  // const id = req.params.id
  // const {name,slug} = req.body
  if (!req.body) {
      return next(new ErrorResponse("Data to update can not be empty!", 404));
  }
  try {
    const category = await Categories.findOne(slug);
    if (!category) {
      return next(new ErrorResponse("category is not found", 404));
    } else {
      category.slug = req.body.slug;
      category.name = req.body.name;

      category.save((err) => {
        if (err) {
          res.send(err);
        }
        res
          .status(200)
          .json({ message: "Category updated successfully", category });
      });
    }
  } catch (error) {
    next(error);
  }
};





