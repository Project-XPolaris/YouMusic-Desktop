import { useDataPageLoader } from '../../../hooks/loader'
import { fetchMusicList, Music } from '../../../api/music'
import { createModel } from 'hox'
import { fetchLibraryList, Library } from '../../../api/library'

const libraryListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Library>({ loader: fetchLibraryList, defaultPageSize: 20, defaultPage: 1 })
  const fetchLibrary = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
  }
  return {
    data, page, pageSize, total, fetchLibrary
  }
}
const useLibraryListModel = createModel(libraryListModel)
export default useLibraryListModel
