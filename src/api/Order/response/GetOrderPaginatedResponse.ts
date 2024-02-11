import { PaginationResponse } from '~/common/types'
import { OrderDto } from '~/orders/types'

export type GetOrderPaginateResponse = PaginationResponse<OrderDto>
