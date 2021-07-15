import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { fetchMusicList, Music, updateMusicInfo } from '../../../api/music'
import { useEffect, useState } from 'react'
import { MusicUpdate } from '../../../components/MusicEditDrawer'
import { ipcRenderer } from 'electron'
import { Channels } from '../../../../electron/channels'
import { MusicFilterData } from '../../../components/MusicFilter'

const musicListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Music>({ loader: fetchMusicList, defaultPageSize: 10, defaultPage: 1 })
  const [selectedMusic, setSelectMusic] = useState<Music[]>([])
  const [filter, setFilter] = useState<MusicFilterData>({ order: '-id' })
  const fetchMusic = async ({ page = 1, pageSize = 20, ...other }) => {
    await loadData({ page, pageSize, extraParams: filter })
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
  ipcRenderer.on(Channels.MusicUpdateEvent, (e, ids) => {
    if (data.find(it => ids.find((id:number) => it.id === id) !== 0)) {
      fetchMusic({ page: page })
    }
  })
  const update = async (updateMusics:MusicUpdate[]) => {
    for (const updateMusic of updateMusics) {
      await updateMusicInfo(updateMusic.id, updateMusic.update)
    }
    await fetchMusic({ page, pageSize })
  }
  useEffect(() => {
    setSelectMusic([])
    fetchMusic({})
  }, [filter])
  return {
    data,
    page,
    pageSize,
    total,
    fetchMusic,
    selectMode: selectedMusic.length > 0,
    selectedMusic,
    switchSelect,
    isSelected,
    selectNone,
    update,
    filter,
    setFilter
  }
}
const useMusicListModel = createModel(musicListModel)
export default useMusicListModel
