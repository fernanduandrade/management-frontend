import { ProductDTO } from '~/products/types'

export type OrderStatus = 'ABERTO' | 'AGUARDANDO' | 'FECHADO' | 'TODOS'

export type Order = {
  status: OrderStatus
  clientName: string
  id: string
}

export type OrderDto = {
  id: string
  status: OrderStatus
  clientName: string
  products: ProductDTO[]
}

export type OrderProductDto = {
  id: string
  orderId: string
  productId: string
  quantity: number
}
