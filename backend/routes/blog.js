const express = require("express");
const { create, list, ListAllBlogCategories, read,removeBlog, photo, popular, searchBlogGetByCategories } = require("../controller/blog");
const { protect} = require("../middleware/auth");

const blog = express.Router()

blog.route("/blog").post(protect,create);
blog.route("/blogs").get(protect,list);
blog.route("/blogs/:slug").delete(protect,removeBlog);
blog.route("/blog-detail/:slug").get(protect,read);
blog.route('/blog/photo/:slug').get(photo);
blog.route('/blog/popular').get(popular);
blog.route('/blog/search/:id').get(searchBlogGetByCategories);
blog.route("/allBlogCategoriesAndTags").get(protect,ListAllBlogCategories);

module.exports = blog


