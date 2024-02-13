export type CreateProductDTO = {
  description: string
  name: string
  price: number
  quantity: number
}

export type ProductDTO = {
  id: string
  description: string
  name: string
  price: number
  quantity: number
  isAvaliable: boolean
}
