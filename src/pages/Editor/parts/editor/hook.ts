import { useState } from 'react'
import { ArtistPickController, useArtistPickController } from '../../../../components/ArtistPickView/hook'
import { readFile } from '../../../../utils/file'

export interface EditorController {
  title:string
  album:string
  setTitle:(title:string) => void
  setAlbum:(album:string) => void
  addArtist:(artistName:string) => void
  artistPickController:ArtistPickController,
  coverUrl:string | undefined
  coverFile:File | undefined
  setCoverFromUrl:(url:string) => void
  setCoverFromFile:(file:File) => void
  setCoverUrl:(url:string) => void
}

export const useEditor = ():EditorController => {
  const [title, setTitle] = useState<string>('')
  const [album, setAlbum] = useState<string>('')
  const artistPickController = useArtistPickController([])
  const [coverUrl, setCoverUrl] = useState<string | undefined>()
  const [coverFile, setCoverFile] = useState<File | undefined>()
  const addArtist = (artistName:string) => {
    artistPickController.setSelected([...artistPickController.selected, artistName])
  }
  const setCoverFromUrl = async (url:string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], 'image', { type: blob.type })
    setCoverFile(file)
    setCoverUrl(url)
  }
  const setCoverFromFile = async (file:File) => {
    setCoverFile(file)
    const url = await readFile(file)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCoverUrl(url)
  }
  return {
    title,
    setTitle,
    album,
    setAlbum,
    artistPickController,
    addArtist,
    coverUrl,
    coverFile,
    setCoverFromUrl,
    setCoverFromFile,
    setCoverUrl
  }
}
