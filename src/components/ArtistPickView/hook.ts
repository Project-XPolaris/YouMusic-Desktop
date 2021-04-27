import { useState } from 'react'

export interface ArtistPickController {
  selected:string[],
  setSelected:(value:string[]) => void
}
export const useArtistPickController = (initValue:string[]):ArtistPickController => {
  const [selected, setSelected] = useState<string[]>(initValue)
  return {
    selected, setSelected
  }
}
