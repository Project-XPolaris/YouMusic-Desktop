import * as React from 'react'
import { createStyles, Grid, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../components/AlbumItem'
import useAlbumListModel from './model'
import { useMount } from 'ahooks'

const AlbumListPage = ():React.ReactElement => {
  const classes = useStyles()
  const albumListModel = useAlbumListModel()
  useMount(async () => {
    await albumListModel.fetchAlbum()
  })
  console.log(albumListModel.data)
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        {albumListModel.data.map((album) => (
          <Grid container item key={album.id} className={classes.item}>
            <AlbumItem album={album} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default AlbumListPage
