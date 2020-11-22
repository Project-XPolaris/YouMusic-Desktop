import { createModel } from 'hox'
import { useState } from 'react'
export type TabIndex = 'Home' | 'ArtistList' | 'AlbumList' | 'MusicList'
const LayoutModel = () => {
  const [activeIndex, setActiveIndex] = useState<TabIndex>('Home')
  return {
    setActiveIndex,
    activeIndex
  }
}
const useLayoutModel = createModel(LayoutModel)
export default useLayoutModel
