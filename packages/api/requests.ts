import { axiosInstance } from '../../api/axios'
import { Configuration, UserApi } from '../../api/openapi'

const openApiConfig = new Configuration()

export const api = {
  userApi: new UserApi(openApiConfig, '', axiosInstance),
}
