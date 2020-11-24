import { useDataPageLoader } from '../../hooks/loader'
import { Album, fetchAlbumList } from '../../api/album'
import { createModel } from 'hox'
const albumListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Album>({ loader: fetchAlbumList, defaultPageSize: 20, defaultPage: 1 })
  const fetchAlbum = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
  }
  return {
    data, page, pageSize, total, fetchAlbum
  }
}
const useAlbumListModel = createModel(albumListModel)
export default useAlbumListModel
