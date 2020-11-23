import { useDataPageLoader } from '../hooks/loader'
import { Album, fetchAlbumList } from '../api/album'
import { createModel } from 'hox'
import { useAudioPlayer } from 'react-use-audio-player'
import { useState } from 'react'
import { Music } from '../api/music'
import { useList } from 'react-use'

const playerModel = () => {
  const [playlist, { push, insertAt }] = useList<Music>([])
  const [playIndex, setPlayIndex] = useState<number>(0)
  const playMusic = (music:Music) => {
    insertAt(0, music)
  }
  const getCurrentPlay = ():Music | undefined => {
    if (playlist.length === 0) {
      return undefined
    }
    return playlist[playIndex]
  }
  return {
    playIndex,
    playMusic,
    playlist,
    getCurrentPlay
  }
}
const usePlayerModel = createModel(playerModel)
export default usePlayerModel
