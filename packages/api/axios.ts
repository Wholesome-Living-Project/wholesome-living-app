import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = 'http://192.168.8.109:8080'

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': '*/*' },
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

    // TODO use firebase token as access token const accessToken = await auth().currentUser?.getIdToken();

    // if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config
  },
  (error) => {
    console.log('error happened')
    // Do something with request error
    return Promise.reject(error)
  }
)
