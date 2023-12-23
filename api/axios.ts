import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { getCurrentUser } from '../src/auth/auth'

const { expoConfig } = Constants

let baseURL =
  expoConfig?.extra?.BACKEND_ENV === 'PROD'
    ? expoConfig.extra?.BACKEND_URI
    : `http://192.168.8.112:8080`

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

    const userId = await AsyncStorage.getItem('userData')

    const currentUser = getCurrentUser()

    if (currentUser?.uid) config.headers.userId = currentUser.uid
    if (userId && !config.headers.userId) config.headers.userId = userId

    return config
  },
  (error) => {
    console.log('error happened')
    // Do something with request error
    return Promise.reject(error)
  }
)
