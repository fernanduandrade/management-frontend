import apiService from '../api-service'
export class BaseApi {
  private uri
  private resource

  constructor(resource: string) {
    this.uri = import.meta.env.VITE_API
    this.resource = resource
  }

  async delete(ids: string): Promise<void> {
    const url = `${this.uri}/${this.resource}/bulk`
    await apiService.delete(url, ids)
  }
}
