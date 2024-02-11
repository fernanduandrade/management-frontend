import { PaginationResponse } from '~/common/types/index'
import { ProductDTO } from '~/products/types/index'

export type GetProductPaginateResponse = PaginationResponse<ProductDTO>
