import * as React from 'react'
import { createStyles, Grid, Pagination, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../components/AlbumItem'
import useAlbumListModel from './model'
import { useMount } from 'ahooks'
import usePlayerModel from '../../models/player';

const AlbumListPage = ():React.ReactElement => {
  const classes = useStyles()
  const albumListModel = useAlbumListModel()
  const playerModel = usePlayerModel()
  useMount(async () => {
    await albumListModel.fetchAlbum({})
  })
  console.log(albumListModel.data)
  return (
    <div className={classes.root}>
      <Grid container>
        {albumListModel.data.map((album) => (
          <Grid container item key={album.id} className={classes.item}>
            <AlbumItem album={album} onClick={(album) => playerModel.playAlbum(album.id)}/>
          </Grid>
        ))}
      </Grid>
      <Pagination count={albumListModel.total / 55} onChange={(event, page) => albumListModel.fetchAlbum({ page })} />
    </div>
  )
}

export default AlbumListPage
