import useStyles from './style'
import clsx from 'clsx'
import React, { ChangeEvent, useEffect } from 'react'
import useEditorModel from '../../model'
import { Button, IconButton, styled, TextField, Tooltip } from '@material-ui/core'
import ArtistPickView from '../../../../components/ArtistPickView'
import { Image, ListAlt } from '@material-ui/icons'
import { EditorController } from './hook'

export interface EditorViewPropsType {
    className?: string
    controller: EditorController
    onSearchLyric: (id: number, name: string) => void
}

const Input = styled('input')({
  display: 'none'
})
const EditorView = ({ className, controller, onSearchLyric }: EditorViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const {
    title,
    setTitle,
    album,
    setAlbum,
    artistPickController,
    setCoverUrl,
    coverUrl,
    coverFile
  } = controller
  const onUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (!file) {
      return undefined
    }
    await controller.setCoverFromFile(file)
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
  }, [model.editEntityList])
  const editMusic = model.getCurrentEditMusic()
  if (!editMusic || model.getSelectedEditEntity().length === 0) {
    return <></>
  }
  const onApply = () => {
    const selectMusics = model.editEntityList.filter(it => it.isSelect)
    selectMusics.forEach(it => {
      it.setTitle(title.length > 0 ? title : undefined)
      it.setArtist(artistPickController.selected.length > 0 ? artistPickController.selected : undefined)
      it.setAlbum(album)
      if (coverFile && coverUrl) {
        it.setCover(coverFile, coverUrl)
      }
    })
    model.refreshEntity()
  }
  const onSearchLyricButtonClick = () => {
    const selectedEditEntity = model.getSelectedEditEntity()
    if (selectedEditEntity.length !== 1) {
      return
    }
    const target = selectedEditEntity[0]
    onSearchLyric(target.getId(), title)
  }
  return (
    <div className={clsx(classes.root, className)}>
      {
        coverUrl ? <img src={coverUrl} className={classes.cover}/> : <div className={classes.empty}/>
      }
      <TextField
        variant='outlined'
        fullWidth
        value={title}
        size='small'
        label='name'
        onChange={(e) => setTitle(e.target.value)}
        className={classes.item}/>
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
        {
          model.editEntityList.filter(it => it.isSelect).length > 0 &&
                    <Tooltip title={'search lyric'}>
                      <IconButton component="span" onClick={onSearchLyricButtonClick}>
                        <ListAlt/>
                      </IconButton>
                    </Tooltip>
        }
        <Tooltip title={'update image'}>
          <label htmlFor='icon-button-file'>
            <Input accept='image/*' id='icon-button-file' type='file' onChange={onUploadCover}/>
            <IconButton component="span">
              <Image/>
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
