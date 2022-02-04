export interface PageInfo {
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}

export interface Paginated<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

export interface PaginationDetails {
  page: number;
  limit: number;
}
