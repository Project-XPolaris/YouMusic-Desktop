import React, { ReactElement, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import useLayoutModel from '../../models/layout'
import { getQueryParamsFromSearch } from '../../utils/url'
import { useHistory } from 'react-router-dom'
import useArtistListModel from './model'
import GridContainer from '../../components/MusicList'
import ArtistItem from '../../components/ArtistItem'

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

const ArtistListPage = ():ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const artistListModel = useArtistListModel()
  const layoutModel = useLayoutModel()
  const { search } = getQueryParamsFromSearch(history.location.search)
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    artistListModel.loadData({ search })
  }, [])
  return (
    <div className={classes.main}>
      <GridContainer
        onPageChange={(page) => artistListModel.loadData({ page, search })}
        total={artistListModel.total}
        source={artistListModel.artistList}
        itemClassName={classes.item}
        containerProps={{
          spacing: 2
        }}
        builder={(artist) =>
          <ArtistItem
            artist={artist}
            onClick={(artist) => history.push(`artist/${artist.id}`)}
          />
        }
        getItemKey={artist => artist.id}
      />
    </div>
  )
}
export default ArtistListPage
