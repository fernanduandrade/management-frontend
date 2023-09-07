type Pagination<T> = {
  items: T[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type PaginationResponse<T> = {
  message: string
  data: Pagination<T>
  errors?: string[]
  type: string
}

export type PaginateRequest = {
  pageSize: number
  pageNumber: number
}
