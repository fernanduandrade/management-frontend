type OrderStatus = 'ABERTO' | 'ANDAMENTO' | 'FECHADO'

export type Order = {
  status: OrderStatus
  clientName: string
  total: number
}
