import { useState } from 'react'

export interface SearchLyricDrawerController {
  inputSearch?:string
  setInputSearch:(text:string) => void
}
export const useSearchLyricDrawerController = ():SearchLyricDrawerController => {
  const [inputSearch, setInputSearch] = useState<string>()
  return {
    inputSearch, setInputSearch
  }
}
