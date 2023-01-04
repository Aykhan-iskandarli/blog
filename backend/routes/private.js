const express = require("express");
const { getPrivateData } = require("../controller/private");
const { protect, authmiddleWare } = require("../middleware/auth");

const privateRouter = express.Router()

privateRouter.route("/profile").get(protect,getPrivateData,authmiddleWare);

module.exports = privateRouter


