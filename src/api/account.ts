import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface AccountInfo {
  spotifyLogin: boolean
  uid:string
}
export const fetchMyAccount = async ():Promise<AccountInfo> => {
  return await apiRequest.get(ApplicationConfig.apiPaths.accountInfo)
}
