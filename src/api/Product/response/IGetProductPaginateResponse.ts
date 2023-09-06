import { IPaginationResponse } from '~/common/types/index'
import { ProductDTO } from '~/products/types/index'

export type GetProductPaginateResponse = IPaginationResponse<ProductDTO>
