export interface IActionCreator {
    type : string,
    payload? : any
}
export interface IPublicReduxState {
    lang: string,
    loading: boolean
}



