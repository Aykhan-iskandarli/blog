const express = require("express");
const { create, list } = require("../controller/blog");
const { protect} = require("../middleware/auth");

const blog = express.Router()

blog.route("/blog").post(protect,create);
blog.route("/blogs").get(protect,list);

module.exports = blog


