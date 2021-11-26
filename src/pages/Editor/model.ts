import { createModel } from 'hox'
import { useState } from 'react'
import { fetchMusicList, Music, updateMusicInfo, uploadMusicCover } from '../../api/music'
import { ipcRenderer } from 'electron'
import { differenceWith, intersection, isArray } from 'lodash'
import { Channels } from '../../../electron/channels'
import { readFile } from '../../utils/file'
import { getMusicFileCover } from '../../utils/image'

export class EditEntity {
    original: Music
    updateData: MusicUpdateData
    isSelect = false
    hasUpdate = false

    constructor (music: Music) {
      this.original = music
      this.updateData = {
        id: music.id
      }
    }

    getId (): number {
      return this.original.id
    }

    getTitle (): string {
      return this.updateData.title ?? this.original.title
    }

    setTitle (title: string | undefined): void {
      if (title) {
        if (this.original.title === title) {
          this.updateData.title = undefined
          return
        }
        this.updateData.title = title
      }
    }

    isTitleEdit ():boolean {
      return Boolean(this.updateData.title)
    }

    getArtists (): string[] {
      return this.updateData.artist ?? this.original.artist.map(it => it.name)
    }

    setArtist (artist: string | string[] | undefined): void {
      if (!artist) {
        return
      }
      const newArtists:string[] = []
      if (isArray(artist)) {
        newArtists.push(...artist)
      } else {
        newArtists.push(artist)
      }
      const diff = differenceWith(newArtists, this.original.artist.map(it => it.name))
      if (diff.length === 0) {
        this.updateData.artist = undefined
        return
      }
      this.updateData.artist = newArtists
    }

    getAlbum (): string {
      return this.updateData.album ?? this.original.album.name
    }

    getFileName (): string {
      return this.original.filename.substr(0, this.original.filename.lastIndexOf('.'))
    }

    setAlbum (album: string | undefined): void {
      if (album) {
        if (this.original.album.name === album) {
          this.updateData.album = undefined
          return
        }
        this.updateData.album = album
      }
    }

    getEditMusic (): EditMusic {
      return {
        cover: this.getCoverUrl(),
        title: this.getTitle(),
        album: this.getAlbum(),
        artist: this.getArtists()
      }
    }

    hasNew (): boolean {
      return Boolean(this.updateData.title) ||
            Boolean(this.updateData.artist) ||
            Boolean(this.updateData.album) ||
            Boolean(this.updateData.cover) ||
            Boolean(this.updateData.cover?.file)
    }

    getCoverUrl ():string | undefined {
      return this.updateData.cover?.url ?? getMusicFileCover(this.getId())
    }

    setCover (file : File, url : string) {
      this.updateData.cover = {
        file, url
      }
    }
}

export interface CoverData {
    file?: File
    url?: string
}

export interface MusicUpdateData {
    id: number
    title?: string
    album?: string
    artist?: string[]
    cover?:CoverData

}

export interface EditMusic {
    title?: string
    album?: string
    artist?: string[]
    cover?:string
}

export interface SaveProgress {
    text: string,
    total: number,
    current: number
}

const EditorModel = () => {
  const [editEntityList, setEditEntity] = useState<EditEntity[]>([])
  // const [musicList, setMusicList] = useState<Music[]>([])
  const [editIds, setEditIds] = useState<number[] | undefined>()
  // const [updateMusics, setUpdateMusics] = useState<MusicUpdateData[]>([])
  const [saveProgress, setSaveProgress] = useState<SaveProgress | undefined>()
  const loadMusic = async () => {
    const ids = await ipcRenderer.invoke('getEditIds')
    const response = await fetchMusicList({ order: '-id', ids: ids.join(',') })
    setEditEntity(response.data.map(it => new EditEntity(it)))
  }
  // const getEditMusic = (id :number): EditMusic | undefined => {
  //   const music = musicList.find(it => it.id === id)
  //   const update = updateMusics.find(it => it.id === id)
  //   if (!id || !music) {
  //     return undefined
  //   }
  //   return {
  //     cover: update?.cover ?? (music.album?.cover ? getMusicFileCover(music.id) : undefined),
  //     title: update?.title ?? music.title,
  //     album: update?.album ?? music.album?.name,
  //     artist: update?.artist ?? music.artist.map(it => it.name)
  //   }
  // }
  const getCurrentEditMusic = (): EditMusic | undefined => {
    const editMusics = editEntityList.filter(it => it.isSelect).map(it => it.getEditMusic())
    if (editMusics.length === 0) {
      return
    }
    if (editMusics.length === 1) {
      return editMusics[0]
    }

    const editMusic: EditMusic = {}
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
    editMusic.artist = intersection(...editMusics.map(it => it.artist))
    return editMusic
  }
  const getSelectedEditEntity = ():EditEntity[] => {
    return editEntityList.filter(it => it.isSelect)
  }
  const setImageFile = async (ids: number[], file: File) => {
    const fileUrl: any = await readFile(file)
    const updateMusics = editEntityList.filter(it => it.isSelect)
    updateMusics.forEach(it => {
      it.updateData.cover = {
        file,
        url: fileUrl
      }
    })
    setEditEntity([...editEntityList])
  }
  const saveAll = async () => {
    const updateMusics = editEntityList.filter(it => it.hasNew())
    for (let i = 0; i < updateMusics.length; i++) {
      const updateMusic = updateMusics[i]
      setSaveProgress({
        text: updateMusic.getFileName(),
        current: i,
        total: updateMusics.length
      })
      await updateMusicInfo(updateMusic.getId(), {
        title: updateMusic.getTitle(),
        artist: updateMusic.getArtists(),
        album: updateMusic.getAlbum()
      })
      if (updateMusic.updateData.cover?.file) {
        await uploadMusicCover(updateMusic.getId(), updateMusic.updateData.cover.file)
      }
    }
    setSaveProgress(undefined)
    await loadMusic()
    ipcRenderer.send(Channels.NotifyMusicUpdate, updateMusics.map(it => it.getId()))
  }
  const refreshEntity = () => {
    console.log('refresh edit data')
    console.log(editEntityList)
    setEditEntity([...editEntityList])
  }
  return {
    setEditEntity,
    editEntityList,
    loadMusic,
    getCurrentEditMusic,
    saveAll,
    saveProgress,
    setImageFile,
    refreshEntity,
    getSelectedEditEntity
  }
}
const useEditorModel = createModel(EditorModel)
export default useEditorModel
