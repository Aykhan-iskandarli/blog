import { CategoryAndTagReducerState } from "../types/category-types"
import { CategoryActionTypes, TagActionTypes } from "./action-types"

const initialState: CategoryAndTagReducerState = {
    category: [],
    tags: [],
    error: []
}

export const CategoryAndTagsReducerState = (state = initialState, action: any) => {
    switch (action.type) {
        case CategoryActionTypes.GET_CATEGORY_START:
            return {
                ...state,
            }
        case CategoryActionTypes.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            }
        case CategoryActionTypes.GET_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TagActionTypes.GET_TAG_START:
            return {
                ...state,
            }
        case TagActionTypes.GET_TAG_SUCCESS:
            return {
                ...state,
                tags: action.payload
            }
        case TagActionTypes.GET_TAG_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}