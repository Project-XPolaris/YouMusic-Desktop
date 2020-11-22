import { ListResponseContainer } from './base'
import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface Artist {
  id:string
  name:string
  avatar:string
}

export const fetchArtistList = async ({ page = 1, pageSize = 20, ...other }):Promise<ListResponseContainer<Artist>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.artistList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}
