import * as React from 'react'
import { createStyles, Grid, Pagination, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../components/AlbumItem'
import ArtistItem from '../../components/ArtistItem'
import { useMount } from 'ahooks'
import useArtistListModel from './model'

const ArtistListPage = ():React.ReactElement => {
  const classes = useStyles()
  const artistModel = useArtistListModel()
  useMount(async () => {
    await artistModel.fetchArtist({})
  })
  return (
    <div className={classes.root}>
      <Grid container>
        {artistModel.data.map((artist) => (
          <Grid container item key={artist.id} className={classes.item}>
            <ArtistItem artist={artist} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={artistModel.total / 55} onChange={(event, page) => artistModel.fetchArtist({ page })} />
    </div>
  )
}

export default ArtistListPage
