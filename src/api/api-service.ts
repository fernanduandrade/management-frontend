
import { Either, DataError } from '~/common/domain/'

export default {
  statusCode: 0,
  async get<TResult>(route: string): Promise<Either<DataError, TResult>> {
    try {
      const response = await fetch(route, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.statusCode = response.status
      const result = await response.json()
      return Either.right(result)
    }
    catch (error: any) {
      return Either.left({ kind: 'UnexpectedError', error })
    }
  },
  async delete<TResult>(route: string): Promise<Either<DataError, TResult>> {
    try {
      const response = await fetch(route, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.statusCode = response.status
      const result = await response.json()
      return Either.right(result)
    }
    catch (error: any) {
      return Either.left({ kind: 'UnexpectedError', error })
    }
  },
  async post<TRequest, TResult>(route: string, payload: TRequest): Promise<Either<DataError, TResult>> {
    try {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      this.statusCode = response.status
      return Either.right(result)
    }
    catch (error: any) {
      return Either.left({ kind: 'UnexpectedError', error })
    }
  },
}
