import apiService from '../api-service'
import IProductApi from './IProductApi'
import { PostProductRequest } from './request'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { GetProductAutoCompleteResponse } from './response/IGetProductAutoCompleteResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

class ProductApi implements IProductApi {
  private uri

  constructor() {
    this.uri = import.meta.env.VITE_API
  }

  async createProduct(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}products`
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
    const url = `${this.uri}Products?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetProductPaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async getProductAutoComplete(search: string): Promise<GetProductAutoCompleteResponse> {
    const url = `${this.uri}Products/AutoComplete?search=${search}`
    const reponse = await apiService.get<GetProductAutoCompleteResponse>(url)
    const result = reponse.get()
    return result
  }
}

export default new ProductApi()
