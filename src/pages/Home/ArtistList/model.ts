import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { Artist, fetchArtistList } from '../../../api/artist'

const artistListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Artist>({ loader: fetchArtistList, defaultPageSize: 55, defaultPage: 1 })
  const fetchArtist = async ({ page = 1, pageSize = 55 }) => {
    await loadData({ page, pageSize })
    console.log(data)
  }
  return {
    data, page, pageSize, total, fetchArtist
  }
}
const useArtistListModel = createModel(artistListModel)
export default useArtistListModel