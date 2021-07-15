import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface SearchAlbumEntity {
  name: string;
  cover: string;
  artists: string;
}

export const searchAlbumMeta = (key: string): Promise<SearchAlbumEntity[]> => {
  return apiRequest.get(ApplicationConfig.apiPaths.searchAlbumMeta, {
    params: {
      key
    }
  })
}

export interface SearchMusicEntity {
  id: string;
  name: string;
  cover: string;
  artists: Array<{
    name: string
  }>;
  source: string;
}
export const searchMusicMeta = (key:string): Promise<SearchMusicEntity[]> => {
  return apiRequest.get(ApplicationConfig.apiPaths.searchMusicMeta,
    {
      params: {
        key
      }
    }
  )
}
export interface SearchMusicLyricEntity {
  lyric:string
}
export const fetchMusicMetaLyric = (musicMeta:SearchMusicEntity): Promise<SearchMusicLyricEntity> => {
  return apiRequest.post(ApplicationConfig.apiPaths.musicMetaLyric, {
    data: musicMeta
  })
}
