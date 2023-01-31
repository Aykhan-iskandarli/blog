const Blog = require("../model/blog");
const Category = require("../model/categories");
const Tag = require("../model/tags");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../middleware/customError");
const { smartTrim } = require('../helpers/blog');

exports.create = (req, res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const { title, body, categories, tags } = fields;


    if (!title || !title.length) {
      return res.status(400).json({
        error: 'title is required'
      });
    }

    if (!body || body.length < 100) {
      return res.status(400).json({
        error: 'Content is too short'
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: 'At least one category is required'
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: 'At least one tag is required'
      });
    }


    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 30, ' ', ' ...');
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 20));
    blog.postedBy = req.user._id;

    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less then 1mb in size",
        });
      }

      blog.photo.data = fs.readFileSync(files.photo.filepath);
      blog.photo.contentType = files.photo.mimetype;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // res.json(result);
      Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
        (err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            });
          } else {
            Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: errorHandler(err)
                  });
                } else {
                  res.status(201).json(result);
                }
              }
            );
          }
        }
      );
    });
  });
};


exports.ListAllBlogCategories = async (req, res) => {
  let { pageNumber, pageSize } = req.query
  if (!pageNumber) pageNumber = 1;
  if (!pageSize) pageSize = 10;
  const limit = parseInt(pageSize)
  const skip = (pageNumber - 1) * pageSize
  try {
    let totalPage = await Blog.countDocuments()
    const blog = await Blog.find({}).skip(skip).limit(limit).sort({ createdAt: -1 })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name username')
      .select('_id title body slug excerpt categories tags postedBy createdAt updatedAt')

    if (!blog) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    else {
      res.status(200).json({
        success: true,
        blog,
        page: {
          totalCount: totalPage,
          pageIndex: pageNumber,
          pageSize: pageSize,
          previous: false,
          next: false
        }
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    });
  }
};


exports.list = async (req, res) => {
  try {
    const blog = await Blog.find({})
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name username')
      .select('_id title body slug excerpt categories tags postedBy createdAt updatedAt')
    if (!blog) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    else {
      res.status(200).json({
        success: true,
        data: blog,
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    });
  }
};



exports.update = (req, res) => {
  const slug = req.params.toLowerCase()

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });

      }
      let slugBeforeMerge = oldBlog.slug
      oldBlog = _merge(oldBlog, fields)
      oldBlog.slug = slugBeforeMerge

      const { desc, body, categories, tags } = fields;


      if (body) {
        oldBlog.excerpt = smartTrim(body, 30, ' ', ' ...');
        oldBlog.mdesc = stripHtml(body.substring(0, 20));

      }

      if (categories) {
        oldBlog.categories = categories.split(',');

      }

      if (tags) {
        oldBlog.tags = tags.split(",");

      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        oldBlog.photo.data = fs.readFileSync(files.photo.filepath);
        oldBlog.photo.contentType = files.photo.mimetype;
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  })

};


exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase()

  await Blog.find({ slug })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title mtitle body slug mdesc excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json(data)
    })

}


exports.removeBlog = async (req, res) => {
  const slug = req.params.slug.toLowerCase()

  await Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      console.log(err,"err")
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Blog deleted successfully"
    })
  })

}



exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
      .select('photo')
      .exec((err, blog) => {
          if (err || !blog) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          res.set('Content-Type', blog.photo.contentType);
          return res.send(blog.photo.data);
      });
};