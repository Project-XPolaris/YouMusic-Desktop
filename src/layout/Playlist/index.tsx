import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar, Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, Typography
} from '@material-ui/core'
import useLayoutModel from '../../models/layout'
import theme from '../../theme'
import { ApplicationConfig } from '../../config'
import usePlayerModel from '../../models/player'
import { getMusicAlbumCoverUrl, getMusicArtistString } from '../../utils/music'

const useStyles = makeStyles({
  main: {
  },
  cover: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    objectFit: 'contain'
  },
  list: {
    width: theme.spacing(40),
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.primary.main
  },
  header: {
    height: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    width: '100%',
    zIndex: 100
  }
})

interface PlaylistDrawerPropsType {

}

export default function PlaylistDrawer ({}: PlaylistDrawerPropsType) {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const playerModel = usePlayerModel()
  return (
    <Drawer
      open={layoutModel.playlistDrawerOpen}
      onClose={() => layoutModel.switchPlaylistDrawer()} className={classes.main}
      BackdropProps={{ invisible: true }}
      anchor={'right'}
      PaperProps={{
        style: {
          backgroundColor: '#202020'
        }
      }}
    >
      <div className={classes.header}>
        <Typography variant="h6" gutterBottom>
          Playlist
        </Typography>
      </div>
      <List className={classes.list} dense>
        {playerModel.playlist.map((music) => {
          return (
            <ListItem key={music.id} button>
              <ListItemAvatar>
                <Avatar src={getMusicAlbumCoverUrl(music)} variant="rounded"/>
              </ListItemAvatar>
              <ListItemText primary={music.title} secondary={getMusicArtistString(music)}/>
              <ListItemSecondaryAction>

              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
