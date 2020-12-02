import { useState } from 'react'
import { createModel } from 'hox'
import { fetchMusicList, Music } from '../../api/music'

const MusicListModel = () => {
  const [musicList, setMusicList] = useState<Music[]>([])
  const [total,setTotal] = useState(0)
  const loadData = async (artistId:string, { page = 1, pageSize = 20 }) => {
    const musicResponse = await fetchMusicList({ artist: artistId, pageSize, page })
    setTotal(musicResponse.count)
    setMusicList(musicResponse.data)
  }
  return {
    loadData, musicList,total
  }
}
const useMusicListModel = createModel(MusicListModel)
export default useMusicListModel
