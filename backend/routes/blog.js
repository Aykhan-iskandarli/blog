const express = require("express");
const { create } = require("../controller/blog");
const { getPrivateData } = require("../controller/private");
const { protect, authmiddleWare,adminMiddleWare } = require("../middleware/auth");

const blog = express.Router()

blog.route("/blog").post(protect,create);

module.exports = blog


