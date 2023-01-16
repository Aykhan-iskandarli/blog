import React, { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getCategory } from 'store/category/store/action'
import css from "./category-tag.module.scss"

const CategoryAndTagComponent = () => {
  const categoryList: any = useSelector((state: any) => state.category?.category);
  const dispatch:any = useDispatch()

useEffect(()=>{
  dispatch(getCategory())
},[])


const showCategories  = useCallback((category:any)=>{
  console.log(category,"cat")
  return (
    <div>
      {
        category && category?.map((cat:any,index:number)=>(
        <div key={index}>
            {cat?.name}
          </div>
        ))
      }
    </div>
  )
},[categoryList])

  
  return (
    <div className={css.category}>
      <h1>Category list</h1>
      {showCategories(categoryList)}
    </div>
  )
}

export default CategoryAndTagComponent