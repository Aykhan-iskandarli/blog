import 'reflect-metadata';
import { Dispatch } from "react";
import { container } from "tsyringe";
import {AuthActionTypes, IActionCreator, publicConstants } from "./action-types";
import { langType } from '../../../../assets/db/db.service';
import { Auth } from '../services/public.service';
import jwt_decode from "jwt-decode";
import Router from 'next/router';

const auth:any = container.resolve(Auth);
export const loginSuccess = (user: any) => ({
    type: AuthActionTypes.SIGN_IN,
    payload: user
})
export const loginFail = (err:any) => ({
    type: AuthActionTypes.SIGN_IN_FAIL,
    payload:err
})

export const loading = (loading: boolean) => ({
    type: publicConstants.LOADING,
    payload: loading
})
export const localizationSucces = (localization: langType) => ({
    type: publicConstants.LOCALIZATION_TOGGLE,
    payload: localization
})
export const localizationToggle = (lang: langType) => (
    (dispatch: Dispatch<IActionCreator>) => {
        dispatch(localizationSucces(lang))
        window.location.reload()
    }
)

export const setUserData = (token: string) => (dispatch: any) => {
    try {
        const token_decode = jwt_decode(token)
        console.log(token_decode,"token_decode")
        dispatch(loginSuccess(token_decode))
    }
    catch (error) {
        console.error(error)
    }
}

export const logOut = () => (dispatch: any) => {
    dispatch({
        type: AuthActionTypes.SIGN_OUT
    })
    localStorage.removeItem('authToken')
    Router.push("/login")

}


export const register = (data: any) => (dispatch: any) => {
    dispatch(loading(true))
    auth.register(data).then((res: any) => {
        console.log(res,"Aaas")
        dispatch(loading(false))
        localStorage.setItem('authToken', res.data.token)
        dispatch(setUserData(res.data.token))
        Router.push("/")
    }).catch((err:any) => {
        dispatch(loading(false))
        dispatch(loginFail(err))
    })
}


export const login = (data: any) => (dispatch: any) => {
    dispatch(loading(true))
    auth.login(data).then((res: any) => {
        dispatch(loading(false))
        localStorage.setItem('authToken', res.data.token)
        dispatch(setUserData(res.data.token))
        Router.push("/")
    }).catch((err:any) => {
        dispatch(loading(false))
        dispatch(loginFail(err))
    })
}

