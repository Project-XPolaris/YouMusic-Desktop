import React, { MouseEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Album } from '../../api/album'
import { getAlbumArtistString } from '../../utils/album'
import { ButtonBase } from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { getImageUrl } from '../../utils/image'
import clsx from 'clsx'
import AlbumCover from '../AlbumCover';

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 180
  },
  cover: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: theme.spacing(1)
  },
  noCover: {
    width: 120,
    height: 120,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noCoverIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 32
  },
  title: {
    ...theme.typography.subtitle1,
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  artist: {
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
})

interface AlbumItemPropsType {
  album: Album
  onClick?: (album: Album) => void
  onTitleClick?: (album: Album) => void
  onContextClick?:MouseEventHandler
  className?: string
}

const AlbumItem = ({ onContextClick, album, onClick, onTitleClick, className }: AlbumItemPropsType): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.main, className)} onContextMenu={onContextClick}>
      <ButtonBase onClick={() => {
        if (onClick) {
          onClick(album)
        }
      }}>
        <AlbumCover coverUrl={album.cover} className={classes.cover} />
      </ButtonBase>
      <div className={classes.title} onClick={() => {
        if (onTitleClick) {
          onTitleClick(album)
        }
      }}>
        {album.name}
      </div>
      <div className={classes.artist}>
        {getAlbumArtistString(album)}
      </div>
    </div>
  )
}
export default AlbumItem
