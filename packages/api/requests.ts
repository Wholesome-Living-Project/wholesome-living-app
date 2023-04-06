import { axiosInstance } from './axios'
import { Configuration, UserApi } from './openapi'

const openApiConfig = new Configuration()

export const api = {
  userApi: new UserApi(openApiConfig, '', axiosInstance),
}
