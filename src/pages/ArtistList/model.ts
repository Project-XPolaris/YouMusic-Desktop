import { useState } from 'react'
import { createModel } from 'hox'
import { Artist, fetchArtistList } from '../../api/artist'

const ArtistListModel = () => {
  const [artistList, setArtistList] = useState<Artist[]>([])
  const [total, setTotal] = useState(0)
  const loadData = async ({ page = 1, pageSize = 20, search }:{ page?:number, pageSize?:number, search?:string }) => {
    const artistResponse = await fetchArtistList({ pageSize, page, search })
    setTotal(artistResponse.count)
    setArtistList(artistResponse.data)
  }
  return {
    loadData, artistList, total
  }
}
const useArtistListModel = createModel(ArtistListModel)
export default useArtistListModel
