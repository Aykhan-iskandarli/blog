import { IBlogReducerState } from "../types/blog";
import { BlogActionTypes } from "./action-types";


const initialState: IBlogReducerState = {
    blog: [],
    blogDetail: [],
    blogById: [],
    error: []
}

export const BlogReducerState = (state = initialState, action: any) => {
    switch (action.type) {
        case BlogActionTypes.GET_BLOG_START:
            return {
                ...state,
            }
        case BlogActionTypes.GET_BLOG_SUCCESS:
            return {
                ...state,
                blog: action.payload
            }
        case BlogActionTypes.GET_BLOG_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case BlogActionTypes.GET_BLOG_DETAIL_START:
            return {
                ...state,
            }
        case BlogActionTypes.GET_BLOG_DETAIL_SUCCESS:
            return {
                ...state,
                blogDetail: action.payload
            }
        case BlogActionTypes.GET_BLOG_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case BlogActionTypes.GET_BLOG_BY_ID_START:
            return {
                ...state,
            }

        case BlogActionTypes.GET_BLOG_BY_ID_SUCCESS:
            return {
                ...state,
                blogById: action.payload
            }
        case BlogActionTypes.GET_BLOG_BY_ID_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}