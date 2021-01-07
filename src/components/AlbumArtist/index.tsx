import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Person } from '@material-ui/icons'
import { Avatar, Typography } from '@material-ui/core'
import theme from '../../theme'
import { Artist } from '../../api/artist'
import { ApplicationConfig } from '../../config'
import clsx from 'clsx';

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: theme.palette.primary.contrastText
  },
  artist: {
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(1),
    textAlign: 'center',
    lineHeight: '1.3em',
    overflow: 'hidden',
  }
})

interface AlbumArtistItemPropsType {
  artist:Artist,
  className?:any
}
const AlbumArtistItem = ({ artist,className }: AlbumArtistItemPropsType):React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.main,className)}>
      {
        artist.avatar ? <Avatar className={classes.avatar} src={`${ApplicationConfig.apiUrl}${artist.avatar}`}/> : <Avatar className={classes.avatar}><Person /></Avatar>
      }

      <Typography variant={'subtitle1'} className={classes.artist}>
        {artist.name}
      </Typography>

    </div>
  )
}
export default AlbumArtistItem
