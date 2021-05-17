import { Music } from '../api/music'
import { getImageUrl } from './image'
import { ApplicationConfig } from '../config'

export const getMusicAlbumCoverUrl = (music:Music):string| undefined => {
  if (music.album?.music) {
    return getImageUrl(music.album.cover)
  }
  return undefined
}

export const getMusicArtistString = (music:Music, defaultString = 'unknown') : string => {
  if (music.artist && music.artist.length > 0) {
    return music.artist.map(it => (it.name)).join('/')
  }
  return defaultString
}

export const getPlayerUrl = (music?:Music):string => {
  if (music) {
    return `${localStorage.getItem(ApplicationConfig.keys.store.apiUrl)}/file/audio/${music.id}`
  }
  return ''
}
