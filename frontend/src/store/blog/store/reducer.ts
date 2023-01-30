import { IBlogReducerState } from "../types/blog";
import { BlogActionTypes } from "./action-types";


const initialState: IBlogReducerState = {
    blog: [],
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
        default:
            return state;
    }

}