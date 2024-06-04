import { PostProductRequest } from './request'
import { GetProductAutoCompleteResponse } from './response/IGetProductAutoCompleteResponse'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

export default interface IProductApi {
  getPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse>
  create(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>>
  update(payload: unknown): Promise<IResponseDTO<ProductDTO>>
  delete(id: string): Promise<void>
  getById(id: string): Promise<IResponseDTO<ProductDTO>>
  getAutoComplete(search: string): Promise<GetProductAutoCompleteResponse>
}
