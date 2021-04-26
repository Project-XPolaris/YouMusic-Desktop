import { Artist, fetchArtistById } from '../../api/artist'
import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music } from '../../api/music'
import { Album, fetchAlbumList } from '../../api/album'

const ArtistModel = () => {
  const [artist, setArtist] = useState<Artist | undefined>(undefined)
  const [musicList, setMusicList] = useState<Music[]>([])
  const [albumList, setAlbumList] = useState<Album[]>([])
  const loadData = async (artistId:string) => {
    console.log(artistId)
    const response = await fetchArtistById(artistId)
    const musicResponse = await fetchMusicList({ pageSize: 10, artist: artistId })
    const albumResponse = await fetchAlbumList({ pageSize: 10, artist: artistId })
    setArtist(response)
    setMusicList(musicResponse.data)
    setAlbumList(albumResponse.data)
  }
  return {
    artist, loadData, musicList, albumList
  }
}
const useArtistModel = createModel(ArtistModel)
export default useArtistModel
