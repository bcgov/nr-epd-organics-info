import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { isTest } from '@/constants/env'

class APIService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.client.interceptors.response.use(
      (config) => {
        if (!isTest) {
          console.info(`received response status: ${config.status}`)
        }
        return config
      },
      (error) => {
        if (!isTest) {
          console.error(error)
        }
      },
    )
    // console.info(env.VITE_AMS_URL)
  }

  public getAxiosInstance(): AxiosInstance {
    return this.client
  }
}

export default new APIService()
