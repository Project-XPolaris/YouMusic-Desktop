import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
import { ListResponseContainer } from './base'
import { Artist } from './artist'
import { Music } from './music'

export interface Album {
  id :string
  name:string
  cover:string
  artist:Artist[]
  music:Music[]
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
export interface UpdateAlbumData {

  name?:string

}
export const updateAlbumInfo = async (
  id:number,
  data:UpdateAlbumData
): Promise<void> => {
  return apiRequest.patch(`/album/${id}`, {
    data
  })
}

export const uploadAlbumCover = async (id:number, file:File) => {
  const form = new FormData()
  form.append('file', file)
  return await apiRequest.post(`/album/${id}/cover`, {
    data: form
  })
}
