import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteBlogData, getBlogData } from 'store/blog/store/action'
import css from "./blog.module.scss"
import moment from "moment"
import Image from 'next/image'
import { API } from 'src/core/layouts/public/configs/api.config'
import { debounce, generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions'
import {BsChevronLeft, BsChevronRight,} from "react-icons/bs"
import ButtonComponent from 'packages/RButton/button.component'
import  Router  from 'next/router'
import InputComponent from 'packages/RInput/input.component'
import useDebounce from 'HOC/debounce/debounce'

const BlogComponent = () => {
  const dispatch: any = useDispatch()
  const blog: any = useSelector((state: any) => state.blogState?.blog);
  const [pageParams, setPageParams] = useState({
    pageNumber: 1,
    pageSize: 3
  })
  const [search,setSearch] = useState<any>()


console.log(blog?.items,"blog")
const handleChange = debounce((e: any) => { 
  setSearch(e.target.value.toLocaleLowerCase('en-En'))
  setPageParams({
    pageNumber:1,
    pageSize:3
  })
},500);
  let paginate = blog?.page


  useEffect(() => {
    let param = {
      pageNumber:pageParams.pageNumber,
      pageSize:pageParams.pageSize,
      search
    }
    dispatch(getBlogData(param))
  }, [dispatch,pageParams,search])

  const handlePageClick = (e: any) => {
    const selectPage = e.selected + 1
    setPageParams((prev:any)=>{
      return {
        ...prev,
        pageNumber: selectPage,
      }
    })
  };

  const handleClick = (slug:any) =>{
    Router.push(`http://localhost:8080/get-blog/${slug}`)
  }

  const handleEdit = (slug:any) =>{
    Router.push(`http://localhost:8080/admin/crud/blog/${slug}`)
  }

  const handleDelete = (slug:any) =>{
    try{
       dispatch(deleteBlogData(slug))
            dispatch(getBlogData({}))
    }catch(error){
      console.log("error",error)
    }
  
  }

useEffect(()=>{
  
},[API.blogPhoto])


  return (
    <div className={css.blog_section}>
      <div className="container">
        <div className="row">
          <div className={css.blog_container}>
            <div className={css.blog_container_title}>
              <h1> ALL BLOG</h1>
            </div>
            <div className={css.blog_container_search}>
                <InputComponent name="search" value={search} placeholder="Search..." onChange={(e:any)=>handleChange(e)}/>
            </div>
            {blog && blog?.items?.length > 0 ?
              blog?.items.map((item: any) => (
                <div key={generateGuid()} className={css.blog_container_card}>
                    <div className={css.blog_container_card_content_img}>
                       {/* {
                        item.slug && 
                         <Image className={css.image} src={`${API.blogPhoto}/${item.slug}`} alt=""  layout='fill' />
                       } */}
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
                            <span key={generateGuid()}>{tag.tagName}</span>
                          ))
                        }
                      </div>
                    </div>
                    <div className={`${css.blog_container_card_content_cats} col-6`}>
                      <p>Categories</p>
                   <div className={css.blog_container_card_content_cats_cat}>
                   {
                        item?.categories?.map((cat:any)=>(
                          <span key={generateGuid()}>{cat.categoriesName}</span>
                        ))
                      }
                   </div>
                    </div>
                 </div>
                    <div className={css.blog_container_card_content_title}>
                      <h2>{item.title}</h2>
                    </div>
                    <div className={css.blog_container_card_content_desc}>
                      <span dangerouslySetInnerHTML={{ __html: item && item?.excerpt }}></span>
                      <div className={'mt-20'}>
                      <ButtonComponent click={()=>handleClick(item.slug)}>Read More</ButtonComponent>
                      </div>
                    </div>
                    <div className={'d-flex justify-end'}>
                      <ButtonComponent className={"mr-14"} click={()=>handleEdit(item.slug)}>Edit</ButtonComponent>
                      <ButtonComponent className={css.blog_container_btn_delete} click={()=>handleDelete(item.slug)}>Delete</ButtonComponent>

                      </div>
                  </div>
                </div>
              )):<h1>Blog not Found</h1>
            }
          </div>
        </div>
        {
        blog?.items && paginate && paginate?.totalPages>1 && 
        <div className='react-paginate mt-40 d-flex align-center justify-between'>
          <div className='react-paginate-page'>
            <span>
               <b>{paginate?.pageIndex}</b> / {paginate?.totalPages} page 
            </span>
          </div>
          <ReactPaginate
            nextLabel={<BsChevronRight/>}
            previousLabel={<BsChevronLeft />}
            breakLabel='...'
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            pageCount={paginate?.totalPages}
            forcePage={pageParams.pageNumber - 1}
            pageRangeDisplayed={3}
            containerClassName={'react-paginate_pagination d-flex'}
            pageClassName={'react-paginate_pagination__btn'}
            nextClassName={'react-paginate_pagination__btn pagination__btn--arrow'}
            previousClassName={'react-paginate_pagination__btn pagination__btn--arrow'}
            activeClassName={'react-paginate_pagination__btn--active'}
            breakClassName={'react-paginate_pagination__btn pagination__btn--break'}
          />
        </div>
      }
      </div>
  
     
    </div>
  )
}

// BlogComponent.getInitialProps = (pageParams:any) =>{
//   return getBlogData(pageParams).then((data: any)=>{
//     if(data.error){
//       console.log(data.error)
//     }
//     else{
//       return {
//         Blogs:data.blogs
//       }
//     }
//   })
// }


export default BlogComponent