import { axiosInstance } from './axios'
import { Configuration, MeditationApi, UsersApi } from './openapi'

const openApiConfig = new Configuration()

export const api = {
  userApi: new UsersApi(openApiConfig, '', axiosInstance),
  meditationApi: new MeditationApi(openApiConfig, '', axiosInstance),
}
