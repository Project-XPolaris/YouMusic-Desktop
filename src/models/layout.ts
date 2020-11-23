import { createModel } from 'hox'
import { useState } from 'react'
export type TabIndex = 'Home' | 'ArtistList' | 'AlbumList' | 'MusicList'
const LayoutModel = () => {
  const [activeIndex, setActiveIndex] = useState<TabIndex>('Home')
  const [playlistDrawerOpen, setPlaylistDrawerOpen] = useState<boolean>(false)
  const switchPlaylistDrawer = () => {
    setPlaylistDrawerOpen(!playlistDrawerOpen)
  }
  return {
    setActiveIndex,
    activeIndex,
    playlistDrawerOpen,
    switchPlaylistDrawer
  }
}
const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
