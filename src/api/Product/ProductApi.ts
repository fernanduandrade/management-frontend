import { PostProductRequest } from './request'
import { GetProductPaginateResponse } from './response/IGetProductPaginateResponse'
import { GetProductAutoCompleteResponse } from './response/IGetProductAutoCompleteResponse'
import { IResponseDTO, PaginateRequest } from '~/common/types'
import { ProductDTO } from '~/products/types'

class ProductApi {
  private uri

  constructor() {
    this.uri = `${import.meta.env.VITE_API}products`
  }

  async create(payload: PostProductRequest): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<ProductDTO>>(url, { method: 'POST', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async update(payload: unknown): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<ProductDTO>>(url, { method: 'PUT', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async delete(id: string): Promise<void> {
    const url = `${this.uri}/${id}`
    const { fetchData } = useFetch(url, { method: 'DELETE' })
    await fetchData()
  }

  async getById(id: string): Promise<IResponseDTO<ProductDTO>> {
    const url = `${this.uri}/${id}`
    const { data, fetchData } = useFetch<IResponseDTO<ProductDTO>>(url)
    await fetchData()
    return data.value!
  }

  async getPaginate(query: PaginateRequest): Promise<GetProductPaginateResponse> {
    const url = `${this.uri}?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    const { data, fetchData } = useFetch<GetProductPaginateResponse>(url)
    await fetchData()
    return data.value!
  }

  async getAutoComplete(search: string): Promise<GetProductAutoCompleteResponse> {
    const url = `${this.uri}/AutoComplete?search=${search}`
    const { data, fetchData } = useFetch<GetProductAutoCompleteResponse>(url)
    await fetchData()
    return data.value!
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}/bulk`
    const { fetchData } = useFetch(url, { method: 'DELETE', body: JSON.stringify(ids) })
    await fetchData()
  }
}

export default new ProductApi()
