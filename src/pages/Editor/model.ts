import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music, updateMusicInfo } from '../../api/music'
import { ipcRenderer } from 'electron'

export interface MusicUpdateData {
  id: number
  title?: string
  album?: string
}

export interface EditMusic {
  cover?:string
  title?: string
  album?: string
}
export interface SaveProgress {
  text:string,
  total:number,
  current:number
}
const EditorModel = () => {
  const [musicList, setMusicList] = useState<Music[]>([])
  const [editIds, setEditIds] = useState<number[] | undefined>()
  const [updateMusics, setUpdateMusics] = useState<MusicUpdateData[]>([])
  const [saveProgress, setSaveProgress] = useState<SaveProgress | undefined>()
  const loadMusic = async () => {
    const ids = await ipcRenderer.invoke('getEditIds')
    const response = await fetchMusicList({ order: '-id', ids: ids.join(',') })
    setMusicList(response.data)
  }
  const getEditMusic = (id :number): EditMusic | undefined => {
    const music = musicList.find(it => it.id === id)
    const update = updateMusics.find(it => it.id === id)
    if (!id || !music) {
      return undefined
    }
    return {
      cover: music.album?.cover,
      title: update?.title ?? music.title,
      album: update?.album ?? music.album?.name
    }
  }
  const getCurrentEditMusic = (): EditMusic | undefined => {
    if (!editIds) {
      return
    }
    const editMusics:EditMusic[] = []
    for (const editId of editIds) {
      const editMusic = getEditMusic(editId)
      if (editMusic) {
        editMusics.push(editMusic)
      }
    }

    const editMusic :EditMusic = {}
    editMusic.title = editMusics.find(it => it.title !== undefined)?.title
    if (editMusic.title && editMusics.find(it => it.title !== undefined && it.title !== editMusic.title)) {
      editMusic.title = undefined
    }
    editMusic.album = editMusics.find(it => it.album !== undefined)?.album
    if (editMusic.album && editMusics.find(it => it.album !== undefined && it.album !== editMusic.album)) {
      editMusic.album = undefined
    }
    editMusic.cover = editMusics.find(it => it.cover !== undefined)?.cover
    if (editMusic.cover && editMusics.find(it => it.cover !== undefined && it.cover !== editMusic.cover)) {
      editMusic.cover = undefined
    }
    return editMusic
  }
  const saveUpdate = (update: MusicUpdateData[]) => {
    setUpdateMusics([...updateMusics.filter(it => update.find(u => it.id !== u.id)), ...update])
  }
  const saveAll = async () => {
    for (let i = 0; i < updateMusics.length; i++) {
      const updateMusic = updateMusics[i]
      const music = musicList.find(it => it.id === updateMusic.id)
      setSaveProgress({
        text: music?.filename ?? '',
        current: i,
        total: updateMusics.length
      })
      await updateMusicInfo(updateMusic.id, updateMusic)
      setUpdateMusics([])
    }
    setSaveProgress(undefined)
    await loadMusic()
  }
  return {
    musicList,
    loadMusic,
    editIds,
    setEditIds,
    getCurrentEditMusic,
    saveUpdate,
    updateMusics,
    saveAll,
    saveProgress,
    getEditMusic
  }
}
const useEditorModel = createModel(EditorModel)
export default useEditorModel
