import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Button, Drawer, styled, TextField } from '@material-ui/core'
import useStyles from './style'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import useEditorModel from '../../models/editor'
import { Photo, Save } from '@material-ui/icons'
import { uploadMusicCover } from '../../api/music'
import ArtistPickView from '../ArtistPickView'
import { useArtistPickController } from '../ArtistPickView/hook'

const Input = styled('input')({
  display: 'none'
})
export interface MusicUpdate {
  id:number,
  update:{
    title?:string
    album?:string
    year?:number
    track?:number
    artist?:string[]
  }
}
const MusicEditDrawer = ({ onUpdateMusic }:{onUpdateMusic:(data:any[]) => void}):ReactElement => {
  const editor = useEditorModel()
  const classes = useStyles()
  const [inputTitle, setInputTitle] = useState<string | undefined>()
  const [inputAlbum, setInputAlbum] = useState<string | undefined>()
  const [inputYear, setInputYear] = useState<number | undefined>()
  const [inputTrack, setInputTrack] = useState<number | undefined>()
  const artistPickController = useArtistPickController([])
  useEffect(() => {
    if (editor.editMusic) {
      if (editor.editMusic.length === 1) {
        setInputTitle(editor.editMusic[0].title)
        setInputAlbum(editor.editMusic[0].album?.name)
        setInputYear(editor.editMusic[0].year)
        setInputTrack(editor.editMusic[0].track)
        artistPickController.setSelected(editor.editMusic[0].artist.map(it => it.name))
        return
      }
      const flagMusicAlbum = editor.editMusic.find(it => it.album)
      if (flagMusicAlbum && editor.editMusic.filter(it => !it.album || it.album.id === flagMusicAlbum.album.id).length === editor.editMusic.length) {
        setInputAlbum(flagMusicAlbum.album.name)
      } else {
        setInputAlbum(undefined)
      }
      const flagMusicArtist = editor.editMusic.find(it => it.artist.length > 0)
      if (flagMusicArtist && editor.editMusic.filter(it => {
        if (it.artist.length === 0) {
          return true
        }
        for (const leftArtist of it.artist) {
          for (const rightArtist of flagMusicArtist.artist) {
            if (leftArtist.id !== rightArtist.id) {
              return false
            }
          }
        }
        return true
      }).length === editor.editMusic.length) {
        artistPickController.setSelected(flagMusicArtist.artist.map(it => it.name))
      } else {
        artistPickController.setSelected([])
      }
      setInputTitle(undefined)
      setInputYear(undefined)
      setInputTrack(undefined)
    }
  }, [editor.isEditMusicOpen])
  const onUpdate = async () => {
    if (!editor.editMusic) {
      return
    }
    const updateMusics :MusicUpdate[] = []
    for (const music of editor.editMusic) {
      const updateMusic :MusicUpdate = {
        id: Number(music.id),
        update: {}
      }
      if (inputTitle !== undefined && inputTitle.length > 0) {
        updateMusic.update.title = inputTitle
      }
      if (inputAlbum !== undefined && inputAlbum.length > 0) {
        updateMusic.update.album = inputAlbum
      }
      if (inputYear !== undefined) {
        updateMusic.update.year = inputYear
      }
      if (inputTrack !== undefined) {
        updateMusic.update.track = inputTrack
      }
      updateMusic.update.artist = artistPickController.selected
      updateMusics.push(updateMusic)
    }
    onUpdateMusic(updateMusics)
    editor.closeEditMusic()
  }
  const onCoverInputChange = async (e:ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editor.editMusic) {
      return
    }
    const file = e.target.files[0]
    for (const music of editor.editMusic) {
      await uploadMusicCover(Number(music.id), file)
    }
    document.dispatchEvent((new CustomEvent('musicUpdate', {})))
    editor.closeEditMusic()
  }
  return (
    <Drawer open={editor.isEditMusicOpen} anchor={'right'} className={classes.root}
      onClose={() => editor.closeEditMusic()}>
      <div className={classes.content}>
        {
          editor.editMusic?.length === 1 &&
          <img src={editor.editMusic ? getMusicAlbumCoverUrl(editor.editMusic[0]) : undefined} className={classes.cover} />
        }
        {/* <Button variant={'contained'} className={classes.uploadCover}>Upload cover</Button> */}
        <div className={classes.item}>
          <TextField
            variant={'outlined'}
            placeholder={'Title'}
            label={'Title'}
            size={'small'}
            fullWidth
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <TextField
            variant={'outlined'}
            placeholder={'Album'}
            label={'Album'}
            size={'small'}
            fullWidth
            value={inputAlbum}
            onChange={(e) => setInputAlbum(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <ArtistPickView controller={artistPickController} />
        </div>
        <div className={classes.item}>
          <TextField
            variant={'outlined'}
            placeholder={'Year'}
            label={'Year'}
            size={'small'}
            fullWidth
            value={inputYear}
            onChange={(e) => setInputYear(Number(e.target.value))}
          />
        </div>
        <div className={classes.item}>
          <TextField
            variant={'outlined'}
            placeholder={'Track'}
            label={'Track'}
            size={'small'}
            fullWidth
            value={inputTrack}
            onChange={(e) => setInputTrack(Number(e.target.value))}
          />
        </div>
        <div className={classes.bottomActions}>
          <label htmlFor='contained-button-file'>
            <Input
              accept='image/*'
              id='contained-button-file'
              type='file'
              onChange={onCoverInputChange}
            />
            <Button
              variant={'contained'}
              startIcon={<Photo />}
              className={classes.actionButton}
              component="span"
            >Upload cover</Button>
          </label>
          <Button
            variant={'contained'}
            startIcon={<Save />}
            onClick={() => onUpdate()}
            className={classes.actionButton}
          >Update</Button>
        </div>
      </div>
    </Drawer>
  )
}
export default MusicEditDrawer
