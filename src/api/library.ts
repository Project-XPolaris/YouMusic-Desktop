import { BaseResponse, ListResponseContainer } from './base'
import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export interface Library {
  id:number
  name:string
  path:string
}
export const fetchLibraryList = async ({ page = 1, pageSize = 20, ...other }:{page?:number, pageSize?:number}):Promise<ListResponseContainer<Library>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.libraryList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}

export const createLibrary = async (libraryPath:string) : Promise<Library> => {
  return apiRequest.post(ApplicationConfig.apiPaths.libraryList, {
    data: {
      libraryPath
    }
  })
}

export const scanLibrary = async (libraryId:number | string) : Promise<BaseResponse> => {
  return apiRequest.post(ApplicationConfig.apiPaths.libraryScan.replace(':id', String(libraryId)), {})
}

export const deleteLibrary = async (libraryId:number | string) : Promise<BaseResponse> => {
  return apiRequest.delete(ApplicationConfig.apiPaths.libraryObject.replace(':id', String(libraryId)), {})
}
