import { ListResponseContainer } from './base';
import apiRequest from '../utils/request';
import { ApplicationConfig } from '../config';

export interface Library {
  id:string
  name:string
  path:string
}
export const fetchLibraryList = async ({ page = 1, pageSize = 20, ...other }):Promise<ListResponseContainer<Library>> => {
  return apiRequest.get(ApplicationConfig.apiPaths.libraryList, {
    params: {
      page,
      pageSize,
      ...other
    }
  })
}
