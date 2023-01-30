import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getBlogData } from 'store/blog/store/action'
import css from "./blog.module.scss"
import moment from "moment"

const BlogComponent = () => {
    const dispatch:any = useDispatch()
    const blog: any = useSelector((state: any) => state.blogState?.blog);
  console.log(blog,"blg")
    const [pageParams,setPageParams] = useState({
      pageNumber:1,
      pageSize:1
    })
  let paginate = blog?.page

    useEffect(()=>{
        dispatch(getBlogData({}))
    },[dispatch])

    
  const handlePageClick = (e:any) => {
    const selectPage = e.selected+1
    setPageParams({
     pageNumber:selectPage,
     pageSize:1
    })
   };
 

  return (
    <div className={css.blog_section}>
      <div className="container">
        <div className="row">
        <div className={css.blog_container}>
          {blog && blog?.items?.length>0 &&
            blog?.items.map((item:any)=>(
              <div className={css.blog_container_card}>
                  <div className={css.blog_container_card_content}>
                  <div className={css.blog_container_card_content_date}>
                    <span>{moment(item.createdAt).format("DD.MM.YYYY")}</span>
                  </div>
                  <div className={css.blog_container_card_content_title}>
                    <span>{item.title}</span>
                  </div>
                  <div className={css.blog_container_card_content_desc}>
                    <span>{item.body}</span>
                  </div>
                  </div>
              </div>
            ))
          }
        </div>
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

export default BlogComponent