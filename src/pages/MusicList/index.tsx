import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import { getQueryParamsFromSearch } from '../../utils/url'
import GridContainer from '../../components/MusicList'
import useMusicListModel from './model'
import theme from '../../theme'
import MusicItem from '../../components/MusicItem'
import usePlayerModel from '../../models/player'
import useLayoutModel from '../../models/layout'

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
const MusicListPage = ():React.ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const musicListModel = useMusicListModel()
  const layoutModel = useLayoutModel()
  const { artist } = getQueryParamsFromSearch(history.location.search)
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    musicListModel.loadData(artist, {})
  })
  const playerModel = usePlayerModel()

  return (
    <div className={classes.main}>
      <GridContainer
        onPageChange={(page) => musicListModel.loadData(artist, { page })}
        total={musicListModel.total}
        source={musicListModel.musicList}
        itemClassName={classes.item}
        containerProps={{
          spacing: 2
        }}
        builder={(music) => <MusicItem music={music} onClick={() => playerModel.playMusic(music)}/>}
        getItemKey={music => music.id}
      />
    </div>
  )
}
export default MusicListPage
