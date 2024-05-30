import { PostProductRequest } from './request'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

export default interface IProductApi {
  getProductsPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse>
  createProduct(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>>
  update(payload: unknown): Promise<IResponseDTO<ProductDTO>>
  deleteProduct(id: string): Promise<void>
  getProductById(id: string): Promise<IResponseDTO<ProductDTO>>
}
