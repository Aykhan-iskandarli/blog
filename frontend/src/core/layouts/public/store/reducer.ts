import { IPublicReduxState } from "../types/types";
import {
  AuthActionTypes,
  IActionCreator,
  publicConstants,
  toggleLoadingActions,
} from "./action-types";

const initialState: IPublicReduxState = {
  lang: "az",
  loading: false,
  error: [],
  user: [],
  auth:false
};

export const publicReducer = (state = initialState, action: IActionCreator) => {
  switch (action.type) {
      case toggleLoadingActions.TOGGLE_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
    case AuthActionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload,
        auth:true
      };
      case AuthActionTypes.SIGN_OUT:
        return {
          ...state,
          auth:false
        };
    default:
      return state;
  }
};
