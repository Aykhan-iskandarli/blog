export interface IDropdown {
    id: string | number,
    name: string | null,
    shortName?: string
}

export interface IPublicReduxState {
    lang: string,
    loading: boolean,
    error:[],
    user:[],
    auth:boolean
}
