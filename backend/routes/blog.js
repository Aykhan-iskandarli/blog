const express = require("express");
const {
  create,
  list,
  ListAllBlogCategories,
  read,
  removeBlog,
  photo,
  popular,
  searchBlogGetByCategories,
  update,
  getBlogById,
  updateBlog,
} = require("../controller/blog");
const { contactForm } = require("../controller/form");
const { protect } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const blog = express.Router();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Hata: Yalnızca resim dosyaları yüklenebilir!");
  }
}

blog.route("/blog/update/:slug").put(protect,upload,updateBlog);

blog.route("/blog").post(protect, upload, create);
blog.route("/blogs").get(protect, list);
// blog.route("/blogs/:slug").put(protect,update);
blog.route("/blogs/:slug").delete(protect, removeBlog);
blog.route("/blog-detail/:slug").get(protect, read);
blog.route("/blog-edit/:slug").get(protect, getBlogById);
blog.route("/blog/photo/:slug").get(photo);
blog.route("/blog/popular").get(popular);
blog.route("/blog/search/:id").get(searchBlogGetByCategories);
blog.route("/allBlogCategoriesAndTags").get(protect, ListAllBlogCategories);

// blog.route("/upload").post(upload,uploadPhoto);

blog.route("/contact").post(contactForm);
module.exports = blog;
