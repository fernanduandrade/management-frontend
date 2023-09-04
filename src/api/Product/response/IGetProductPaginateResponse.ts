import { IPaginationResponse } from '~/common/types/index'

export type ProductDTO = {
  id: number
  description: string
  name: string
  price: number
  quantity: number
  isAvaliable: boolean
}

export type GetProductPaginateResponse = IPaginationResponse<ProductDTO>
