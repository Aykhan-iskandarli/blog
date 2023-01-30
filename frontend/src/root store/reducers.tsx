import { combineReducers } from 'redux';
import { publicReducer } from 'src/core/layouts/public/store/reducer';
import { BlogReducerState } from 'store/blog/store/reducer';
import { CategoryAndTagsReducerState } from 'store/category/store/reducer';

export const rootReducer = combineReducers({
    publicState:publicReducer,
    categoryAndTag:CategoryAndTagsReducerState,
    blogState:BlogReducerState
})
