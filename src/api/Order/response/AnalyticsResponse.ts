import { IResponseDTO } from '~/common/types'

export interface AnalyticsDto {
  total: number
  open: number
  closed: number
}

export type AnalyticsResponse = IResponseDTO<AnalyticsDto>
