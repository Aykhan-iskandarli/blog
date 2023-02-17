import InputComponent from 'packages/RInput/input.component'
import React, { useEffect,  useState } from 'react'
import css from "./blog.module.scss"

import ButtonComponent from 'packages/RButton/button.component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategory, getTag } from 'store/category/store/action';
import { generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions';
import { getBlogById, putBlogData } from 'store/blog/store/action';
import ReactQuillComponent from './quill.editor';
import { useRouter } from 'next/router';
import { API } from 'src/core/layouts/public/configs/api.config';
import Image from 'next/image';

const EditComponent = () => {
  const categoryList: any = useSelector((state: any) => state.categoryAndTag?.category);
  const tagList: any = useSelector((state: any) => state.categoryAndTag?.tags);
  const blog: any = useSelector((state: any) => state.blogState && state.blogState?.blogById);
  const [inputForm, setInputForm] = useState<any>({
    title:"",
    photo:""
  })
  const [ image,setImage] = useState<any>()
  const [quillContent, setQuillContent] = useState<any>("")
  const [checkedCat, setCheckedCat] = useState<any>([blog && blog?.categories?.titleId ]); // categories
  const [checkedTag, setCheckedTag] = useState<any>([]); // tags

  const dispatch: any = useDispatch()
  const { title,photo } = inputForm

  const {asPath} = useRouter()

  const editSlug = asPath.split("/")[4]
console.log(blog,"bbbbs")
  useEffect(() => {
    dispatch(getCategory({}))
  }, [])

  useEffect(() => {
    dispatch(getBlogById(editSlug))
  }, [asPath])

  useEffect(() => {
    dispatch(getTag())
  }, [])

useEffect(()=>{
  if(categoryList){
    let checkedcat:any =[]
    blog && blog?.categories?.map((cat:any)=>(
      checkedcat.push(cat?.titleId)
    ))
    setCheckedCat(checkedcat)
  }
},[blog,categoryList])


useEffect(()=>{
  if(tagList){
    let checkedtag:any =[]
    blog && blog?.tags?.map((tag:any)=>(
      checkedtag.push(tag?.titleId)
    ))
    setCheckedTag(checkedtag)
  }
},[blog,tagList])

const findOutCategory = (c:any) => {
  const result = checkedCat.indexOf(c);
  if (result !== -1) {
      return true;
  } else {
      return false;
  }
};

const findOutTag = (t:any) => {
  const result = checkedTag.indexOf(t);
  if (result !== -1) {
      return true;
  } else {
      return false;
  }
};

useEffect(()=>{
  setInputForm({
    ...inputForm,
    title:blog && blog?.title,
    photo:blog && API.blogPhoto && editSlug && `${API.blogPhoto}/${blog && editSlug}`
  })
},[blog && blog,editSlug])


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
    // console.log(e.target.files[0],"file")
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
    console.log(image,"image submit")
    dispatch(putBlogData(formData,editSlug))
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
                    <InputComponent name="title" label='Title' value={inputForm?.title} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <InputComponent name="photo" type='file' label='Photo' accept="image/*" value={inputForm?.photo} onChange={handleChangePhoto} />
                    <div className={css.blog_form_image}>
                    {/* {
                     blog &&
                      <Image src={inputForm?.photo} alt="" layout='fill' />
                    } */}
                    </div>
                  </div>
                  <div className="col-12 mt-20">
                    <label htmlFor="">Description</label>
                    <ReactQuillComponent quillContent={quillContent} setQuillContent={setQuillContent} blog={blog && blog}/>
                  </div>
                  <div className="col-12">
                    <div className={`mt-20 ${css.blog_form_btn}`}>
                      <ButtonComponent type='submit'>Edit</ButtonComponent>
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
                            <InputComponent name="categories" type='checkbox'  checked={findOutCategory(category.id)}  onChange={(e: any) => handleToggle(e, category.id)} />
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
                            <InputComponent name="tags" type='checkbox' checked={findOutTag(tag.id)} onChange={(e: any) => handleToggle(e, tag.id)} />
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

export default EditComponent