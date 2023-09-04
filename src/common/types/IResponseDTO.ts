export type IResponseDTO<T> = {
  data: T
  errors?: string[]
  type: string
  message: string
}
