import { useDataPageLoader } from '../../hooks/loader'
import { createModel } from 'hox'
import { Artist, fetchArtistList } from '../../api/artist'

const artistListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Artist>({ loader: fetchArtistList, defaultPageSize: 20, defaultPage: 1 })
  const fetchArtist = async () => {
    await loadData({})
    console.log(data)
  }
  return {
    data, page, pageSize, total, fetchArtist
  }
}
const useArtistListModel = createModel(artistListModel)
export default useArtistListModel
