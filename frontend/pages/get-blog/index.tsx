import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getBlogData } from 'store/blog/store/action'
import css from "./blog.module.scss"
import moment from "moment"
import Image from 'next/image'
import { API } from 'src/core/layouts/public/configs/api.config'
import { generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions'

const BlogComponent = () => {
  const dispatch: any = useDispatch()
  const blog: any = useSelector((state: any) => state.blogState?.blog);
  const [pageParams, setPageParams] = useState({
    pageNumber: 1,
    pageSize: 1
  })
  let paginate = blog?.page

  useEffect(() => {
    dispatch(getBlogData({}))
  }, [dispatch])


  const handlePageClick = (e: any) => {
    const selectPage = e.selected + 1
    setPageParams({
      pageNumber: selectPage,
      pageSize: 1
    })
  };
console.log(blog,"blog")

  return (
    <div className={css.blog_section}>
      <div className="container">
        <div className="row">
          <div className={css.blog_container}>
            <div className={css.blog_container_title}>
              <h1> ALL BLOG</h1>
            </div>
            {blog && blog?.items?.length > 0 &&
              blog?.items.map((item: any) => (
                <div key={generateGuid()} className={css.blog_container_card}>
                    <div className={css.blog_container_card_content_img}>
                        <Image className={css.image} src={`${API.blogPhoto}/${item.slug}`} alt="" objectFit='cover' quality={80} width={"1000"}
                          height={"450"}  />
                    </div>
                  <div className={css.blog_container_card_content}>
                    <div className='d-flex justify-between'>
                      <div className={css.blog_container_card_content_date}>
                        <span>Publish date </span> <span>{moment(item.createdAt).format("MM.DD.YYYY")}</span>
                      </div>
                      <div className={css.blog_container_card_content_author}>
                        <span>Written by {item?.postedBy.name} </span>
                      </div>
                    </div>
                 <div className="d-flex justify-between mt-15 mb-15">
                 <div className={`${css.blog_container_card_content_tags} col-6`}>
                      <p>Tags</p>
                      <div className={css.blog_container_card_content_tags_tag}>
                        {
                          item?.tags.map((tag: any) => (
                            <span>{tag.tagName}</span>
                          ))
                        }
                      </div>
                    </div>
                    <div className={`${css.blog_container_card_content_cats} col-6`}>
                      <p>Categories</p>
                   <div className={css.blog_container_card_content_cats_cat}>
                   {
                        item?.categories?.map((cat:any)=>(
                          <span>{cat.categoriesName}</span>
                        ))
                      }
                   </div>
                    </div>
                 </div>
                    <div className={css.blog_container_card_content_title}>
                      <h2>{item.title}</h2>
                    </div>
                    <div className={css.blog_container_card_content_desc}>
                      <span dangerouslySetInnerHTML={{ __html: item.body }}></span>
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