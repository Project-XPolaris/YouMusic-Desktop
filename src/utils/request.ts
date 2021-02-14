import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'

const apiRequest = extend({
  timeout: 1000,
  credentials: 'omit'
})
apiRequest.interceptors.request.use((url, options) => {
  return {
    url: `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}${url}`,
    options
  }
})
export default apiRequest
