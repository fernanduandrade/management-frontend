import { PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { SaleDTO } from '~/sales/types'

export default interface ISaleApi {
  getSalesPaginate(query: PaginateRequest): Promise<GetSalePaginateResponse>
  createSale(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>>
  updateSale(): Promise<void>
  deleteSale(): Promise<void>
  getSaleById(): Promise<void>
}
