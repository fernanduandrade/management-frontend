import { GetProductsPaginate } from './request/IGetProductPaginate'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'

export default interface IProductApi {
  getProductsPaginate(query: GetProductsPaginate): Promise<GetProductPaginateResponse>
  createProduct(): Promise<void>
  updateProduct(): Promise<void>
  deleteProduct(): Promise<void>
  getProductById(): Promise<void>
}
