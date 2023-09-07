import { GetSalesPaginate, PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO } from '~/common/types'
import { SaleDTO } from '~/sales/types'

export default interface ISaleApi {
  getSalesPaginate(query: GetSalesPaginate): Promise<GetSalePaginateResponse>
  createSale(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>>
  updateSale(): Promise<void>
  deleteSale(): Promise<void>
  getSaleById(): Promise<void>
}
