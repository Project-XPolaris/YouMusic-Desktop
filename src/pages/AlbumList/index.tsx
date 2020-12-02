import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import useLayoutModel from '../../models/layout'
import { getQueryParamsFromSearch } from '../../utils/url'
import { useHistory } from 'react-router-dom'
import useAlbumListModel from './model'
import MusicItem from '../../components/MusicItem'
import GridContainer from '../../components/MusicList'
import AlbumItem from '../../components/AlbumItem'

const useStyles = makeStyles({
  main: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(10)
  },
  item: {
    width: 160,
    marginBottom: theme.spacing(1)
  }
})

interface AlbumListPagePropsType {

}
const AlbumListPage = ({}: AlbumListPagePropsType) => {
  const classes = useStyles()
  const history = useHistory()

  const albumListModel = useAlbumListModel()
  const layoutModel = useLayoutModel()
  const { artist } = getQueryParamsFromSearch(history.location.search)
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    albumListModel.loadData(artist, {})
  })
  return (
    <div className={classes.main}>
      <GridContainer
        onPageChange={(page) => albumListModel.loadData(artist, { page })}
        total={albumListModel.total}
        source={albumListModel.albumList}
        itemClassName={classes.item}
        containerProps={{
          spacing: 2
        }}
        builder={(album) => <AlbumItem album={album} onClick={(album) => {}} onTitleClick={() => {}}/>}
        getItemKey={album => album.id}
      />
    </div>
  )
}
export default AlbumListPage
