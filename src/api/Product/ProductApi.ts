import apiService from '../api-service'
import IProductApi from './IProductApi'
import { GetProductsPaginate } from './request/IGetProductPaginate'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'

class ProductApi implements IProductApi {
  constructor() {}
  createProduct(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateProduct(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteProduct(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getProductById(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getProductsPaginate(query: GetProductsPaginate): Promise<GetProductPaginateResponse> {
    const url = `http://localhost:5019/api/v1/Products?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetProductPaginateResponse>(url)
    const result = reponse.get()
    return result
  }
}

export default new ProductApi()
