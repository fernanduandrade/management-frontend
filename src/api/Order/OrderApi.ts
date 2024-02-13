import apiService from '../api-service'
import { AddOrderRequest } from './request/AddOrderRequest'
import { AddProductToOrderRequest } from './request/AddProductToOrder'
import { GetOrderStatusPaginatedRequest } from './request/GetOrderStatusPaginatedRequest'
import { GetOrderPaginateResponse } from './response/GetOrderPaginatedResponse'
import { OrderDto } from '~/orders/types'
import { IResponseDTO } from '~/common/types'

class OrderApi {
  constructor() {}
  async getOrderStatusPaginated(query: GetOrderStatusPaginatedRequest): Promise<GetOrderPaginateResponse> {
    const url = `http://localhost:5019/api/v1/orders/status?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}&Status=${query.status}`
    const reponse = await apiService.get<GetOrderPaginateResponse>(url)
    const result = reponse.get()
    return result
  }

  async addOrder(payload: AddOrderRequest): Promise<IResponseDTO<any>> {
    const url = 'http://localhost:5019/api/v1/orders'
    const reponse = await apiService.post<AddOrderRequest, IResponseDTO<any>>(url, payload)
    const result = reponse.get()
    return result
  }

  async addProductToOrder(payload: AddProductToOrderRequest): Promise<IResponseDTO<any>> {
    const url = 'http://localhost:5019/api/v1/orders/add-product'
    const reponse = await apiService.post<AddProductToOrderRequest, IResponseDTO<any>>(url, payload)
    const result = reponse.get()
    return result
  }

  async getById(query: string): Promise<IResponseDTO<OrderDto>> {
    const url = `http://localhost:5019/api/v1/orders/${query}`
    const reponse = await apiService.get<IResponseDTO<OrderDto>>(url)
    const result = reponse.get()
    return result
  }
}

export default new OrderApi()
