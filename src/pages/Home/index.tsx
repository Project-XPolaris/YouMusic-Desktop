import * as React from 'react'
import { createStyles, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import useHomeModel from './model'
import AlbumCollection from '../../components/AlbumCollection'
import { useEffect } from 'react'
import ArtistCollection from '../../components/ArtistCollection';

const HomePage = ({}) => {
  const classes = useStyles()
  const model = useHomeModel()
  useEffect(() => {
    model.initData()
  }, [])
  return (
    <div className={classes.root}>
      {
        model.albumList && <AlbumCollection title={'New album'} albums={model.albumList} className={classes.collection} />
      }
      {
        model.artistList && <ArtistCollection title={'New artist'} artistList={model.artistList} className={classes.collection} />
      }
    </div>
  )
}

export default HomePage
