import { combineReducers } from 'redux';
import { publicReducer } from 'src/core/layouts/public/store/reducer';
import { CategoryReducer } from 'store/category/store/reducer';

export const rootReducer = combineReducers({
    publicState:publicReducer,
    category:CategoryReducer
})
