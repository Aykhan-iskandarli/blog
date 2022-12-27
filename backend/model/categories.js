const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

mongoose.set('strictQuery', false);

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    max:32,
    trim: true,
  },
  slug: {
    type: String,
    unique:true,
    index:true
  },
},{timestamps:true});



const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
