import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music } from '../api/music'
import { useList } from 'react-use'

const playerModel = () => {
  const [playlist, { push, insertAt }] = useList<Music>([])
  const [playIndex, setPlayIndex] = useState<number>(0)
  const playMusic = (music:Music) => {
    insertAt(0, music)
  }
  const playAlbum = async (albumId:string) => {
    const response = await fetchMusicList({ pageSize: 1000, album: albumId })
    response.data.reverse().forEach((music) => insertAt(0, music))
  }
  const addAlbumToPlaylist = async (albumId:string) => {
    const response = await fetchMusicList({ pageSize: 1000, album: albumId })
    response.data.forEach((music) => push(music))
  }
  const getCurrentPlay = ():Music | undefined => {
    if (playlist.length === 0) {
      return undefined
    }
    return playlist[playIndex]
  }
  const nextMusic = () => {
    if (playIndex + 1 < playlist.length) {
      setPlayIndex(playIndex + 1)
      return
    }
    setPlayIndex(0)
  }
  const previousMusic = () => {
    if (playIndex !== 0) {
      setPlayIndex(playIndex - 1)
    }
  }
  return {
    playIndex,
    playMusic,
    playlist,
    getCurrentPlay,
    playAlbum,
    nextMusic,
    previousMusic,
    addAlbumToPlaylist
  }
}
const usePlayerModel = createModel(playerModel)
export default usePlayerModel
