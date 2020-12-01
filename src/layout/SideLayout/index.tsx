import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ApplicationConfig } from '../../config'
import {
  Avatar,
  Button,
  Grid, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core'
import { PlayArrow, PlaylistAdd } from '@material-ui/icons'
import AlbumArtistItem from '../../pages/Album/components/AlbumArtist'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { getMusicArtistString } from '../../utils/music'
import theme from '../../theme'

const useStyles = makeStyles({
  main: {
    backgroundColor: '#181818',
    height: '100%',
    display: 'flex',
    width: '100vw'
  },
  side: {
    width: 240,
    height: '100%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    width: 'calc(100vw - 240px)',
    height: '100%',
    padding: theme.spacing(4),
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingBottom:theme.spacing(20)
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#303030'
    }
  }
})

interface SideLayoutPropsType {
  children?:any
  side:React.ReactElement
}
const SideLayout = ({ children, side }: SideLayoutPropsType):React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <div className={classes.side}>
        {side}
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default SideLayout
