import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'

export const sendSpotifyAuthCode = async (code:string) => {
  return await apiRequest.get(ApplicationConfig.apiPaths.spotifyCode, { params: { code } })
}
