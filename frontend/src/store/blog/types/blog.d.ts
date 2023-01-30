export interface IBlog {
    title: string | undefined,
    _id: number | string | undefined
    tags: ICatAndTag[]
    categories: ICatAndTag[]
    slug:string | undefined,
    postedBy:object | undefined | null ,
    createdAt:string | undefined,
    updatedAt:string | undefined,
    body:string | undefined,
}

export interface ICatAndTag {
    _id: number | string | undefined 
    name:string | undefined
    slug:string | undefined
}



export interface CategoryAndTagReducerState{
    category:[],
    error:[],
    tags:[]
}

export interface IBlogReducerState{
    blog:[],
    error:[],
}
