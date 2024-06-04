import { AddOrderRequest } from './request/AddOrderRequest'
import { AddProductToOrderRequest } from './request/AddProductToOrder'
import { GetOrderStatusPaginatedRequest } from './request/GetOrderStatusPaginatedRequest'
import { GetOrderPaginateResponse } from './response/GetOrderPaginatedResponse'
import { AnalyticsDto } from './response/AnalyticsResponse'
import { OrderDto, OrderProductDto } from '~/orders/types'
import { IResponseDTO } from '~/common/types'
import { PaymentType } from '~/sales/types'

class OrderApi {
  private uri
  constructor() {
    this.uri = `${import.meta.env.VITE_API}orders`
  }

  async getOrderStatusPaginated(query: GetOrderStatusPaginatedRequest): Promise<GetOrderPaginateResponse> {
    const url = `${this.uri}/status?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}&Status=${query.status}`
    const { data, fetchData } = useFetch<GetOrderPaginateResponse>(url)
    await fetchData()
    return data.value!
  }

  async addOrder(payload: AddOrderRequest): Promise<IResponseDTO<OrderDto>> {
    const url = `${this.uri}`
    const { data, fetchData } = useFetch<IResponseDTO<OrderDto>>(url, { method: 'POST', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async addProductToOrder(payload: AddProductToOrderRequest): Promise<IResponseDTO<OrderProductDto>> {
    const url = `${this.uri}/products/add`
    const { data, fetchData } = useFetch<IResponseDTO<OrderProductDto>>(url, { method: 'POST', body: JSON.stringify(payload) })
    await fetchData()
    return data.value!
  }

  async getById(query: string): Promise<IResponseDTO<OrderDto>> {
    const url = `${this.uri}/${query}`
    const { data, fetchData } = useFetch<IResponseDTO<OrderDto>>(url)
    await fetchData()
    return data.value!
  }

  async removeProduct(productId: string, orderId: string): Promise<void> {
    const url = `${this.uri}/products/remove?orderId=${orderId}&productId=${productId}`
    const { fetchData } = useFetch(url, { method: 'DELETE' })
    await fetchData()
  }

  async closeOrder(id: string, paymentType: PaymentType): Promise<void> {
    const url = `${this.uri}/close?orderId=${id}&paymentType=${paymentType}`
    const { fetchData } = useFetch(url)
    await fetchData()
  }

  async analytics(): Promise<IResponseDTO<AnalyticsDto>> {
    const url = `${this.uri}/analytics`
    const { data, fetchData } = useFetch<IResponseDTO<AnalyticsDto>>(url)
    await fetchData()
    return data.value!
  }

  async deleteBulk(ids: unknown): Promise<void> {
    const url = `${this.uri}/bulk`
    const { fetchData } = useFetch(url, { method: 'DELETE', body: JSON.stringify(ids) })
    await fetchData()
  }
}

export default new OrderApi()
