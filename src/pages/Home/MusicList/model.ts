import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { fetchMusicList, Music } from '../../../api/music'
import { useState } from 'react'

const musicListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Music>({ loader: fetchMusicList, defaultPageSize: 10, defaultPage: 1 })
  const [selectedMusic, setSelectMusic] = useState<Music[]>([])
  const fetchMusic = async ({ page = 1, pageSize = 20 }) => {
    await loadData({ page, pageSize })
  }
  const switchSelect = (music:Music) => {
    if (selectedMusic.find(it => it.id === music.id)) {
      setSelectMusic(selectedMusic.filter(it => it.id !== music.id))
    } else {
      setSelectMusic([...selectedMusic, music])
    }
  }
  const isSelected = (music:Music) => {
    return selectedMusic.find(it => it.id === music.id) !== undefined
  }
  const selectNone = () => {
    setSelectMusic([])
  }
  return {
    data, page, pageSize, total, fetchMusic, selectMode: selectedMusic.length > 0, selectedMusic, switchSelect, isSelected, selectNone
  }
}
const useMusicListModel = createModel(musicListModel)
export default useMusicListModel
