import { Dispatch } from "react";
import { successToast } from "src/core/shared/toast/toast";
import { IActionCreator } from "src/root store/types/store.types";
import { container } from "tsyringe";
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
          console.log("yaradildi")
          return Promise.resolve(res.data);
        }).catch(err => {
          return Promise.reject(err);
        })
    }
  )

