import { IPublicReduxState } from "../types/types"
import { AuthActionTypes, IActionCreator, publicConstants } from "./action-types"

const initialState: IPublicReduxState = {
    lang: 'az',
    loading: false,
    error:[]
}

export const publicReducer = (state = initialState, action: IActionCreator) => {
    switch (action.type) {
        case publicConstants.LOADING:
            return {
                ...state,
                loading: action.payload
            }
            case AuthActionTypes.SIGN_IN_FAIL:
                console.log(action.payload,"payy")
                return {
                    ...state,
                    error: action.payload
                }
        default:
            return state;
    }
}
