import useStyles from './style'
import clsx from 'clsx'
import { getImageUrl } from '../../utils/image'
import React from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

export interface AlbumCoverPropsType {
  className?: string;
  coverUrl?:string
}

const AlbumCover = ({ className, coverUrl }: AlbumCoverPropsType): React.ReactElement => {
  const classes = useStyles()
  if (coverUrl) {
    return (
      <img src={getImageUrl(coverUrl)} className={clsx(className, classes.root)}/>
    )
  }
  return <div className={clsx(classes.noCover, className)}><MusicNoteIcon className={classes.noCoverIcon} /></div>
}

export default AlbumCover
