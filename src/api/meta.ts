import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
export interface SearchAlbumEntity {
  name: string;
  cover: string;
  artists: string;
}
export const searchAlbumMeta = (key:string):Promise<SearchAlbumEntity[]> => {
  return apiRequest.get(ApplicationConfig.apiPaths.searchAlbumMeta, {
    params: {
      key
    }
  })
}
