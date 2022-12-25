const express = require("express");
const { getPrivateData } = require("../controller/private");
const { protect } = require("../middleware/auth");

const privateRouter = express.Router()

privateRouter.route("/private").get(protect,getPrivateData);

module.exports = privateRouter


