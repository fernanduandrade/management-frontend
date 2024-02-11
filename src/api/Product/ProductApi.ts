import apiService from '../api-service'
import IProductApi from './IProductApi'
import { PostProductRequest } from './request'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { GetProductAutoCompleteResponse } from './response/IGetProductAutoCompleteResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

class ProductApi implements IProductApi {
  constructor() {}
  async createProduct(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>> {
    const url = 'http://localhost:5019/api/v1/products'
    const reponse = await apiService.post<PostProductRequest, IResponseDTO<ProductDTO>>(url, payload)
    const result = reponse.get()
    return result
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

  async getProductsPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse> {
    const url = `http://localhost:5019/api/v1/Products?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetProductPaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async getProductAutoComplete(search: string): Promise<GetProductAutoCompleteResponse> {
    const url = `http://localhost:5019/api/v1/Products/AutoComplete?search=${search}`
    const reponse = await apiService.get<GetProductAutoCompleteResponse>(url)
    const result = reponse.get()
    return result
  }
}

export default new ProductApi()
