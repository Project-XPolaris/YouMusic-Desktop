import { useDataPageLoader } from '../hooks/loader'
import { Album, fetchAlbumList } from '../api/album'
import { createModel } from 'hox'
import { useAudioPlayer } from 'react-use-audio-player'
import { useState } from 'react'
import { Music } from '../api/music'

const playerModel = () => {
  const [currentMusic, setCurrentMusic] = useState<Music>()
  return {
    currentMusic,
    setCurrentMusic
  }
}
const usePlayerModel = createModel(playerModel)
export default usePlayerModel
