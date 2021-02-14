import { createModel } from 'hox'
import { useState } from 'react'
import { Album, fetchAlbumList } from '../../api/album'
import { Artist, fetchArtistList } from '../../api/artist'

const HomeModel = () => {
  const [albumList, setAlbumList] = useState<Album[] | undefined>()
  const [artistList, setArtistList] = useState<Artist[] | undefined>()
  const initData = async () => {
    const fetchAlbumResponse = await fetchAlbumList({ pageSize: 20, order: '-id' })
    setAlbumList(fetchAlbumResponse.data)
    const fetchArtistResponse = await fetchArtistList({ pageSize: 20, order: '-id' })
    setArtistList(fetchArtistResponse.data)
  }
  return {
    albumList, initData, artistList
  }
}
const useHomeModel = createModel(HomeModel)
export default useHomeModel
