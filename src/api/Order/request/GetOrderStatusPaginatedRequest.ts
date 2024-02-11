import { PaginateRequest } from '~/common/types'
import { OrderStatus } from '~/orders/types'

export interface GetOrderStatusPaginatedRequest extends PaginateRequest {
  status: OrderStatus
}
