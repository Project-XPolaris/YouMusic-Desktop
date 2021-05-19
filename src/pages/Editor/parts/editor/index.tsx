import useStyles from './style'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useEditorModel from '../../model'
import { Button, TextField } from '@material-ui/core'
import { getMusicAlbumCoverUrl } from '../../../../utils/music'
import ArtistPickView from '../../../../components/ArtistPickView'
import { useArtistPickController } from '../../../../components/ArtistPickView/hook'
import { getImageUrl } from '../../../../utils/image'

export interface EditorViewPropsType {
  className?: string
}

const EditorView = ({ className }: EditorViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const [title, setTitle] = useState<string>('')
  const [album, setAlbum] = useState<string>('')
  const artistPickController = useArtistPickController([])
  useEffect(() => {
    const editMusic = model.getCurrentEditMusic()
    if (!editMusic) {
      return
    }
    setTitle(editMusic.title ?? '')
    setAlbum(editMusic.album ?? '')
  }, [model.editIds])
  const editMusic = model.getCurrentEditMusic()
  if (!editMusic) {
    return <></>
  }
  const getCoverUrl = () => {
    if (!editMusic.cover) {
      return undefined
    }
    return getImageUrl(editMusic.cover)
  }
  const onApply = () => {
    if (!model.editIds) {
      return
    }
    model.saveUpdate(model.editIds.map(it => ({ id: it, title: title.length > 0 ? title : undefined, album: album.length > 0 ? album : undefined })))
  }
  return (
    <div className={clsx(classes.root, className)}>
      {
        getCoverUrl() && <img src={getCoverUrl()} className={classes.cover}/>
      }
      <TextField
        variant="outlined"
        fullWidth
        value={title}
        size='small'
        label='name'
        onChange={(e) => setTitle(e.target.value)}
        className={classes.item} />
      <TextField
        variant="outlined"
        fullWidth
        value={album}
        size='small'
        label='album'
        onChange={(e) => setAlbum(e.target.value)}
        className={classes.item}
      />
      <ArtistPickView controller={artistPickController} className={classes.item}/>
      <Button
        variant='contained'
        className={classes.applyButton}
        onClick={onApply}
      >
        Apply
      </Button>
    </div>
  )
}

export default EditorView
