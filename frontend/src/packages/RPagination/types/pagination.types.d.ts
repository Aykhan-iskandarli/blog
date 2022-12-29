export interface IPageParams {
    PageNumber?: number,
    PageSize?: number
}


export interface IPagination {
    changeCount: Function;
    totalPages: number;
    totalCount?: number;
    pageIndex: number;
    prev: boolean;
    next: boolean;
    PageSize?: any;
  }
  