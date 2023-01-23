import { Dispatch } from "react";
import { successToast } from "src/core/shared/toast/toast";
import { IActionCreator } from "src/root store/types/store.types";
import { container } from "tsyringe";
import { CategoryModel } from "../models/category.model";
import { CategoryServices } from "../service/category.service";
import { CategoryActionTypes } from "./action-types";




const service = container.resolve(CategoryServices)

export const getCategoryStart = (): any => (
    {
      type: CategoryActionTypes.GET_CATEGORY_START
    }
  )
  
  export const getCategoryFail = (err: any): any => (
    {
      type: CategoryActionTypes.GET_CATEGORY_FAIL,
      payload: err
    }
  )
  
  export const getCategorySuccess = (data: any): any => (
    {
      type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
      payload: data
    }
  )
  
  export const getCategory = (param:any) => (
    (dispatch: Dispatch<IActionCreator>) => {
      dispatch(getCategoryStart())
      return service.getCategoryData(param).then(res => {
        const items =  res.data.data.map((item:any)=>{
        return new CategoryModel(item)
        })
        return {
          items,
          page:{
            pageSize:res.data.page.pageSize,
            pageIndex:res.data.page.pageIndex,
            totalCount:res.data.page.totalCount,
            next:res.data.page.next,
            prev:res.data.page.previous,
          }
         }
    })
        .then((res:any) => {
          dispatch(getCategorySuccess(res))
      })
      .catch(err => {
        dispatch(getCategoryFail(err))
      })
    }
  )

  export const  postCategoryData = (data:any) => (
    (dispatch: Dispatch<IActionCreator>) => {
      return service.postCategoryData(data)
        .then((res) => {
          successToast('Uğurla dəyişdirildi');
          return Promise.resolve(res.data);
        }).catch(err => {
          return Promise.reject(err);
        })
    }
  )

  
  export const  deleteCategoryData = (id:string) => (
    (dispatch: Dispatch<IActionCreator>) => {
      return service.deleteCategoryDatas(id)
        .then((res) => {
          successToast('Uğurla silindi');
          return Promise.resolve(res.data);
        }).catch(err => {
          console.log(err,"err")
          return Promise.reject(err);
        })
    }
  )
  