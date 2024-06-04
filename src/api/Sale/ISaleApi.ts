import { PostSaleRequest } from './request'
import { GetSalePaginateResponse } from './response/IGetSalePaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { SaleDTO } from '~/sales/types'

export default interface ISaleApi {
  getPaginate(query: PaginateRequest): Promise<GetSalePaginateResponse>
  create(payload: PostSaleRequest): Promise<IResponseDTO<SaleDTO>>
  update(payload: unknown): Promise<IResponseDTO<SaleDTO>>
  getById(id: string): Promise<IResponseDTO<SaleDTO>>
}
