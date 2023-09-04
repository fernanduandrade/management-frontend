export type IPaginationResponse<T> = {
  message: string
  data: {
    items: T[]
    pageNumber: number
    totalPages: number
    totalCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
  errors?: string[]
  type: string
}
