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
const { v4: uuidv4 } = require('uuid');
const Categories = require("../model/categories");



exports.create = async (req, res) => {
  try {
    const { title, body, categories, tags } = req.body;
    const blog = await new Blog({
      title,
      body,
      mdesc: stripHtml(body.substring(0, 160)),
      excerpt: smartTrim(body, 600, " ", " ..."),
      photo: req.file.filename,
      postedBy: req.user._id,
      mtitle: title,
      slug: slugify(title).toLowerCase(),
      categories,
      tags,
    });
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      let arrayOfCategories = categories && categories.split(",");
      let arrayOfTags = tags && tags.split(",");
      // res.json(result);
      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.status(201).json(result);
            }
          });
        }
      });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const { title, body, categories, tags } = req.body;

    // Find the blog post to update by ID
    let blog = await Blog.findOne({slug});

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Update the blog post fields
    blog.title = title;
    blog.body = body;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.excerpt = smartTrim(body, 600, " ", " ...");
    blog.categories = categories;
    blog.tags = tags;

    // Save the updated blog post
    blog = await blog.save();

    // Update the categories and tags arrays
    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");
    blog = await Blog.findByIdAndUpdate(
      blog._id,
      { $push: { categories: arrayOfCategories, tags: arrayOfTags } },
      { new: true }
    );

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: errorHandler(err) });
  }

}


// exports.update = (req, res) => {
//   const slug = req.params.slug.toLowerCase();

//   Blog.findOne({ slug }).exec((err, oldBlog) => {
//       if (err) {
//           return res.status(400).json({
//               error: errorHandler(err)
//           });
//       }

//       let form = new formidable.IncomingForm();
//       form.keepExtensions = true;

//       form.parse(req, (err, fields, files) => {
//           if (err) {
//               return res.status(400).json({
//                   error: 'Image could not upload'
//               });
//           }

//           let slugBeforeMerge = oldBlog.slug;
//           oldBlog = _.merge(oldBlog, fields);
//           oldBlog.slug = slugBeforeMerge;

//           const { body,categories, tags } = fields;

//           if (body) {
//               oldBlog.body = body
//               oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...');
//               oldBlog.mdesc = stripHtml(body.substring(0, 160));
//           }

//           if (categories) {
//               oldBlog.categories = categories.split(',');
//           }

//           if (tags) {
//               oldBlog.tags = tags.split(',');
//           }
       

//           if (files.photo) {
//               if (files.photo.size > 10000000) {
//                   return res.status(400).json({
//                       error: 'Image should be less then 1mb in size'
//                   });
//               }
//               oldBlog.photo.data =fs.readFileSync(files.photo.filepath);
//               oldBlog.photo.contentType = files.photo.mimetype;
//           }

//           oldBlog.save((err, result) => {
//               if (err) {
//                   return res.status(400).json({
//                       error: errorHandler(err)
//                   });
//               }
//               // result.photo = undefined;
//               res.json(result);
//           });
//       });
//   });
// };

exports.ListAllBlogCategories = async (req, res) => {
  // pagination 
  let { pageNumber, pageSize } = req.query
  if (!pageNumber) pageNumber = 1;
  if (!pageSize) pageSize = 10;
  const limit = parseInt(pageSize)
  const skip = (pageNumber - 1) * pageSize

  // filter
  const { search } = req.query;

  try {
    const blog = await Blog.find({ $or: [{ title: { $regex: search || "", $options: 'i' } }] })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name username')
      .select('_id title body photo mtitle mdesc slug excerpt categories tags createdAt updatedAt')
    let totalPage = await Blog.countDocuments({ $or: [{ title: { $regex: search || "", $options: 'i' } }] })

    if (!blog) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    else {
      if (pageNumber > Math.ceil(totalPage / limit)) {
        return res.status(400).json({
          error: errorHandler("invalid error")
        });
      }
      else {
        res.status(200).json({
          success: true,
          blog,
          page: {
            totalCount: (+totalPage),
            pageIndex: (+pageNumber),
            pageSize: (+pageSize),
            totalPages: Math.ceil(totalPage / limit),
            previous: false,
            next: false
          }
        })
      }
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

exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  console.log(slug, "slug")
  // let counter = req.body.viewCount
  // counter++
  // counter.save()
  await Blog.findOneAndUpdate({ slug }, { $inc: { viewCount: 1 } }, { new: true });
  let blog = await Blog.findOne({ slug })
    // .select("-photo")
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title body viewCount slug mtitle mdesc categories tags postedBy createdAt updatedAt')
  if (!blog) {
    return res.json({
      error: errorHandler("blog is not found")
    });
  }
  else {
    res.json(blog);
  }

};

exports.getBlogById = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  try {
    let blog = await Blog.findOne({ slug })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .select('_id title body categories tags')
    if (!blog) {
      return res.json({
        error: errorHandler("blog is not found")
      });
    }
    else {
      res.json(blog);
    }
  } catch (error) {
    return res.json({
      error: errorHandler(error)
    });
  }
};

exports.removeBlog = async (req, res) => {
  const slug = req.params.slug.toLowerCase()

  await Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      console.log(err, "err")
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

exports.popular = async (req, res) => {
  await Blog.find({ viewCount: { $gte: 10 } })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id viewCount title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    })
};

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, categories } = req.body.blog;

  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate('postedBy', '_id name profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: 'Blogs not found'
        });
      }
      res.json(blogs);
    });
};

exports.searchBlogGetByCategories = async (req, res) => {
  const { id } = req.params;
  let blog = await Blog.find({ categories: id })
    .select('-photo')
  if (!blog) {
    return res.json({
      error: errorHandler("blog is not found")
    });
  }
  else {
    res.json(blog);
  }

};