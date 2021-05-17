import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { getQueryParamsFromSearch } from '../../utils/url'
import useMusicListModel from './model'
import theme from '../../theme'
import usePlayerModel from '../../models/player'
import useLayoutModel from '../../models/layout'
import MusicListItem from '../../components/MusicListItem'
import { List, Pagination } from '@material-ui/core'

const useStyles = makeStyles({
  main: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(10)
  },
  list: {
    width: '100%'
  },
  item: {
    width: 160,
    marginBottom: theme.spacing(1)
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#303030'
    }
  }
})
const MusicListPage = ():React.ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const musicListModel = useMusicListModel()
  const layoutModel = useLayoutModel()
  const { artist, search } = getQueryParamsFromSearch(history.location.search)
  useEffect(() => {
    layoutModel.setNavIcon('Back')
    musicListModel.loadData({ artist, search })
  }, [])
  const playerModel = usePlayerModel()

  return (
    <div className={classes.main}>
      <List className={classes.list}>
        {musicListModel.musicList.map((music) => {
          return (
            <MusicListItem
              music={music}
              key={music.id}
              onClick={() => {
                playerModel.playMusic(music)
              }}
              selected={false}
            />
          )
        })}
      </List>
      <Pagination
        count={Math.floor(musicListModel.total / 55)}
        onChange={(event, page) => musicListModel.loadData({ page, artist, search })}
      />
    </div>
  )
}
export default MusicListPage
