import { useDataPageLoader } from '../../hooks/loader'
import { Album, fetchAlbumById, fetchAlbumList } from '../../api/album'
import { createModel } from 'hox'
import { useState } from 'react'

const AlbumModel = () => {
  const [album, setAlbum] = useState<Album | undefined>(undefined)
  const loadData = async (albumId:string) => {
    const response = await fetchAlbumById(albumId)
    setAlbum(response)
  }
  return {
    album,loadData
  }
}
const useAlbumModel = createModel(AlbumModel)
export default useAlbumModel
