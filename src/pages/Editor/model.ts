import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music } from '../../api/music'

const EditorModel = () => {
  const [musicList, setMusicList] = useState<Music[]>([])
  const [editId, setEditId] = useState<number | undefined>()
  const loadMusic = async () => {
    const response = await fetchMusicList({ })
    setMusicList(response.data)
  }
  const getCurrentEditMusic = () => {
    return musicList.find(it => it.id === editId)
  }
  return {
    musicList, loadMusic, editId, setEditId, getCurrentEditMusic
  }
}
const useEditorModel = createModel(EditorModel)
export default useEditorModel
