export interface ICategory {
    name: string,
    id: number | string
    slug:string | undefined,
    createdAt:string | undefined,
    updatedAt:string | undefined,
}

export interface CategoryReducerState{
    category:[],
    error:[]
}