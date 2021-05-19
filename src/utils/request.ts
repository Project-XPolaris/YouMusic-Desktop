import { extend } from 'umi-request'
import { ApplicationConfig } from '../config'
import { ipcRenderer } from 'electron'
import { Channels } from '../../electron/channels'

const apiRequest = extend({
  timeout: 10000,
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
  const notificationId = ipcRenderer.sendSync(Channels.GetNotificationId)
  if (notificationId) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        Notification: notificationId
      }
    }
  }
  return {
    url: `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}${url}`,
    options
  }
})
export default apiRequest
