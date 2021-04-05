import * as React from 'react'
import { createStyles, Grid, Pagination, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../../components/AlbumItem'
import ArtistItem from '../../../components/ArtistItem'
import { useMount } from 'ahooks'
import useArtistListModel from './model'
import { useHistory } from 'react-router-dom'

const ArtistListPage = ():React.ReactElement => {
  const classes = useStyles()
  const artistModel = useArtistListModel()
  const history = useHistory()
  useMount(async () => {
    await artistModel.fetchArtist({})
  })
  return (
    <div className={classes.root}>
      <Grid container>
        {artistModel.data.map((artist) => (
          <Grid container item key={artist.id} className={classes.item}>
            <ArtistItem artist={artist} onClick={(artist) => history.push(`/artist/${artist.id}`)}/>
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(artistModel.total / 55)} onChange={(event, page) => artistModel.fetchArtist({ page })} />
    </div>
  )
}

export default ArtistListPage
