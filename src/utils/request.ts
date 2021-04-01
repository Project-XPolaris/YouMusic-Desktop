import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'

const apiRequest = extend({
  timeout: 1000,
  credentials: 'omit'
})
apiRequest.interceptors.request.use((url, options) => {
  if (url.startsWith('http')) {
    return {
      url, options
    }
  }
  const token = localStorage.getItem(ApplicationConfig.keys.store.token)
  if (token) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    }
  }
  return {
    url: `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}${url}`,
    options
  }
})
export default apiRequest
