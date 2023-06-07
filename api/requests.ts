import { axiosInstance } from './axios'
import { Configuration, FinanceApi, MeditationApi, ProgressApi, UsersApi } from './openapi'

const openApiConfig = new Configuration()

export const api = {
  userApi: new UsersApi(openApiConfig, '', axiosInstance),
  meditationApi: new MeditationApi(openApiConfig, '', axiosInstance),
  financeApi: new FinanceApi(openApiConfig, '', axiosInstance),
  levelApi: new ProgressApi(openApiConfig, '', axiosInstance),
}
