export enum ResultType {
  none = 'None',
  success = 'Success',
  error = 'Error',
  warning = 'Warning'
}

export interface IResponseDTO<T> {
  data: T
  errors?: string[]
  type: ResultType
  message: string
}
