import { Music } from '../api/music'
import { getImageUrl } from './image'
import { ApplicationConfig } from '../config'

export const getMusicAlbumCoverUrl = (music:Music):string => {
  if (music.album) {
    return getImageUrl(music.album.cover)
  }
  return ''
}

export const getMusicArtistString = (music:Music, defaultString = 'unknown') : string => {
  if (music.artist && music.artist.length > 0) {
    return music.artist.map(it => (it.name)).join('/')
  }
  return defaultString
}

export const getPlayerUrl = (music?:Music):string => {
  if (music) {
    return `${ApplicationConfig.apiUrl}/file/audio/${music.id}`
  }
  return ''
}
