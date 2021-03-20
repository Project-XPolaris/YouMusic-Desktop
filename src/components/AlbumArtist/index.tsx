import React from 'react'
import { Person } from '@material-ui/icons'
import { Avatar, Typography } from '@material-ui/core'
import theme from '../../theme'
import { getImageUrl } from '../../utils/image'
import { Artist } from '../../api/artist'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: theme.palette.primary.contrastText
  },
  artist: {
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(1),
    textAlign: 'center'
  }
})

interface AlbumArtistItemPropsType {
  artist:Artist
  className?: any
  onClick?: () => void
}
const AlbumArtistItem = ({ artist, className, onClick }: AlbumArtistItemPropsType):React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.main, className)}>
      {
        artist.avatar ? <Avatar className={classes.avatar} src={getImageUrl(artist.avatar)} onClick={onClick}/> : <Avatar className={classes.avatar} onClick={onClick}><Person /></Avatar>
      }

      <Typography variant={'subtitle1'} className={classes.artist} onClick={onClick}>
        {artist.name}
      </Typography>

    </div>
  )
}
export default AlbumArtistItem
