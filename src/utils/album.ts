import { Album } from '../api/album'

export const getAlbumArtistString = (album:Album, defaultString = 'unknown'):string => {
  if (album.artist && album.artist.length > 0) {
    return album.artist.map(it => (it.name)).join('/')
  }
  return defaultString
}
