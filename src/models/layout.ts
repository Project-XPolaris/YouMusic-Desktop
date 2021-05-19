import { createModel } from 'hox'
import { useState } from 'react'

export type TabIndex = 'Home' | 'ArtistList' | 'AlbumList' | 'MusicList' | 'Library' | 'Person'
export type NavIcon = 'Menu' | 'Back'
export type DialogKey = 'library/pickDirectory' | 'artist/spotifyEdit'
const LayoutModel = () => {
  const [activeIndex, setActiveIndex] = useState<TabIndex>('Home')
  const [playlistDrawerOpen, setPlaylistDrawerOpen] = useState<boolean>(false)
  const [navIcon, setNavIcon] = useState<NavIcon>('Menu')
  const [dialogs, setDialogs] = useState< { [key:string]:boolean }>({})
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const switchDialog = (dialogKey:DialogKey) => {
    const newDialog = {
      ...dialogs
    }
    newDialog[dialogKey] = !newDialog[dialogKey]
    setDialogs(newDialog)
  }
  const dialogOpen = (dialogKey:DialogKey) => {
    return Boolean(dialogs[dialogKey])
  }
  const switchPlaylistDrawer = () => {
    setPlaylistDrawerOpen(!playlistDrawerOpen)
  }
  return {
    setActiveIndex,
    activeIndex,
    playlistDrawerOpen,
    switchPlaylistDrawer,
    navIcon,
    setNavIcon,
    switchDialog,
    dialogs,
    dialogOpen,
    showSearch,
    setShowSearch
  }
}
const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
