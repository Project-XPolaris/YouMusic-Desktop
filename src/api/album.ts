import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { ListResponseContainer } from './base'
import { Artist } from './artist'

export interface Album {
  id :string
  name:string
  cover:string
  artist:Artist[]
}
export const fetchAlbumList = async ({ page = 1, pageSize = 20, ...other }):Promise<ListResponseContainer<Album>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.albumList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}

export const fetchAlbumById = async (albumId:string | number):Promise<Album> => {
  return apiRequest.get(ApplicationConfig.apiPaths.album.replace(':id', `${albumId}`), {})
}
