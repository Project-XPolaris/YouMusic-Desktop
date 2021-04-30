import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { createLibrary, deleteLibrary, fetchLibraryList, Library, scanLibrary } from '../../../api/library'

const libraryListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Library>({ loader: fetchLibraryList, defaultPageSize: 20, defaultPage: 1 })
  const fetchLibrary = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
  }
  const newLibrary = async (libraryPath:string) => {
    await createLibrary(libraryPath)
    fetchLibrary({})
  }
  const remove = async (libraryId : number | string) => {
    await deleteLibrary(libraryId)
    fetchLibrary({})
  }
  const scan = async (libraryId : number | string) => {
    await scanLibrary(libraryId)
  }
  return {
    data, page, pageSize, total, fetchLibrary, newLibrary, remove, scan
  }
}
const useLibraryListModel = createModel(libraryListModel)
export default useLibraryListModel
