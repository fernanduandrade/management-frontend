import { PostProductRequest } from './request'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

export default interface IProductApi {
  getProductsPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse>
  createProduct(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>>
  updateProduct(): Promise<void>
  deleteProduct(): Promise<void>
  getProductById(): Promise<void>
}
