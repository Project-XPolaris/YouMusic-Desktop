import { createModel } from 'hox'
import { Music } from '../api/music'
import { useState } from 'react'

const EditorModel = () => {
  const [isEditMusicOpen, setIsEditMusicOpen] = useState<boolean>(false)
  const [editMusic, setEditMusic] = useState<Music | undefined>()
  const openEditMusic = (music:Music) => {
    setEditMusic(music)
    setIsEditMusicOpen(true)
  }
  const closeEditMusic = () => {
    setIsEditMusicOpen(false)
  }
  return {
    openEditMusic, closeEditMusic, isEditMusicOpen, editMusic
  }
}
const useEditorModel = createModel(EditorModel)
export default useEditorModel
