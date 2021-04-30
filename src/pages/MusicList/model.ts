import { useState } from 'react'
import { createModel } from 'hox'
import { fetchMusicList, Music } from '../../api/music'

const MusicListModel = () => {
  const [musicList, setMusicList] = useState<Music[]>([])
  const [total, setTotal] = useState(0)
  const loadData = async ({ page = 1, pageSize = 20, artist, search }:{page?:number, pageSize?:number, artist?:string, search?:string}) => {
    const musicResponse = await fetchMusicList({ artist, pageSize, page, search })
    setTotal(musicResponse.count)
    setMusicList(musicResponse.data)
  }
  return {
    loadData, musicList, total
  }
}
const useMusicListModel = createModel(MusicListModel)
export default useMusicListModel
