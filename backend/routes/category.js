const express = require("express");
const {
  categoryCreate,
  categoryList,
  categoryRead,
  categoryRemove,
  categoryUpdate,
} = require("../controller/category");
const { protect } = require("../middleware/auth");
const { CategoriesValidator } = require("../validators/category");

const router = express.Router();

router.route("/category").post(protect, CategoriesValidator, categoryCreate);
router.route("/categories").get(protect, categoryList);
router.route("/category/:slug").get(protect, categoryRead);
router.route("/category/:slug").delete(protect, categoryRemove);
router.route("/category/:slug").put(protect, categoryUpdate);

module.exports = router;
