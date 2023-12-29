export interface PaginacionResponse<T> {
  data: T[];
  totalData: number;
  itemsPerPage: number;
  page: number;
  numberOfPages: number;
}
