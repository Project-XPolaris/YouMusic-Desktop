import { BaseResponse, ListResponseContainer } from './base'
import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface Artist {
  id:string
  name:string
  avatar:string
}

export const fetchArtistList = async ({ page = 1, pageSize = 20, ...other }:{page?:number, pageSize?:number, search?:string, order?:string}):Promise<ListResponseContainer<Artist>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.artistList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}

export const fetchArtistById = async (id:number|string):Promise<Artist> => {
  return apiRequest.get(ApplicationConfig.apiPaths.artist.replace(':id', `${id}`))
}
export interface UpdateArtistData {
  name?:string
}
export const updateArtistInfo = async (
  id:number,
  data:UpdateArtistData
): Promise<void> => {
  return apiRequest.patch(`/artist/${id}`, {
    data
  })
}

export const uploadArtistCover = async (id:number, file:File):Promise<BaseResponse> => {
  const form = new FormData()
  form.append('file', file)
  return await apiRequest.post(`/artist/${id}/cover`, {
    data: form
  })
}
