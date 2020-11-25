import { createModel } from 'hox'
import { useState } from 'react'
export type TabIndex = 'Home' | 'ArtistList' | 'AlbumList' | 'MusicList'
export type NavIcon = 'Menu' | 'Back'
const LayoutModel = () => {
  const [activeIndex, setActiveIndex] = useState<TabIndex>('Home')
  const [playlistDrawerOpen, setPlaylistDrawerOpen] = useState<boolean>(false)
  const [navIcon, setNavIcon] = useState<NavIcon>('Menu')
  const switchPlaylistDrawer = () => {
    setPlaylistDrawerOpen(!playlistDrawerOpen)
  }
  return {
    setActiveIndex,
    activeIndex,
    playlistDrawerOpen,
    switchPlaylistDrawer,
    navIcon,
    setNavIcon
  }
}
const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
