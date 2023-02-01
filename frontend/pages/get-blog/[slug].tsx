import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getBlogDetailData } from 'store/blog/store/action'

const BlogDetailComponent = () => {
  const dispatch:any = useDispatch()
  const {asPath} = useRouter()

const slug = asPath.split("/")[2]
console.log(slug,"slug")
  useEffect(()=>{
     dispatch(getBlogDetailData(slug))
  },[asPath])
  return (
    <div>BlogDetailComponent</div>
  )
}

export default BlogDetailComponent