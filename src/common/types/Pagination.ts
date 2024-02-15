
export type PaginateRequest = {
  pageSize: number
  pageNumber: number
}

export interface Paginate<T> {
  items: T[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type PaginationResponse<T> = {
  message: string
  data: Paginate<T>
  errors?: string[]
  type: string
}
