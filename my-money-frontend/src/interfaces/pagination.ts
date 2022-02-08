export interface PaginationProps {
  pageSize: number;
  setPageSize: Function;
  setFirstPage: Function;
  decreasePageByOne: Function;
  currentPage: number;
  lastPage: number;
  increasePageByOne: Function;
  setLastPage: Function;
  setLoadingToTrue: Function;
  updateData: Function;
};
