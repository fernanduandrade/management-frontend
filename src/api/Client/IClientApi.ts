import { PostClientRequest } from './request'
import { GetClientPaginateResponse } from './response/IGetClientPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ClientDTO } from '~/clients/types'

export default interface IProductApi {
  getClientsPaginate(query: PaginateRequest): Promise<GetClientPaginateResponse>
  createClient(payload: PostClientRequest): Promise<IResponseDTO<ClientDTO>>
  updateClient(): Promise<void>
  deleteClient(): Promise<void>
  getClientById(): Promise<void>
}
