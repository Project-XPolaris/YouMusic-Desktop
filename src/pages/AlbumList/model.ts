import { useState } from 'react'
import { createModel } from 'hox'
import { Album, fetchAlbumList } from '../../api/album'

const AlbumListModel = () => {
  const [albumList, setAlbumList] = useState<Album[]>([])
  const [total, setTotal] = useState(0)
  const loadData = async ({ page = 1, pageSize = 20, artist, search }:{ page?:number, pageSize?:number, artist?:string, search?:string }) => {
    const albumResponse = await fetchAlbumList({ artist, pageSize, page, search })
    setTotal(albumResponse.count)
    setAlbumList(albumResponse.data)
  }
  return {
    loadData, albumList, total
  }
}
const useAlbumListModel = createModel(AlbumListModel)
export default useAlbumListModel
