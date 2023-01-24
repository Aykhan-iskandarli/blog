export interface ICategoryAndTag {
    name: string,
    _id: number | string | undefined
    slug:string | undefined,
    createdAt:string | undefined,
    updatedAt:string | undefined,
}

export interface CategoryAndTagReducerState{
    category:[],
    error:[],
    tags:[]
}