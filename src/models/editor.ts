import { createModel } from 'hox'
import { Music } from '../api/music'
import { useState } from 'react'
import { Album } from '../api/album'
import { Artist } from '../api/artist'

const EditorModel = () => {
  const [isEditMusicOpen, setIsEditMusicOpen] = useState<boolean>(false)
  const [editMusic, setEditMusic] = useState<Music[] | undefined>()
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState<boolean>(false)
  const [editAlbum, setEditAlbum] = useState<Album | undefined>()
  const [isEditArtistOpen, setIsEditArtistOpen] = useState<boolean>(false)
  const [editArtist, setEditArtist] = useState<Artist | undefined>()
  const openEditMusic = (music:Music[]) => {
    setEditMusic(music)
    setIsEditMusicOpen(true)
  }
  const closeEditMusic = () => {
    setIsEditMusicOpen(false)
  }
  const openEditAlbum = (album:Album) => {
    setEditAlbum(album)
    setIsEditAlbumOpen(true)
  }
  const closeEditAlbum = () => {
    setIsEditAlbumOpen(false)
  }
  const openEditArtist = (artist:Artist) => {
    setEditArtist(artist)
    setIsEditArtistOpen(true)
  }
  const closeEditArtist = () => {
    setIsEditArtistOpen(false)
  }
  return {
    openEditMusic,
    closeEditMusic,
    isEditMusicOpen,
    editMusic,
    isEditAlbumOpen,
    editAlbum,
    openEditAlbum,
    closeEditAlbum,
    editArtist,
    isEditArtistOpen,
    openEditArtist,
    closeEditArtist
  }
}
const useEditorModel = createModel(EditorModel)
export default useEditorModel
