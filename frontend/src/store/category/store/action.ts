import { Dispatch } from "react";
import { IActionCreator } from "src/root store/types/store.types";
import { container } from "tsyringe";
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
  
  export const getCategory = () => (
    (dispatch: Dispatch<IActionCreator>) => {
      dispatch(getCategoryStart())
      return service.getCategoryData().then(res => {
        dispatch(getCategorySuccess(res.data.data))
      }).catch(err => {
        dispatch(getCategoryFail(err))
      })
    }
  )
  