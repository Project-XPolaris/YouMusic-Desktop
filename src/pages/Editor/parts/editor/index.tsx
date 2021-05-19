import useStyles from './style'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useEditorModel from '../../model'
import { TextField } from '@material-ui/core'
import { getImageUrl } from '../../../../utils/image';
import { getMusicAlbumCoverUrl } from '../../../../utils/music';
import ArtistPickView from '../../../../components/ArtistPickView';
import { useArtistPickController } from '../../../../components/ArtistPickView/hook';

export interface EditorViewPropsType {
  className?: string
}

const EditorView = ({ className }: EditorViewPropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const [title, setTitle] = useState<string | undefined>()
  const [album, setAlbum] = useState<string | undefined>()
  const artistPickController = useArtistPickController([])
  useEffect(() => {
    const editMusic = model.getCurrentEditMusic()
    setTitle(editMusic?.title)
    setAlbum(editMusic?.album?.name)
  }, [model.editId])
  const editMusic = model.getCurrentEditMusic()
  if (!editMusic) {
    return <></>
  }
  const coverUrl = getMusicAlbumCoverUrl(editMusic)
  return (
    <div className={clsx(classes.root, className)}>
      {
        coverUrl && <img src={coverUrl} className={classes.cover}/>
      }
      <TextField
        variant="outlined"
        fullWidth
        value={title}
        size='small'
        label='name'
        className={classes.item} />

      <TextField
        variant="outlined"
        fullWidth
        value={album}
        size='small'
        label='album'
        className={classes.item}
      />
      <ArtistPickView controller={artistPickController} className={classes.item}/>

    </div>
  )
}

export default EditorView
