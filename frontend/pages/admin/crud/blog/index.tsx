import InputComponent from 'packages/RInput/input.component'
import React, { useEffect, useRef, useState } from 'react'
import css from "./blog.module.scss"

import ButtonComponent from 'packages/RButton/button.component';
import ReactQuillComponent from './quill.editor';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategory, getTag } from 'store/category/store/action';
import { generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions';
import { postBlogData } from 'store/blog/store/action';
import { useQuill } from 'react-quilljs';
const BlogComponent = () => {
  const categoryList: any = useSelector((state: any) => state.categoryAndTag?.category);
  const tagList: any = useSelector((state: any) => state.categoryAndTag?.tags);
  const [inputForm, setInputForm] = useState<any>({
    title: "",
    description: "",
    photo:""
  })
  const [ image,setImage] = useState<any>()
  const [quillContent, setQuillContent] = useState('')
  const [checkedCat, setCheckedCat] = useState<any>([]); // categories
  const [checkedTag, setCheckedTag] = useState<any>([]); // tags

  const dispatch: any = useDispatch()
console.log(checkedCat,"aa")
  const { title,photo } = inputForm

  useEffect(() => {
    dispatch(getCategory({}))
  }, [])

  useEffect(() => {
    dispatch(getTag())
  }, [])

  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {}, }
  });

  const handleToggle = (e: any, id: any) => {
    const clickedCategory = checkedCat.indexOf(id);
    const clickedTag = checkedTag.indexOf(id);
    const allCat = [...checkedCat];
    const allTag = [...checkedTag];
    if (e.target.name === "categories") {
      if (clickedCategory === -1) {
        allCat.push(id);
      } else {
        allCat.splice(clickedCategory, 1);
      }
    }
    else if (e.target.name === "tags") {
      if (clickedTag === -1) {
        allTag.push(id);
      } else {
        allTag.splice(clickedTag, 1);
      }
    }
    setCheckedTag(allTag)
    setCheckedCat(allCat)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
      setInputForm({ ...inputForm, [name]: value })

  }

  const handleChangePhoto = (e: any) => {
    setImage(e.target.files[0])
  }


  const handleSubmit = (e: any) => {
    e.preventDefault()
    let formData:any = new FormData()
    formData.append('title', title)
    formData.append('body', quillContent)
    formData.append('categories', checkedCat)
    formData.append('tags', checkedTag)
    formData.append('photo', image)
    dispatch(postBlogData(formData))
  }

  return (
    <div className={css.blog_form}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={css.blog_form_title}>
              <h1>Create Blog Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-9">
                  <div className="col-12">
                    <InputComponent name="title" label='Title' value={title} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <InputComponent name="photo" type='file' label='Photo' accept="image/*" value={photo} onChange={handleChangePhoto} />
                  </div>
                  <div className="col-12 mt-20">
                    <label htmlFor="">Description</label>
                    <ReactQuillComponent quillContent={quillContent} setQuillContent={setQuillContent}/>
                  </div>
                  <div className="col-12">
                    <div className={`mt-20 ${css.blog_form_btn}`}>
                      <ButtonComponent type='submit'>Publish</ButtonComponent>
                    </div>
                  </div>
                </div>
            
                <div className="col-3 ">
                  <div className={css.blog_form_list}>
                    <h3>Categories</h3>
                    {categoryList?.items?.length > 0 &&
                      categoryList?.items.map((category: any, index: any) => (
                        <div key={index} className={css.blog_form_list_inputs}>
                          <label htmlFor="">{category.name}</label>
                          <div className={css.blog_form_list_input}>
                            <InputComponent name="categories" type='checkbox' value={category.id}  onChange={(e: any) => handleToggle(e, category.id)} />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className={css.blog_form_list}>
                    <h3>Tags</h3>
                    {tagList?.length > 0 &&
                      tagList?.map((tag: any, index: any) => (
                        <div key={index} className={css.blog_form_list_inputs}>
                          <label htmlFor="">{tag.name}</label>
                          <div className={css.blog_form_list_input}>
                            <InputComponent name="tags" type='checkbox' onChange={(e: any) => handleToggle(e, tag.id)} />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogComponent