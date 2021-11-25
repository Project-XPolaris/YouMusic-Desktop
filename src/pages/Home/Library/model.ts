import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { createLibrary, deleteLibrary, fetchLibraryList, Library, scanLibrary } from '../../../api/library'
import { useState } from 'react'
import { fetchTaskList, Task } from '../../../api/task'

const libraryListModel = () => {
  const [taskList, setTaskList] = useState<Array<Task>>([])
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Library>({ loader: fetchLibraryList, defaultPageSize: 20, defaultPage: 1 })
  const fetchLibrary = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
  }
  const newLibrary = async (libraryPath:string) => {
    await createLibrary(libraryPath)
    await fetchLibrary({})
  }
  const remove = async (libraryId : number | string) => {
    await deleteLibrary(libraryId)
    await fetchLibrary({})
  }
  const scan = async (libraryId : number | string) => {
    await scanLibrary(libraryId)
  }
  const refreshTask = async () => {
    const response = await fetchTaskList()
    setTaskList(response.tasks)
  }
  return {
    data, page, pageSize, total, fetchLibrary, newLibrary, remove, scan, taskList, refreshTask
  }
}
const useLibraryListModel = createModel(libraryListModel)
export default useLibraryListModel
