import Router from "next/router";
import { Dispatch } from "react";
import { successToast } from "src/core/shared/toast/toast";
import { IActionCreator } from "src/root store/types/store.types";
import { container } from "tsyringe";
import { BlogModel } from "../models/blog.model";
import { BlogServices } from "../services/blog.service";
import { BlogActionTypes } from "./action-types";




const service = container.resolve(BlogServices)

export const getBlogStart = (): any => (
    {
      type: BlogActionTypes.GET_BLOG_START
    }
  )
  
  export const getBlogFail = (err: any): any => (
    {
      type: BlogActionTypes.GET_BLOG_FAIL,
      payload: err
    }
  )
  
  export const getBlogSuccess = (data: any): any => (
    {
      type: BlogActionTypes.GET_BLOG_SUCCESS,
      payload: data
    }
  )
  


  export const  postBlogData = (data:any) => (
    (dispatch: Dispatch<IActionCreator>) => {
      return service.postBlogData(data)
        .then((res) => {
          successToast('Uğurla yaradildi');
          Router.push("/get-blog");
          return Promise.resolve(res.data);
        }).catch(err => {
          return Promise.reject(err);
        })
    }
  )


  export const  getBlogData = (param:any) => (
    (dispatch: Dispatch<IActionCreator>) => {
      dispatch(getBlogStart())
      return service.getBlogData(param).then((res) => {
          const items = res.data.blog.map((item:any)=>{
            return new BlogModel(item)
          })
          return {
            items,
            page: {
              pageSize:res.data.page.pageSize,
              pageIndex:res.data.page.pageIndex,
              totalCount:res.data.page.totalCount,
              next:res.data.page.next,
              prev:res.data.page.previous,
            },
          }
        })
        .then((res:any) => {
          dispatch(getBlogSuccess(res))
      })
        .catch(err => {
          dispatch(getBlogFail(err))
        })
    }
  )


  // export const  getBlogPhoto = (slug:any) => (
  //   (dispatch: Dispatch<IActionCreator>) => {
  //     dispatch(getBlogStart())
  //     return service.getBlogPhoto(slug)
  //       .then((res) => {
  //         console.log(res.data,"data")

  //       })
  //       .then((res:any) => {
  //         dispatch(getBlogSuccess(res))
  //     })
  //       .catch(err => {
  //         dispatch(getBlogFail(err))
  //       })
  //   }
  // )
