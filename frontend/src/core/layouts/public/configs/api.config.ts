// import environment from './app.config';

export const environment = process.env.PUBLIC_URL;
console.log(environment,"environment")
const base = "/api/";

export const API = {
  register: environment + base + "register",
  login: environment + base + "login",
  logout: environment + base + "signout",

  category: environment + base + "category",
  categories: environment + base + "categories",

  tags: environment + base + "tags",
  blogs: environment + base + "blog",
  blogUpdateandRemove: environment + base + "blogs",
  blogEdit: environment + base + "blog-edit",
  allblogs: environment + base + "allBlogCategoriesAndTags",
  blogPhoto: environment + base + "blog/photo",
  blogDetail: environment + base + "blog-detail",
  language: environment + base + "lang",
};
