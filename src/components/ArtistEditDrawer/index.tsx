import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import useEditorModel from '../../models/editor'
import { Button, Drawer, styled, TextField } from '@material-ui/core'
import { Photo, Save } from '@material-ui/icons'
import { getImageUrl } from '../../utils/image'
import useStyles from './style'
import { UpdateArtistData, updateArtistInfo } from '../../api/artist'

const Input = styled('input')({
  display: 'none'
})
const ArtistEditDrawer = ():ReactElement => {
  const editor = useEditorModel()
  const classes = useStyles()
  const [inputName, setInputName] = useState<string | undefined>(editor.editArtist?.name)
  useEffect(() => {
    if (editor.editArtist) {
      setInputName(editor.editArtist.name)
    }
  }, [editor.isEditArtistOpen])
  const onUpdate = async () => {
    if (!editor.editArtist) {
      return
    }
    const updateData: UpdateArtistData = {}
    if (inputName) {
      updateData.name = inputName
    }
    await updateArtistInfo(Number(editor.editArtist.id), updateData)
    document.dispatchEvent((new CustomEvent('artistUpdate', {})))
    editor.closeEditArtist()
  }
  const onCoverInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editor.editArtist) {
      return
    }
    document.dispatchEvent((new CustomEvent('artistUpdate', {})))
    editor.closeEditArtist()
  }
  return (
    <Drawer open={editor.isEditArtistOpen} anchor={'right'} className={classes.root}
      onClose={() => editor.closeEditArtist()}>
      <div className={classes.content}>
        <img src={editor.editArtist ? getImageUrl(editor.editArtist?.avatar) : undefined} className={classes.cover} />
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

export default ArtistEditDrawer
