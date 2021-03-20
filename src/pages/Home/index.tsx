import * as React from 'react'
import { createStyles, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import useHomeModel from './model'
import AlbumCollection from '../../components/AlbumCollection'
import { useEffect } from 'react'
import ArtistCollection from '../../components/ArtistCollection'
import { useHistory } from 'react-router-dom'
import usePlayerModel from '../../models/player'

const HomePage = ({}) => {
  const classes = useStyles()
  const model = useHomeModel()
  const history = useHistory()
  const playerModel = usePlayerModel()
  useEffect(() => {
    model.initData()
  }, [])
  return (
    <div className={classes.root}>
      {
        model.albumList && <AlbumCollection
          title={'New album'}
          albums={model.albumList}
          className={classes.collection}
          onTitleClick={(album) => history.push(`/album/${album.id}`)}
          onItemClick={(album) => playerModel.playAlbum(album.id)}
        />
      }
      {
        model.artistList &&
        <ArtistCollection
          title={'New artist'}
          artistList={model.artistList}
          className={classes.collection}
          onItemClick={(artist) => history.push(`/artist/${artist.id}`) }
        />
      }
    </div>
  )
}

export default HomePage
