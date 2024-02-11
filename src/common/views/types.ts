export type OrderStatus = 'ABERTO' | 'AGUARDANDO' | 'FECHADO'

export type Order = {
  status: OrderStatus
  clientName: string
}

export type OrderDto = {
  id: string
  status: OrderStatus
  clientName: string
}
