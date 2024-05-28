export type SaleDTO = {
  id: number
  saleDate: string
  clientName: string
  productId: string
  quantity: number
  pricePerUnit: number
  totalPrice?: number
}

export type CreateSaleDTO = Omit<SaleDTO, 'id'>

export type PaymentType = 'PIX' | 'DINHEIRO' | 'CARTAO' | 'CANCELAR'
