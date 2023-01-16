export interface ICategory {
    name: string,
    id: number | string
}

export interface CategoryReducerState{
    category:[],
    error:[]
}