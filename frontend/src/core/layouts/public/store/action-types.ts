
export enum Public {
    GET_DROPDOWN_SUCCESS = "GET_DROPDOWN_SUCCESS",
}
export interface IActionCreator {
    type: string,
    payload?: any
}

export interface IPageParams {
    PageNumber?: number,
    PageSize?: number
}


export enum DropdownLang {
    GET_DROPDOWN_LANG_SUCCESS = "GET_DROPDOWN_LANG_SUCCESS",
    GET_DROPDOWN_LANG_ERROR = "GET_DROPDOWN_LANG_ERROR"
}

export enum LeftMenuActionTypes {
    TOGGLE_LEFT_MENU = 'TOGGLE-LEFT-MENU'
}
export enum publicConstants {
    LOCALIZATION_TOGGLE = 'LOCALIZATION_TOGGLE',
    LOADING = "LOADING",
    GET_DROPDOWN_SUCCESS = "GET_DROPDOWN_SUCCESS",
}

export enum AuthActionTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_IN_FAIL = 'SIGN_IN_FAIL',
    SIGN_OUT = 'SIGN_OUT',
    SET_CLAIMS = 'SET_CLAIMS',
}
