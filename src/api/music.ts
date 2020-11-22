import { ListResponseContainer } from './base'
import { Album } from './album'
import { Artist } from './artist'
import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
export interface Music {
  id:string
  title:string
  album:Album
  artist:Artist[]
}
export const fetchMusicList = async ({ page = 1, pageSize = 20, ...other }):Promise<ListResponseContainer<Music>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.musicList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}
