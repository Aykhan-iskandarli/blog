import BannerComponent from 'components/banner/banner.component';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { API } from 'src/core/layouts/public/configs/api.config';
import { getBlogDetailData } from 'store/blog/store/action';
import css from "./blog-detail.module.scss"
import Skeleton from 'react-loading-skeleton'
import {AiOutlineEye} from "react-icons/ai"
import 'react-loading-skeleton/dist/skeleton.css'
import TagsAndCategoryComponent from 'components/tags-and-category/tags-and-category';
const BlogDetail = () => {
    const dispatch: any = useDispatch()
    const blog: any = useSelector((state: any) => state.blogState?.blogDetail);
    console.log(blog, "bbb")
    const { asPath } = useRouter()
    const slug = asPath.split("/")[2]
    useEffect(() => {
        dispatch(getBlogDetailData(slug))
    }, [asPath])

    return (
        <div className={css.blog_detail}>
            <BannerComponent title="Single Blog Post" current="Blog" />
            <div className="container">
                <div className="row justify-center">
                    <div className="col-9">
                    {
                        blog?.slug ?
                            <div className={css.blog_detail_card}>
                                <div className={css.blog_detail_card_img}>
                                    {
                                       blog?.slug && <Image className={css.image} src={` ${API?.blogPhoto}/${blog && blog?.slug}`} alt="" layout='fill' />
                                    }
                                </div>
                                <div className={css.blog_detail_card_content}>
                                    <div className={css.blog_detail_card_content_title}>
                                     <div className="col-10">
                                     <h2>{blog?.mtitle}</h2>
                                     </div>
                                        <span><AiOutlineEye/> View count: {blog?.viewCount}</span>
                                    </div>
                                    <div className={css.blog_detail_card_content_date}>
                                        <span>{moment(blog.createdAt).format("MM.DD.YYYY")}</span>
                                    </div>
                                    <div className={css.blog_detail_card_content_desc}>
                                        <span dangerouslySetInnerHTML={{ __html: blog.body }}></span>
                                    </div>
                                </div>
                            </div> : <div className={css.blog_detail_skeleton_container}>
                                <Skeleton count={1} height={500} className={css.blog_detail_skeleton} />
                            </div>
                    }
                    </div>
                    <div className="col-3">
                        <div className={css.blog_detail_categories}>
                            <div className={css.blog_detail_categories_title}>
                                <h3>Categories</h3>
                            </div>
                            <TagsAndCategoryComponent data={blog?.categories} />
                        </div>
                        <div className={css.blog_detail_tags}>
                            <div className={css.blog_detail_tags_title}>
                                <h3>Tags</h3>
                            </div>
                            <TagsAndCategoryComponent data={blog?.tags} tag/>
                        </div>
                    </div>
   
                </div>
            </div>
        </div>
    )
}



export default BlogDetail