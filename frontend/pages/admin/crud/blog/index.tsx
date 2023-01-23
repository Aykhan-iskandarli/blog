import InputComponent from 'packages/RInput/input.component'
import React from 'react'
import css from "./blog.module.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogComponent = () => {
  return (
    <div className={css.blog_form}>
      <div className={css.blog_form_title}>
        <h1>Create Blog Form</h1>
      </div>
      <div className="container">
      <form>
        <InputComponent label='Title'/>
        <ReactQuill theme="snow" value={""}  />
      </form>
      </div>
    </div>
  )
}

export default BlogComponent