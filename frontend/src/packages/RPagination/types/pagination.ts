export interface IPagination {
  changeCount: Function;
  totalPages: number;
  totalCount?: number;
  pageIndex: number;
  prev: boolean;
  next: boolean;
  PageSize?:any
}
