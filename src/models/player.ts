import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music } from '../api/music'
import { useList } from 'react-use'

const playerModel = () => {
  const [playlist, { insertAt, set }] = useList<Music>([])
  const [playIndex, setPlayIndex] = useState<number>(0)
  const playMusic = (music:Music) => {
    if (playlist.length === 0) {
      insertAt(0, music)
      return
    }
    const index = playlist.findIndex(item => item.id === music.id)
    if (index !== -1) {
      let newPlayList = playlist
      const existMusic = playlist[index]
      newPlayList = newPlayList.filter(it => it.id !== music.id)
      newPlayList = [
        ...newPlayList.slice(0, index - 1),
        existMusic,
        ...newPlayList.slice(index - 1)
      ]
      set(newPlayList)
      setPlayIndex(index - 1)
      return
    }
    const newPlayList = [
      ...playlist.slice(0, playIndex + 1),
      music,
      ...playlist.slice(playIndex + 1)
    ]
    set(newPlayList)
    setPlayIndex(playIndex + 1)
  }
  const addMusicToNextPlay = (music:Music) => {
    if (music.id === playlist[playIndex].id) {
      return
    }
    let newPlayList = playlist
    newPlayList = newPlayList.filter(it => it.id !== music.id)
    newPlayList = [
      ...newPlayList.slice(0, playIndex + 1),
      music,
      ...newPlayList.slice(playIndex + 1)
    ]
    set(newPlayList)
  }
  const playAlbum = async (albumId:string) => {
    const response = await fetchMusicList({ pageSize: 1000, album: albumId })
    const newPlayList = response.data
    set(newPlayList)
    setPlayIndex(0)
  }
  const addAlbumToPlaylist = async (albumId:string) => {
    const response = await fetchMusicList({ pageSize: 1000, album: albumId })
    let newPlaylist = playlist
    let toPlayIndex = -1
    response.data.forEach((music) => {
      const existIndex = newPlaylist.findIndex(it => it.id === music.id)
      newPlaylist = newPlaylist.filter(it => it.id !== music.id)
      newPlaylist.push(music)
      const newIndex = newPlaylist.findIndex(it => it.id === music.id)
      if (existIndex === playIndex) {
        toPlayIndex = newIndex
      }
    })
    set(newPlaylist)
    if (toPlayIndex !== -1) {
      setPlayIndex(toPlayIndex)
    }
  }
  const getCurrentPlay = ():Music | undefined => {
    if (playlist.length === 0) {
      return undefined
    }
    return playlist[playIndex]
  }
  const playWithIndex = (index:number) => {
    if (index < playlist.length) {
      setPlayIndex(index)
      return
    }
    setPlayIndex(0)
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
    addAlbumToPlaylist,
    playWithIndex,
    addMusicToNextPlay
  }
}
const usePlayerModel = createModel(playerModel)
export default usePlayerModel
