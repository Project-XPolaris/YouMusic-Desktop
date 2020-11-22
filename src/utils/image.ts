import { ApplicationConfig } from '../config'

export const getImageUrl = (url:string):string => {
  return `${ApplicationConfig.apiUrl}${url}`
}
