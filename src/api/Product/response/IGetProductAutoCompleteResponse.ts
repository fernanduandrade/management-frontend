import { IResponseDTO } from '~/common/types'
import { ProductDTO } from '~/products/types'

export type GetProductAutoCompleteResponse = IResponseDTO<ProductDTO[]>
