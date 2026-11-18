import { isTest } from '@/constants/env'

class APIService {
  private readonly baseURL = '/api'

  public async get<T>(path: string): Promise<T> {
    const url = `${this.baseURL}${path.startsWith('/') ? path : `/${path}`}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!isTest) {
        console.info(`received response status: ${response.status}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return (await response.json()) as T
    } catch (error) {
      if (!isTest) {
        console.error(error)
      }
      throw error
    }
  }
}

export default new APIService()
