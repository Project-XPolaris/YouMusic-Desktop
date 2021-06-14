import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core'
import useLayoutModel from '../../models/layout'
import theme from '../../theme'
import usePlayerModel from '../../models/player'
import { getMusicAlbumCoverUrl, getMusicArtistString } from '../../utils/music'

const useStyles = makeStyles({
  main: {
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      '&:hover $child': {
        color: 'red'
      }
    },
    '& .MuiListItem-button.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '& .Mui-focusVisible': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  cover: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    objectFit: 'contain'
  },
  list: {
    width: theme.spacing(40),
    marginTop: theme.spacing(8 + 6)
  },
  header: {
    height: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    position: 'fixed',
    width: '100%',
    zIndex: 100,
    top: 48,
    backgroundColor: '#202020'
  }
})

const PlaylistDrawer = (): ReactElement => {
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
        {playerModel.playlist.map((music, idx) => {
          return (
            <ListItem key={music.id} button selected={playerModel.getCurrentPlay()?.id === music.id} onClick={() => playerModel.playWithIndex(idx)}>
              <ListItemAvatar>
                <Avatar src={getMusicAlbumCoverUrl(music)} variant="rounded"/>
              </ListItemAvatar>
              <ListItemText
                primary={music.title}
                secondary={getMusicArtistString(music)}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true }}
              />
              <ListItemSecondaryAction>

              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
export default PlaylistDrawer
