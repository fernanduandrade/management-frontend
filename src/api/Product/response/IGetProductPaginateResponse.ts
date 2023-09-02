export type Product = {
  id: number
  description: string
  name: string
  price: number
  quantity: number
  isAvaliable: boolean
}

export interface IGetProductPaginateResponse {
  message: string
  data: {
    items: Product[]
    pageNumber: number
    totalPages: number
    totalCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
  errors: string[]
  type: string
}
