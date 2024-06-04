import { PostClientRequest } from './request'
import { GetClientPaginateResponse } from './response/IGetClientPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ClientDTO } from '~/clients/types'

class ClientApi {
  private uri: string

  constructor() {
    this.uri = `${import.meta.env.VITE_API}clients`
  }

  async getPaginate(query: PaginateRequest): Promise<GetClientPaginateResponse> {
    const url = `${this.uri}?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const { data, fetchData } = useFetch<GetClientPaginateResponse>(url)
    await fetchData()
    return data.value!
  }

  async create(payload: PostClientRequest): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<ClientDTO>>(url, { method: 'POST', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async update(payload: unknown): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<ClientDTO>>(url, { method: 'PUT', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async getById(id: string): Promise<IResponseDTO<ClientDTO>> {
    const url = `${this.uri}/${id}`
    const { data, fetchData } = useFetch<IResponseDTO<ClientDTO>>(url)
    await fetchData()
    return data.value!
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}/bulk`
    const { fetchData } = useFetch(url, { method: 'DELETE', body: JSON.stringify(ids) })
    await fetchData()
  }

  async updateBalance(payload: unknown): Promise<void> {
    const url = `${this.uri}/balance`
    const { fetchData } = useFetch(url, { method: 'PATCH', body: JSON.stringify(payload) })
    await fetchData()
  }

  async updateStatus(payload: unknown): Promise<void> {
    const url = `${this.uri}/status`
    const { fetchData } = useFetch(url, { method: 'PATCH', body: JSON.stringify(payload) })
    await fetchData()
  }
}

export default new ClientApi()
