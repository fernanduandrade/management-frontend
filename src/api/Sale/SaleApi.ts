import { PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { SaleDTO } from '~/sales/types'

class SaleApi {
  private uri

  constructor() {
    this.uri = `${import.meta.env.VITE_API}saleshistory`
  }

  async getPaginate(query: PaginateRequest): Promise<GetSalePaginateResponse> {
    const url = `${this.uri}?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const { data, fetchData } = useFetch<GetSalePaginateResponse>(url)
    await fetchData()

    return data.value
  }

  async create(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<SaleDTO>>(url, { method: 'POST', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async todaySales(): Promise<IResponseDTO<number>> {
    const url = `${this.uri}/today`
    const { data, fetchData } = useFetch<IResponseDTO<number>>(url)
    await fetchData()
    return data.value!
  }

  async monthSales(): Promise<IResponseDTO<number>> {
    const url = `${this.uri}/month`
    const { data, fetchData } = useFetch<IResponseDTO<number>>(url)
    await fetchData()
    return data.value!
  }

  async update(payload: unknown): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<SaleDTO>>(url, { method: 'PUT', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async getById(id: string): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}/${id}`
    const { data, fetchData } = useFetch<IResponseDTO<SaleDTO>>(url)
    await fetchData()
    return data.value!
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}/bulk`
    const { fetchData } = useFetch(url, { method: 'DELETE', body: JSON.stringify(ids) })
    await fetchData()
  }
}

export default new SaleApi()
