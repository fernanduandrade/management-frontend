import apiService from '../apiService'
import IProductApi from './IProductApi'
import { IProductGetPaginate } from './request/IGetProductPaginate'
import { IGetProductPaginateResponse } from './response/IGetProductPaginateResponse'

class ProductApi implements IProductApi {
  constructor() {}
  async getProductSPaginate(query: IProductGetPaginate): Promise<IGetProductPaginateResponse> {
    const url = `http://localhost:5019/api/v1/Products?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<IGetProductPaginateResponse>(url)
    const result = reponse.get()
    return result
  }
}

export default new ProductApi()
