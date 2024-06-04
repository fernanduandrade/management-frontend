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

  async create(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}products`
    const reponse = await apiService.post<PostProductRequest, IResponseDTO<ProductDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  async update(payload: unknown): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}products`
    const reponse = await apiService.put<unknown, IResponseDTO<ProductDTO>>(url, payload)
    const result = reponse.get()
    return result
  }

  async delete(id: string): Promise<void> {
    const url = `${this.uri}products/${id}`
    await apiService.delete(url)
  }

  async getById(id: string): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}products/${id}`
    const reponse = await apiService.get<IResponseDTO<ProductDTO>>(url)
    const result = reponse.get()
    return result
  }

  async getPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse> {
    const url = `${this.uri}Products?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const reponse = await apiService.get<GetProductPaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async getAutoComplete(search: string): Promise<GetProductAutoCompleteResponse> {
    const url = `${this.uri}Products/AutoComplete?search=${search}`
    const reponse = await apiService.get<GetProductAutoCompleteResponse>(url)
    const result = reponse.get()
    return result
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}products/bulk`
    await apiService.delete(url, ids)
  }
}

export default new ProductApi()
