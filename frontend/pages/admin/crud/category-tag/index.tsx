import ButtonComponent from 'packages/RButton/button.component';
import InputComponent from 'packages/RInput/input.component';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { deleteCategoryData, getCategory, postCategoryData } from 'store/category/store/action'
import css from "./category-tag.module.scss"
import {FiDelete} from "react-icons/fi"
import ReactPaginate from 'react-paginate';

const CategoryAndTagComponent = () => {
  const categoryList: any = useSelector((state: any) => state.category?.category);
  const dispatch:any = useDispatch()
  const [inputValue,setInputValue] = useState({
    name:""
  })
  const [pageParams,setPageParams] = useState({
    pageNumber:1,
    pageSize:1
  })
let paginate = categoryList?.page

console.log(paginate)
  const {name} = inputValue

useEffect(()=>{
  dispatch(getCategory(pageParams))
},[pageParams])

const showCategories  = useCallback((category:any)=>{
  
const handleDelete = async(slug:any) =>{
   await dispatch(deleteCategoryData(slug))
   dispatch(getCategory(pageParams))
}
  return (
    <ul className={`row ${css.category_list}`}>
      {category && 
        category?.items?.length>0 ? category?.items?.map((cat:any,index:number)=>(
          <li key={index}>
            <div className={css.category_list_name}>
              <b> {cat?.name}</b>
            </div>
            <div className={css.category_list_delete}>
              <span onClick={() => handleDelete(cat.slug)}> <FiDelete /></span>
            </div>
          </li>
        )):<h1>Not found category list</h1>
      }
    </ul>
  )
},[dispatch,categoryList])

const handleChange = (e:any) =>{
  const {name,value} = e.target
  setInputValue({...inputValue,[name]:value})
}
const handleSubmit = async(e:any) =>{
  e.preventDefault()
  if(name !==""){
   await dispatch(postCategoryData(inputValue))
   dispatch(getCategory(pageParams))
  }
  setInputValue({
    name:""
  })
}
  const showCategoriesForm = useCallback(() => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
          <div className='col-3'>
          <InputComponent maxLength={15} onChange={handleChange} name="name" value={name}/>
          </div>
          <div>
            <ButtonComponent type='submit' size={"lg"} width={160}>Submit</ButtonComponent>
          </div>
          </div>
        </form>
      </div>
    )
  }, [inputValue])

  const handlePageClick = (e:any) => {
   const selectPage = e.selected+1
   setPageParams({
    pageNumber:selectPage,
    pageSize:1
   })
  };

  return (
    <div className={css.category}>
     <div className="container-fluid">
     <h1>Category list</h1>
      {showCategoriesForm()}
      <div className="col-3">
      {showCategories(categoryList)}
      </div>
     </div>
     <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={3}
        previousLabel="< previous"
      />
    </div>
  )
}

export default CategoryAndTagComponent