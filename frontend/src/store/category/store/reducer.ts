import { CategoryReducerState } from "../types/category-types"
import { CategoryActionTypes } from "./action-types"

const initialState: CategoryReducerState = {
    category: [],
    error: []
}

export const CategoryReducer = (state = initialState, action: any) => {
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
        default:
            return state;
    }

}