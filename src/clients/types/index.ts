export type ClientDTO = {
  id: number
  name: string
  lastName: string
  isActive: boolean
  phone: string
  debt: number
  credit: number
}

export type CreateClientDTO = Omit<ClientDTO, 'id'>
