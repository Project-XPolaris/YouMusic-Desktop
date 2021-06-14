import useStyles from './style'
import clsx from 'clsx'
import React, { ChangeEvent, useEffect } from 'react'
import useEditorModel from '../../model'
import { Button, IconButton, styled, TextField, Tooltip } from '@material-ui/core'
import ArtistPickView from '../../../../components/ArtistPickView'
import { Image } from '@material-ui/icons'
import { EditorController } from './hook'

export interface EditorViewPropsType {
  className?: string
  controller:EditorController
}
const Input = styled('input')({
  display: 'none'
})
const EditorView = ({ className, controller }: EditorViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const { title, setTitle, album, setAlbum, artistPickController, setCoverUrl, coverUrl, coverFile } = controller

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
    controller.setCoverFromFile(file)
  }
  useEffect(() => {
    const editMusic = model.getCurrentEditMusic()
    if (!editMusic) {
      return
    }
    setTitle(editMusic.title ?? '')
    setAlbum(editMusic.album ?? '')
    artistPickController.setSelected(editMusic.artist ?? [])
    if (editMusic.cover) {
      setCoverUrl(editMusic.cover)
    }
  }, [model.editIds, model.updateMusics])
  const editMusic = model.getCurrentEditMusic()
  if (!editMusic || model.editIds?.length === 0) {
    return <></>
  }
  const onApply = () => {
    if (!model.editIds) {
      return
    }
    model.saveUpdate(model.editIds.map(it => {
      const update = model.updateMusics.find(updateData => updateData.id === it)
      return {
        id: it,
        title: title.length > 0 ? title : update?.title,
        album: album.length > 0 ? album : update?.album,
        artist: artistPickController.selected.length > 0 ? artistPickController.selected : update?.artist,
        cover: coverUrl ?? update?.cover,
        file: coverFile ?? update?.file,
        coverUrl: coverUrl
      }
    }))
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
          className={classes.applyButton}
        >
          Apply
        </Button>
      </div>

    </div>
  )
}

export default EditorView
