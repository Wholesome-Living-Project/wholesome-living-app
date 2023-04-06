import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = 'http://172.20.10.3:8080'

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((requestConfig) => {
  console.info(
    'calling URL:',
    requestConfig.method,
    (requestConfig.baseURL ?? '') + (requestConfig.url ?? '')
  )

  if (requestConfig.headers === undefined) {
    requestConfig.headers = {}
  }

  requestConfig.headers['X-Platform'] = Platform.OS

  return requestConfig
})

axiosInstance.interceptors.request.use(
  async (config) => {
    // check if config.headers undefined -> config cannot be undefined / config.header can be undefined
    if (config.headers === undefined) {
      config.headers = {}
    }

    // TODO use firebase token as access tokenconst accessToken = await auth().currentUser?.getIdToken();

    // if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
