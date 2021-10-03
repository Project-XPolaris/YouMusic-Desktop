import React, { ReactElement, useEffect, useRef, useState } from 'react'
import useLayoutModel from '../../models/layout'
import useStyles from './style'
import { IconButton, Tab, Tabs } from '@material-ui/core'
import usePlayerModel from '../../models/player'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import clsx from 'clsx'
import { ExpandMore } from '@material-ui/icons'

export interface PlayPagePropsType {
  onCollapse:() => void
}

const PlayPage = ({ onCollapse }: PlayPagePropsType):ReactElement => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [lyricIndex, setLyricIndex] = useState(0)
  const playModel = usePlayerModel()
  const lyricsContainerRef : any = useRef<HTMLDivElement>()
  useEffect(() => {
    const lyricTime = playModel.lyrics?.manager.getLyricTimeByTime(playModel.currentPlayTime)
    if (!lyricTime) {
      return
    }
    if (!playModel.lyrics?.manager.lines.length) {
      return
    }
    for (let i = 0; i < playModel.lyrics.manager.lines.length; i++) {
      if (playModel.lyrics.manager.lines[i].time === lyricTime && i !== lyricIndex) {
        setLyricIndex(i)
      }
    }
  }, [playModel.currentPlayTime])
  useEffect(() => {
    if (lyricsContainerRef === null || !lyricsContainerRef.current) {
      return
    }
    const lyricLineElement = lyricsContainerRef.current?.children.item(lyricIndex)
    if (!lyricLineElement) {
      return
    }
    lyricLineElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }, [lyricIndex])
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
      <div className={classes.header}>
        <IconButton onClick={onCollapse}>
          <ExpandMore />
        </IconButton>
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
      </div>

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
      {
        tabIndex === 1 && playModel.lyrics &&
        <div className={classes.musicView}>
          <div className={classes.lyricsContainer} ref={lyricsContainerRef}>
            {
              playModel.lyrics.manager.lines.map((line) => {
                return (
                  <div className={clsx(
                    classes.lyricLine,
                    playModel.lyrics?.manager.getLyricTimeByTime(playModel.currentPlayTime) === line.time ? classes.lyricActive : classes.lyricInactive
                  )} key={line.time}>
                    { line.text }
                  </div>
                )
              })
            }
          </div>
        </div>
      }

    </div>
  )
}

export default PlayPage
