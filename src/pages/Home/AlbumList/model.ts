import { useDataPageLoader } from '../../../hooks/loader'
import { Album, fetchAlbumList } from '../../../api/album'
import { createModel } from 'hox'
import { useState } from 'react'
const albumListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Album>({ loader: fetchAlbumList, defaultPageSize: 20, defaultPage: 1 })
  const [display, setDisplay] = useState<string>('list')
  const fetchAlbum = async ({ page = 1, pageSize = 55, ...other }) => {
    await loadData({ page, pageSize, extraParams: other })
  }
  return {
    data, page, pageSize, total, fetchAlbum, display, setDisplay
  }
}
const useAlbumListModel = createModel(albumListModel)
export default useAlbumListModel
