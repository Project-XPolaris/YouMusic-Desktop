import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface ServiceInfo {
  name:string
  authUrl:string
  authEnable:string
}

export const fetchAppInfo = async ():Promise<ServiceInfo> => {
  return await apiRequest.get(ApplicationConfig.apiPaths.info)
}
