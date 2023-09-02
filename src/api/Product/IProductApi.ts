import { IProductGetPaginate } from './request/IGetProductPaginate'
import { IGetProductPaginateResponse } from './response/IGetProductPaginateResponse'

export default interface IProductApi {
  getProductSPaginate(query: IProductGetPaginate): Promise<IGetProductPaginateResponse>
}
