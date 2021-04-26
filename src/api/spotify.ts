import apiRequest from '../utils/request'
import { ApplicationConfig } from '../config'
export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}
export interface SpotifyArtist {
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
export interface SpotifySearchContainer<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous?: any;
  total: number;
}
export interface SpotifySearch {
  artists:SpotifySearchContainer<SpotifyArtist>
}
export const sendSpotifyAuthCode = async (code:string) => {
  return await apiRequest.get(ApplicationConfig.apiPaths.spotifyCode, { params: { code } })
}
export const unlinkSpotify = async () => {
  return await apiRequest.delete(ApplicationConfig.apiPaths.spotifyUnlink)
}
