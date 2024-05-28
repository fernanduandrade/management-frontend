import apiService from '../api-service'
import { PostClientRequest } from './request'
import { GetClientPaginateResponse } from './response/IGetClientPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ClientDTO } from '~/clients/types'

class ClientApi {
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

  async updateClient(payload: unknown): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}clients`
    const reponse = await apiService.put<unknown, IResponseDTO<ClientDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getById(id: string): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}clients/${id}`
    const reponse = await apiService.get<IResponseDTO<ClientDTO>>(url)
    const result = reponse.get()
    return result
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}clients/bulk`
    await apiService.delete(url, ids)
  }

  async updateBalance(payload: unknown): Promise<void> {
    const url = `${this.uri}clients/update-balance`
    await apiService.post(url, payload)
  }

  async updateStatus(payload: unknown): Promise<void> {
    const url = `${this.uri}clients/update-status`
    await apiService.post(url, payload)
  }
}

export default new ClientApi()
