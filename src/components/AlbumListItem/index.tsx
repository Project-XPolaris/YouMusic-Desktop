import useStyles from './style'
import clsx from 'clsx'
import React, { MouseEventHandler } from 'react'
import { ButtonBase, ListItemText } from '@material-ui/core'
import { Album } from '../../api/album'
import AlbumCover from '../AlbumCover'

export interface AlbumListItemPropsType {
  className?: string;
  album:Album
  onClick?: (album: Album) => void
  onTitleClick?: (album: Album) => void
  onContextClick?:MouseEventHandler
}

const AlbumListItem = ({ className, album, onTitleClick, onClick, onContextClick }: AlbumListItemPropsType): React.ReactElement => {
  const classes = useStyles()
  return (
    <div className={clsx(className, classes.root)} onContextMenu={onContextClick}>
      <ButtonBase onClick={() => {
        if (onClick) {
          onClick(album)
        }
      }}>
        <AlbumCover coverUrl={album.cover} className={classes.cover} />
      </ButtonBase>
      <ListItemText primary={album.name} className={classes.text} onClick={() => {
        if (onTitleClick) {
          onTitleClick(album)
        }
      }} secondary={album.artist.map(it => it.name).join('/')}/>
    </div>
  )
}

export default AlbumListItem
