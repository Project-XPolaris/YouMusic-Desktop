import { ApplicationConfig } from '../config'

export const getImageUrl = (url?:string):string => {
  return `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}${url}`
}
