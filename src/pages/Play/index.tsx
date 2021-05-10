import React, { useEffect, useState } from 'react'
import useLayoutModel from '../../models/layout'
import useStyles from './style'
import { Tab, Tabs } from '@material-ui/core'
import usePlayerModel from '../../models/player'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import { getAlbumArtistString } from '../../utils/album'

export interface PlayPagePropsType {

}

const PlayPage = ({}: PlayPagePropsType) => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const playModel = usePlayerModel()

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }
  useEffect(() => {
    layoutModel.setNavIcon('Back')
  }, [])
  const currentPlay = playModel.getCurrentPlay()
  if (!currentPlay) {
    return (
      <div></div>
    )
  }
  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tab}
        textColor={'secondary'}
        indicatorColor={'secondary'}
        value={tabIndex}
        onChange={onTabChange}
      >
        <Tab label="Cover" />
        <Tab label="Lyrics" />
      </Tabs>
      {
        tabIndex === 0 &&
        <div className={classes.musicView}>
          <img src={getMusicAlbumCoverUrl(currentPlay)} className={classes.cover} />

          <div className={classes.name}>
            { currentPlay.title }
          </div>
          <div className={classes.album}>
            {currentPlay.album?.name}
          </div>
          <div className={classes.artist}>
            { currentPlay.artist.map(it => it.name).join('/') }
          </div>
        </div>
      }

    </div>
  )
}

export default PlayPage
