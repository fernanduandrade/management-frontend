import apiService from '../api-service'
import ISaleApi from './ISaleApi'
import { PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { SaleDTO } from '~/sales/types'

class SaleApi implements ISaleApi {
  private uri

  constructor() {
    this.uri = import.meta.env.VITE_API
  }

  async getPaginate(query: PaginateRequest): Promise<GetSalePaginateResponse> {
    const url = `${this.uri}saleshistory?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetSalePaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async create(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}saleshistory`
    const reponse = await apiService.post<PostSaleRequest, IResponseDTO<SaleDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  async todaySales(): Promise<IResponseDTO<number>> {
    const url = `${this.uri}saleshistory/today`
    const reponse = await apiService.get<IResponseDTO<number>>(url)
    const result = reponse.get()
    return result
  }

  async monthSales(): Promise<IResponseDTO<number>> {
    const url = `${this.uri}saleshistory/month`
    const reponse = await apiService.get<IResponseDTO<number>>(url)
    const result = reponse.get()
    return result
  }

  async update(payload: unknown): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}saleshistory`
    const reponse = await apiService.put<unknown, IResponseDTO<SaleDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  async getById(id: string): Promise<IResponseDTO<SaleDTO>> {
    const url = `${this.uri}saleshistory/${id}`
    const reponse = await apiService.get<IResponseDTO<SaleDTO>>(url)
    const result = reponse.get()
    return result
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}saleshistory/bulk`
    await apiService.delete(url, ids)
  }
}

export default new SaleApi()
