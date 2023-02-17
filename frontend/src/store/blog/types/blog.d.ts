export interface IBlog {
    title: string | undefined,
    _id: number | string | undefined
    viewCount?: number | undefined
    tags: ICatAndTag[]
    categories: ICatAndTag[]
    slug:string | undefined,
    postedBy:object | undefined | null ,
    createdAt:string | undefined,
    updatedAt:string | undefined,
    body:string | undefined,
    excerpt:string | undefined,
    mtitle?:string | undefined
    mdesc?:string | undefined
    photo?:string | undefined
}

export interface IBlogById {
    _id: number | string | undefined 
    body:string | undefined
    title:string | undefined
    categories:ICatAndTag[]
    tags:ICatAndTag[]
}



export interface ICatAndTag {
    _id: number | string | undefined 
    name:string | undefined
    slug?:string | undefined
}



export interface CategoryAndTagReducerState{
    category:[],
    error:[],
    tags:[]
}

export interface IBlogReducerState{
    blog:[],
    blogDetail:[]
    blogById: [],
    error:[],
}


