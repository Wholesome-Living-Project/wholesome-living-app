import { axiosInstance } from './axios'
import { Configuration, UsersApi } from './openapi'

const openApiConfig = new Configuration()

export const api = {
  userApi: new UsersApi(openApiConfig, '', axiosInstance),
}
