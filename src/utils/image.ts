import { ApplicationConfig } from '../config'

export const getImageUrl = (url?:string):string => {
  return `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}${url}`
}
export const getMusicFileCover = (id:number):string => {
  return `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}/file/music/${id}/cover`
}
