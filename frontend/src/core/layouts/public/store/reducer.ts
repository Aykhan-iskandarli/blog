import { IPublicReduxState } from "../types/types";
import {
  AuthActionTypes,
  IActionCreator,
  publicConstants,
} from "./action-types";

const initialState: IPublicReduxState = {
  lang: "az",
  loading: false,
  error: [],
  user: [],
};

export const publicReducer = (state = initialState, action: IActionCreator) => {
  switch (action.type) {
    case publicConstants.LOADING:
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
      };
    default:
      return state;
  }
};
