const express = require("express");
const { TagCreate, TagList, TagRead, TagRemove } = require("../controller/tags");
const { protect } = require("../middleware/auth");
const { CategoriesValidator } = require("../validators/category");

const router = express.Router();

router.route("/tags").post(protect, CategoriesValidator, TagCreate);
router.route("/tags").get(protect, TagList);
router.route("/tag/:slug").get(protect, TagRead);
router.route("/tag/:slug").delete(protect, TagRemove);

module.exports = router;
