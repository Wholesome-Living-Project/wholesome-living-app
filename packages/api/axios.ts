import { getCurrentUser } from 'app/auth/auth'
import axios from 'axios'
import { Platform } from 'react-native'
import Constants from "expo-constants";

const { manifest } = Constants;

const baseURL = `http://${manifest?.debuggerHost?.split(':').shift()}:8080`;
// const baseURL = 'http://192.168.1.142:8080'

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

    const currentUser = getCurrentUser()

    console.log(currentUser)
    // TODO use firebase token as access token const accessToken = await auth().currentUser?.getIdToken();
    if (currentUser?.uid) config.headers.userId = currentUser.uid

    return config
  },
  (error) => {
    console.log('error happened')
    // Do something with request error
    return Promise.reject(error)
  }
)
