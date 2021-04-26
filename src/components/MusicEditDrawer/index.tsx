import React, { useEffect, useState } from 'react'
import { Button, Drawer, TextField } from '@material-ui/core'
import useStyles from './style'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import useEditorModel from '../../models/editor'
import { Save } from '@material-ui/icons'
import { useMount } from 'ahooks'
import { updateMusicInfo } from '../../api/music'
export interface MusicEditDrawerPropsType {

}

const MusicEditDrawer = ({ }: MusicEditDrawerPropsType) => {
  const editor = useEditorModel()
  const classes = useStyles()
  const [inputTitle, setInputTitle] = useState<string | undefined>(editor.editMusic?.title)
  const [inputAlbum, setInputAlbum] = useState<string | undefined>(editor.editMusic?.album.name)
  const [inputYear, setInputYear] = useState<number | undefined>(editor.editMusic?.year)
  const [inputTrack, setInputTrack] = useState<number | undefined>(editor.editMusic?.track)

  useEffect(() => {
    if (editor.editMusic) {
      setInputTitle(editor.editMusic.title)
      setInputAlbum(editor.editMusic.album.name)
      setInputYear(editor.editMusic.year)
      setInputTrack(editor.editMusic.track)
    }
  }, [editor.isEditMusicOpen])
  const onUpdate = async () => {
    if (!editor.editMusic) {
      return
    }
    const updateData : any = {}
    if (inputTitle !== undefined && inputTitle.length > 0) {
      updateData.title = inputTitle
    }
    if (inputAlbum !== undefined && inputAlbum.length > 0) {
      updateData.album = inputAlbum
    }
    if (inputYear !== undefined) {
      updateData.year = inputYear
    }
    if (inputTrack !== undefined) {
      updateData.track = inputTrack
    }
    await updateMusicInfo(Number(editor.editMusic.id), updateData)
    document.dispatchEvent((new CustomEvent('musicUpdate', { })))
    editor.closeEditMusic()
  }
  return (
    <Drawer open={editor.isEditMusicOpen} anchor={'right'} className={classes.root} onClose={() => editor.closeEditMusic()}>
      <div className={classes.content}>
        <img src={editor.editMusic ? getMusicAlbumCoverUrl(editor.editMusic) : undefined} className={classes.cover} />
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
          <Button variant={'contained'} startIcon={<Save />} onClick={() => onUpdate()}>Update</Button>
        </div>
      </div>
    </Drawer>
  )
}
export default MusicEditDrawer
