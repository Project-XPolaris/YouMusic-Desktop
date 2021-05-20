import useStyles from './style'
import clsx from 'clsx'
import React, { ChangeEvent, useEffect, useState } from 'react'
import useEditorModel from '../../model'
import { Button, IconButton, styled, TextField, Tooltip } from '@material-ui/core'
import ArtistPickView from '../../../../components/ArtistPickView'
import { useArtistPickController } from '../../../../components/ArtistPickView/hook'
import { Image } from '@material-ui/icons'
import { readFile } from '../../../../utils/file'

export interface EditorViewPropsType {
  className?: string
}
const Input = styled('input')({
  display: 'none'
})
const EditorView = ({ className }: EditorViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const [title, setTitle] = useState<string>('')
  const [album, setAlbum] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string | undefined>()
  const [coverFile, setCoverFile] = useState<File | undefined>()
  const artistPickController = useArtistPickController([])
  const onUploadCover = async (e:ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (!file) {
      return undefined
    }
    if (!model.editIds) {
      return
    }
    const url = await readFile(file)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCoverUrl(url)
    setCoverFile(file)
  }
  useEffect(() => {
    const editMusic = model.getCurrentEditMusic()
    if (!editMusic) {
      return
    }
    setTitle(editMusic.title ?? '')
    setAlbum(editMusic.album ?? '')
    artistPickController.setSelected(editMusic.artist ?? [])
    setCoverUrl(editMusic.cover)
    console.log(model.updateMusics)
  }, [model.editIds])
  const editMusic = model.getCurrentEditMusic()
  if (!editMusic || model.editIds?.length === 0) {
    return <></>
  }
  const onApply = () => {
    if (!model.editIds) {
      return
    }
    model.saveUpdate(model.editIds.map(it => ({
      id: it,
      title: title.length > 0 ? title : undefined,
      album: album.length > 0 ? album : undefined,
      artist: artistPickController.selected.length > 0 ? artistPickController.selected : undefined,
      cover: coverUrl,
      file: coverFile
    })))
  }
  return (
    <div className={clsx(classes.root, className)}>
      {
        coverUrl ? <img src={coverUrl} className={classes.cover} /> : <div className={classes.empty} />
      }
      <TextField
        variant='outlined'
        fullWidth
        value={title}
        size='small'
        label='name'
        onChange={(e) => setTitle(e.target.value)}
        className={classes.item} />
      <TextField
        variant='outlined'
        fullWidth
        value={album}
        size='small'
        label='album'
        onChange={(e) => setAlbum(e.target.value)}
        className={classes.item}
      />
      <ArtistPickView
        controller={artistPickController}
        className={classes.item}
      />
      <div className={classes.bottomAction}>
        <Tooltip title={'update image'}>
          <label htmlFor='icon-button-file'>
            <Input accept='image/*' id='icon-button-file' type='file' onChange={onUploadCover}/>
            <IconButton component="span">
              <Image />
            </IconButton>
          </label>
        </Tooltip>
        <Button
          variant='contained'
          onClick={onApply}
        >
          Apply
        </Button>
      </div>

    </div>
  )
}

export default EditorView
