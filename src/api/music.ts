import { BaseResponse, ListResponseContainer } from './base'
import { Album } from './album'
import { Artist } from './artist'
import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface Music {
  id: number
  title: string
  year?: number
  track?: number
  album: Album
  artist: Artist[]
  filename:string,
}

export const fetchMusicList = async ({ page = 1, pageSize = 20, ...other }:{page?:number, pageSize?:number, search?:string, album?:string, order?:string, artist?:number, ids?:string }): Promise<ListResponseContainer<Music>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.musicList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}
export const updateMusicInfo = async (
  id:number,
  data: {
    title?:string
    album?:string
    year?:number
    track?:number
    artist?:string[]
  }
): Promise<void> => {
  return apiRequest.patch(`/music/${id}/file`, {
    data
  })
}
export const uploadMusicCover = async (id:number, file:File):Promise<BaseResponse> => {
  const form = new FormData()
  form.append('file', file)
  return await apiRequest.post(`/music/${id}/cover`, {
    data: form
  })
}
export const fetchMusicLyrics = async (id:string):Promise<string> => {
  return await apiRequest.get(`/file/lrc/${id}`)
}
