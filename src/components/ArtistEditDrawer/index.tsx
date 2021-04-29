import React, { ChangeEvent, useEffect, useState } from 'react'
import useEditorModel from '../../models/editor'
import { Button, Drawer, styled, TextField } from '@material-ui/core'
import { Photo, Save } from '@material-ui/icons'
import { UpdateAlbumData, updateAlbumInfo, uploadAlbumCover } from '../../api/album'
import { getImageUrl } from '../../utils/image'
import useStyles from './style'

const Input = styled('input')({
  display: 'none'
})
export interface AlbumEditDrawerPropsType {

}

const AlbumEditDrawer = ({}: AlbumEditDrawerPropsType) => {
  const editor = useEditorModel()
  const classes = useStyles()
  const [inputName, setInputName] = useState<string | undefined>(editor.editAlbum?.name)
  useEffect(() => {
    if (editor.editAlbum) {
      setInputName(editor.editAlbum.name)
    }
  }, [editor.isEditAlbumOpen])
  const onUpdate = async () => {
    if (!editor.editAlbum) {
      return
    }
    const updateData: UpdateAlbumData = {}
    if (inputName) {
      updateData.name = inputName
    }
    await updateAlbumInfo(Number(editor.editAlbum.id), updateData)
    document.dispatchEvent((new CustomEvent('albumUpdate', {})))
    editor.closeEditAlbum()
  }
  const onCoverInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editor.editAlbum) {
      return
    }
    const file = e.target.files[0]
    await uploadAlbumCover(Number(editor.editAlbum.id), file)
    document.dispatchEvent((new CustomEvent('albumUpdate', {})))
    editor.closeEditAlbum()
  }
  return (
    <Drawer open={editor.isEditAlbumOpen} anchor={'right'} className={classes.root}
      onClose={() => editor.closeEditAlbum()}>
      <div className={classes.content}>
        <img src={editor.editAlbum ? getImageUrl(editor.editAlbum?.cover) : undefined} className={classes.cover} />
        <div className={classes.item}>
          <TextField
            variant={'outlined'}
            placeholder={'Name'}
            label={'Name'}
            size={'small'}
            fullWidth
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
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
              component='span'
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

export default AlbumEditDrawer
