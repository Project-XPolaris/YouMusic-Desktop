import React from 'react'
import { Person } from '@material-ui/icons'
import { Avatar, Typography } from '@material-ui/core'
import theme from '../../theme'
import { getImageUrl } from '../../utils/image'
import { Artist } from '../../api/artist'
import { makeStyles } from '@material-ui/core/styles'

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
}
const AlbumArtistItem = ({ artist }: AlbumArtistItemPropsType):React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      {
        artist.avatar ? <Avatar className={classes.avatar} src={getImageUrl(artist.avatar)}/> : <Avatar className={classes.avatar}><Person /></Avatar>
      }

      <Typography variant={'subtitle1'} className={classes.artist}>
        {artist.name}
      </Typography>

    </div>
  )
}
export default AlbumArtistItem
