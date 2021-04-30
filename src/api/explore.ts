import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export type FileType = 'File' | 'Directory'

export interface FileItem {
  type: FileType
  name: string
  path: string
}
export type FetchDirectoryContentResponse = {
  path: string
  sep: string
  files:FileItem[]
}
export const fetchDirectoryContent = async (readPath:string | undefined):Promise<FetchDirectoryContentResponse> => {
  return apiRequest.get(ApplicationConfig.apiPaths.readPath, {
    params: {
      path: readPath
    }
  })
}
