import apiService from '../api-service'
import ISaleApi from './ISaleApi'
import { GetSalesPaginate, PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO } from '~/common/types'
import { SaleDTO } from '~/sales/types'

class SaleApi implements ISaleApi {
  constructor() {}
  async getSalesPaginate(query: GetSalesPaginate): Promise<GetSalePaginateResponse> {
    const url = `http://localhost:5019/api/v1/sales?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetSalePaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async createSale(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>> {
    const url = 'http://localhost:5019/api/v1/sales'
    const reponse = await apiService.post<PostSaleRequest, IResponseDTO<SaleDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  updateSale(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteSale(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getSaleById(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default new SaleApi()
