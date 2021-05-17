import React, { ReactElement, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import useLayoutModel from '../../models/layout'
import { getQueryParamsFromSearch } from '../../utils/url'
import { useHistory } from 'react-router-dom'
import useAlbumListModel from './model'
import GridContainer from '../../components/MusicList'
import AlbumItem from '../../components/AlbumItem'
import usePlayerModel from '../../models/player'

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

const AlbumListPage = ():ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const albumListModel = useAlbumListModel()
  const layoutModel = useLayoutModel()
  const playModel = usePlayerModel()
  const { artist, search } = getQueryParamsFromSearch(history.location.search)
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    albumListModel.loadData({ artist, search })
  },[])
  return (
    <div className={classes.main}>
      <GridContainer
        onPageChange={(page) => albumListModel.loadData({ page, artist, search })}
        total={albumListModel.total}
        source={albumListModel.albumList}
        itemClassName={classes.item}
        containerProps={{
          spacing: 2
        }}
        builder={(album) =>
          <AlbumItem
            album={album}
            onClick={(album) => playModel.playAlbum(album.id)}
            onTitleClick={() => { history.push(`album/${album.id}`) }}
          />
        }
        getItemKey={album => album.id}
      />
    </div>
  )
}
export default AlbumListPage
