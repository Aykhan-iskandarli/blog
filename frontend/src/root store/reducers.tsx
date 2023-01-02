import { combineReducers } from 'redux';
import { publicReducer } from 'src/core/layouts/public/store/reducer';

export const rootReducer = combineReducers({
    publicState:publicReducer
})
