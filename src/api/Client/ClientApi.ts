import apiService from '../api-service'
import IClientApi from './IClientApi'
import { PostClientRequest } from './request'
import { GetClientPaginateResponse } from './response/IGetClientPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ClientDTO } from '~/clients/types'

class ClientApi implements IClientApi {
  private uri: string

  constructor() {
    this.uri = import.meta.env.VITE_API
  }

  async getClientsPaginate(query: PaginateRequest): Promise<GetClientPaginateResponse> {
    const url = `${this.uri}clients?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetClientPaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async createClient(payload: PostClientRequest): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}clients`
    const reponse = await apiService.post<PostClientRequest, IResponseDTO<ClientDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  updateClient(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteClient(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getClientById(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default new ClientApi()
