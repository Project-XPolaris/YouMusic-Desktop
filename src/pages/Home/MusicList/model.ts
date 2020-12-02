import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { fetchMusicList, Music } from '../../../api/music'

const musicListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Music>({ loader: fetchMusicList, defaultPageSize: 20, defaultPage: 1 })
  const fetchMusic = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
    console.log(data)
  }
  return {
    data, page, pageSize, total, fetchMusic
  }
}
const useMusicListModel = createModel(musicListModel)
export default useMusicListModel
