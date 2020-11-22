import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { IconButton, Slider, Typography } from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import PauseIcon from '@material-ui/icons/Pause'
import usePlayerModel from '../../model/player'
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player'
import { getMusicAlbumCoverUrl, getMusicArtistString, getPlayerUrl } from '../../utils/music'
import { playTimeText } from '../../utils/time'

const useStyles = makeStyles({
  main: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16
  },
  cover: {
    width: 48,
    height: 48,
    objectFit: 'cover',
    marginRight: theme.spacing(2)
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    width: '30vw'
  },
  title: {
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  artist: {
    ...theme.typography.body2,
    color: theme.palette.primary.contrastText,
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  center: {
    flexGrow: 1,
    textAlign: 'center'
  },
  right: {
    width: '30vw',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: theme.spacing(4)
  },
  control: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex'
  },
  playSlider: {
    display: 'flex',
    alignItems: 'center'
  },
  timeLabel: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
})

interface PlayBarPropsType {

}

const PlayBar = ({}: PlayBarPropsType) => {
  const classes = useStyles()
  const playerModel = usePlayerModel()
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: getPlayerUrl(playerModel.currentMusic),
    format: 'mp3',
    autoplay: false
  })
  const [sliderValue, setSliderValue] = useState(-1)
  const { percentComplete, duration, seek } = useAudioPosition({ highRefreshRate: true })
  const onSliderChange = (_, value) => {
    setSliderValue(value)
  }
  const onSliderCommit = (_, value) => {
    setSliderValue(-1)
    seek(duration * value / 100)
  }

  return (
    <div className={classes.main}>
      <div className={classes.info}>
        {playerModel.currentMusic &&
          <>
            <img src={getMusicAlbumCoverUrl(playerModel.currentMusic)}
              className={classes.cover} />
            <div>
              <div className={classes.title}>
                {playerModel.currentMusic.title}
              </div>
              <div className={classes.title}>
                {getMusicArtistString(playerModel.currentMusic)}
              </div>
            </div>
          </>
        }

      </div>
      <div className={classes.center}>
        <div className={classes.control}>
          <div className={classes.buttons}>
            <IconButton>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={() => togglePlayPause()}>
              {(playing ?? false) ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
          <div className={classes.playSlider}>
            <Typography variant="body2" className={classes.timeLabel} >
              {playTimeText(duration * (sliderValue !== -1 ? sliderValue : percentComplete))}
            </Typography>
            <Slider
              style={{ width: 300 }}
              color={'secondary'}
              min={0}
              max={100}
              onChange={onSliderChange}
              value={sliderValue !== -1 ? sliderValue : percentComplete}
              onChangeCommitted={onSliderCommit}
            />
            <Typography variant="body2" className={classes.timeLabel} >
              {playTimeText(duration * 100)}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <IconButton>
          <SyncIcon />
        </IconButton>
        <IconButton>
          <QueueMusicIcon />
        </IconButton>
      </div>
    </div>
  )
}
export default PlayBar