import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar, ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core'
import { ArrowBack, PlayArrow, PlaylistAdd } from '@material-ui/icons'
import useLayoutModel from '../../models/layout'
import { useParams } from 'react-router-dom'
import useAlbumModel from './model'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { ApplicationConfig } from '../../config'
import { getMusicArtistString } from '../../utils/music'
import AlbumArtistItem from '../../components/AlbumArtist'
import usePlayerModel from '../../models/player'
import SideLayout from '../../layout/SideLayout'

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
    padding: theme.spacing(4)
  },
  cover: {
    width: 240,
    height: 240,
    objectFit: 'cover'
  },
  noCover: {
    width: 240,
    height: 240,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCoverIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 48
  },
  title: {
    color: theme.palette.primary.contrastText
  },
  artistContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  item: {
    width: 120,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  listText: {
    color: theme.palette.primary.contrastText
  },
  actionContent: {
    padding: theme.spacing(2),
    width: '100%'
  },
  actionButton: {
    marginBottom: theme.spacing(2)
  },
  musicAvatar: {
    backgroundColor: theme.palette.primary.contrastText
  }
})

interface AlbumPagePropsType {

}

const AlbumPage = ({}: AlbumPagePropsType) => {
  const { albumId } = useParams()
  const playerModel = usePlayerModel()
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const albumModel = useAlbumModel()
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    albumModel.loadData(albumId)
  }, [])
  const NoCover = () => {
    return (
      <div className={classes.noCover}>
        <MusicNoteIcon className={classes.noCoverIcon}/>
      </div>
    )
  }
  const side = (
    <>
      {
        albumModel.album ? <img src={`${ApplicationConfig.apiUrl}${albumModel.album.cover}`} className={classes.cover}/> : <NoCover />
      }
      <div className={classes.actionContent}>
        <Button
          disableElevation
          startIcon={<PlayArrow />}
          color={'secondary'}
          variant={'contained'}
          className={classes.actionButton}
          fullWidth
          onClick={() => {
            playerModel.playAlbum(albumId)
          }}
        >
          Play
        </Button>
        <Button
          disableElevation
          startIcon={<PlaylistAdd />}
          variant={'outlined'}
          className={classes.actionButton}
          fullWidth
          onClick={() => {
            playerModel.addAlbumToPlaylist(albumId)
          }}
        >
          Add to playlist
        </Button>
      </div>
    </>
  )
  return (
    <SideLayout side={side}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Artist
      </Typography>
      <Grid container className={classes.artistContainer}>
        {albumModel.album && albumModel.album.artist.map((artist) => (
          <Grid item key={artist.id} className={classes.item}>
            <AlbumArtistItem artist={artist}/>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Music
      </Typography>
      <List>
        {
          albumModel.album && albumModel.album.music.map((music) => (
            <ListItem button key={music.id} >
              <ListItemAvatar>
                <Avatar className={classes.musicAvatar}>
                  <MusicNoteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listText} primary={music.title} secondary={getMusicArtistString(music)} />
              <ListItemSecondaryAction>
                <IconButton>
                  <PlaylistAdd fontSize="inherit" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </SideLayout>
  )
}
export default AlbumPage
