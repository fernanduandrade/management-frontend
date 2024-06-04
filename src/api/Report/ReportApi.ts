class ReportApi {
  private uri

  constructor() {
    this.uri = `${import.meta.env.VITE_API}reports`
  }

  async salesByDate(startDate: string, endDate: string) {
    const url = `${this.uri}/sales/periodic?startDate=${startDate}&endDate=${endDate}`

    return useFetch(url, { returnBlob: true })
  }

  async clientStatus() {
    const url = `${this.uri}/clients/status`

    return useFetch(url, { returnBlob: true })
  }

  async productList() {
    const url = `${this.uri}/products`

    return useFetch(url, { returnBlob: true })
  }
}

export default new ReportApi()
