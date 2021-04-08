import * as React from 'react'
import { useEffect, useState } from 'react'
import { Grid, Pagination } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../../components/AlbumItem'
import useAlbumListModel from './model'
import usePlayerModel from '../../../models/player'
import { useHistory } from 'react-router-dom'
import AlbumFilter, { AlbumFilterData } from '../../../components/AlbumFilter'

const AlbumListPage = (): React.ReactElement => {
  const classes = useStyles()
  const albumListModel = useAlbumListModel()
  const playerModel = usePlayerModel()
  const history = useHistory()
  const [filter, setFilter] = useState<AlbumFilterData>({
    order: '-id'
  })
  useEffect(() => {
    (async () => {
      await albumListModel.fetchAlbum({ ...filter })
    })()
  }, [filter])
  // useMount(async () => {
  //   await albumListModel.fetchAlbum({})
  // })
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <AlbumFilter filter={filter} onChange={(newFilter) => setFilter(newFilter)}/>
      </div>
      <Grid container className={classes.grid}>
        {albumListModel.data.map((album) => (
          <Grid item key={album.id} className={classes.item}>
            <AlbumItem
              album={album}
              onClick={(album) => playerModel.playAlbum(album.id)}
              onTitleClick={(album) => history.push(`/album/${album.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(albumListModel.total / 55)}
        onChange={(event, page) => albumListModel.fetchAlbum({ page })} />
    </div>
  )
}

export default AlbumListPage
