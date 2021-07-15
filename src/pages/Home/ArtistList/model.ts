import { useDataPageLoader } from '../../../hooks/loader'
import { createModel } from 'hox'
import { Artist, fetchArtistList } from '../../../api/artist'
import { useEffect, useState } from 'react'
import { ArtistFilterData } from '../../../components/ArtistFilter'

const artistListModel = () => {
  const { data, page, pageSize, total, loadData } = useDataPageLoader<Artist>({ loader: fetchArtistList, defaultPageSize: 55, defaultPage: 1 })
  const [filter, setFilter] = useState<ArtistFilterData>({ order: '-id' })
  const fetchArtist = async ({ page = 1, pageSize = 55, ...other }) => {
    console.log(other)
    await loadData({ page, pageSize, extraParams: other })
  }
  useEffect(() => {
    fetchArtist({ order: filter.order })
  }, [filter])
  return {
    data, page, pageSize, total, fetchArtist, filter, setFilter
  }
}
const useArtistListModel = createModel(artistListModel)
export default useArtistListModel
