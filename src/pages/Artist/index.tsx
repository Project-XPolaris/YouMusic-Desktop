import React, { useEffect } from 'react'
import SideLayout from '../../layout/SideLayout'
import useLayoutModel from '../../models/layout'
import { Person } from '@material-ui/icons'
import { Button, Grid, Link, Typography } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import useArtistModel from './model'
import MusicItem from '../../components/MusicItem'
import usePlayerModel from '../../models/player'
import AlbumItem from '../../components/AlbumItem'
import { getImageUrl } from '../../utils/image'
import useStyles from './style'

interface ArtistPagePropsType {

}

const ArtistPage = ({}: ArtistPagePropsType) => {
  const { artistId } = useParams()
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const artistModel = useArtistModel()
  const playerModel = usePlayerModel()
  const history = useHistory()
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    artistModel.loadData(artistId)
  }, [])
  const NoCover = () => {
    return (
      <div className={classes.noCover}>
        <Person className={classes.noCoverIcon} />
      </div>
    )
  }
  const Side = () => {
    return (
      <>
        {
          artistModel.artist?.avatar
            ? <img src={getImageUrl(artistModel.artist.avatar)} className={classes.cover} />
            : <NoCover />
        }
        <div className={classes.sideContent}>
          <div className={classes.artistName}>
            {artistModel.artist?.name ?? 'Unknown'}
          </div>
        </div>
      </>
    )
  }
  return (
    <SideLayout side={<Side />}>
      <div className={classes.header}>
        <Typography variant='h5' gutterBottom className={classes.title}>
          Music
        </Typography>
        <Link
          className={classes.link}
          onClick={() => history.push(`/musiclist?artist=${artistId}`)}
        >
          More
        </Link>
      </div>

      <Grid container spacing={2}>
        {
          artistModel.musicList.map(music => (
            <Grid item key={music.id}>
              <MusicItem music={music} onClick={() => playerModel.playMusic(music)} />
            </Grid>
          ))
        }
      </Grid>
      <div className={classes.header}>
        <Typography variant='h5' gutterBottom className={classes.title}>
          Album
        </Typography>
        <Link
          onClick={() => history.push(`/albumlist?artist=${artistId}`)}
          className={classes.link}
        >More</Link>
      </div>
      <Grid container spacing={2}>
        {
          artistModel.albumList.map(album => (
            <Grid item key={album.id}>
              <AlbumItem
                onClick={() => playerModel.playAlbum(album.id)}
                onTitleClick={() => history.push(`/album/${album.id}`)}
                album={album}
              />
            </Grid>
          ))
        }
      </Grid>
    </SideLayout>
  )
}
export default ArtistPage
