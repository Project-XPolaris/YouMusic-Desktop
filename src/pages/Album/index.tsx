import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import useLayoutModel from '../../models/layout'
import { useParams } from 'react-router-dom'
import useAlbumModel from './model'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import ArtistItem from '../../components/ArtistItem'

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
    padding: theme.spacing(2)
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
  item: {
    width: 120,
    marginRight:theme.spacing(2),
    marginBottom:theme.spacing(2)
  },
})

interface AlbumPagePropsType {

}

const AlbumPage = ({}: AlbumPagePropsType) => {
  const { albumId } = useParams()

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
  return (
    <div className={classes.main}>
      <div className={classes.side}>
        <NoCover />
      </div>
      <div className={classes.content}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          Artist
        </Typography>
        {albumModel.album && albumModel.album.artist.map((artist) => (
          <Grid container item key={artist.id} className={classes.item}>
            <ArtistItem artist={artist} />
          </Grid>
        ))}
      </div>
    </div>
  )
}
export default AlbumPage
