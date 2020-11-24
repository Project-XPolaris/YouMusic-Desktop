import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Album } from '../../api/album'
import { ApplicationConfig } from '../../config'
import { getAlbumArtistString } from '../../utils/album'
import { ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 180
  },
  cover: {
    width: 120,
    height: 120,
    objectFit: 'cover'
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
  onClick:(album:Album) => void
}

const AlbumItem = ({ album,onClick }: AlbumItemPropsType):React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <ButtonBase onClick={() => onClick(album)} >
        <img src={`${ApplicationConfig.apiUrl}${album.cover}`} className={classes.cover} />
      </ButtonBase>
      <div className={classes.title}>
        {album.name}
      </div>
      <div className={classes.artist}>
        {getAlbumArtistString(album)}
      </div>
    </div>
  )
}
export default AlbumItem
