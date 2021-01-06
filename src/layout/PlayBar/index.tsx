import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Grid, IconButton, Slider, Typography, withStyles } from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import PauseIcon from '@material-ui/icons/Pause'
import usePlayerModel from '../../models/player'
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player'
import { getMusicAlbumCoverUrl, getMusicArtistString, getPlayerUrl } from '../../utils/music'
import { playTimeText } from '../../utils/time'
import useLayoutModel from '../../models/layout'
import { VolumeDown, VolumeUp } from '@material-ui/icons'
import { useLocalStorageState } from 'ahooks'

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
    alignItems: 'center',
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
  volumeIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.contrastText
  },
  volumeSlider: {
    width: theme.spacing(10),
    color: theme.palette.primary.contrastText
  },
  buttons: {
    display: 'flex'
  },
  playSlider: {
    display: 'flex',
    alignItems: 'center'
  },
  timeLabel: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText
  },
  sliderbar: {
    width: '100%',
    position: 'absolute',
    top: -14

  },
  root: {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
})
const PlaySlider = withStyles({
  root: {
    color: '#E91E63',
    '&:hover .MuiSlider-thumb': {
      display: 'block'
    }
  },
  thumb: {
    display: 'none',
    '&:focus, &:hover, &$active': {
      boxShadow: 'none'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {},
  rail: {
    color: '#777777'
  }
})(Slider)
const PlayBar = (): React.ReactElement => {
  const classes = useStyles()
  const playerModel = usePlayerModel()
  const layoutModel = useLayoutModel()
  const currentMusic = playerModel.getCurrentPlay()
  const [saveVolume, setSaveVolume] = useLocalStorageState('saveVolume', 0)

  const {
    togglePlayPause,
    playing,
    volume
  } = useAudioPlayer({
    src: getPlayerUrl(currentMusic),
    format: 'mp3',
    autoplay: false
  })
  useEffect(() => {
    console.log(saveVolume / 100)
    volume(saveVolume / 100)
  }, [saveVolume])
  const [sliderValue, setSliderValue] = useState(-1)
  const {
    percentComplete,
    duration,
    seek
  } = useAudioPosition({ highRefreshRate: true })
  const onSliderChange = (_: any, value:any) => {
    setSliderValue(value)
  }
  const onSliderCommit = (_: any, value:any) => {
    setSliderValue(-1)
    seek(duration * value / 100)
  }

  return (
    <div className={classes.root}>
      <PlaySlider
        className={classes.sliderbar}
        min={0}
        max={100}
        onChange={onSliderChange}
        value={sliderValue !== -1 ? sliderValue : percentComplete}
        onChangeCommitted={onSliderCommit}
      />
      <div className={classes.main}>
        <div className={classes.info}>
          {currentMusic &&
          <>
            <img src={getMusicAlbumCoverUrl(currentMusic)}
              className={classes.cover} />
            <div>
              <div className={classes.title}>
                {currentMusic.title}
              </div>
              <div className={classes.title}>
                {getMusicArtistString(currentMusic)}
              </div>
            </div>
          </>
          }

        </div>
        <div className={classes.center}>
          <div className={classes.control}>
            <div className={classes.buttons}>
              <IconButton onClick={() => playerModel.previousMusic()} >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton onClick={() => togglePlayPause()}>
                {(playing ?? false) ? <PauseIcon fontSize="large" color="primary" /> : <PlayArrowIcon fontSize="large" color="primary" />}
              </IconButton>
              <IconButton onClick={() => playerModel.nextMusic()}>
                <SkipNextIcon />
              </IconButton>

            </div>
          </div>
        </div>
        <div className={classes.right}>
          <Typography variant='body2' className={classes.timeLabel}>
            {playTimeText(duration * (sliderValue !== -1 ? sliderValue : percentComplete))}
          </Typography>
          <Typography variant='body2' className={classes.timeLabel}>
            /
          </Typography>
          <Typography variant='body2' className={classes.timeLabel}>
            {playTimeText(duration * 100)}
          </Typography>
          <VolumeDown className={classes.volumeIcon} />
          <Slider
            className={classes.volumeSlider}
            max={100}
            min={0}
            value={saveVolume} onChange={(_, value:any) => setSaveVolume(value)}
          />
          <IconButton>
            <SyncIcon />
          </IconButton>
          <IconButton onClick={() => layoutModel.switchPlaylistDrawer()}>
            <QueueMusicIcon />
          </IconButton>
        </div>
      </div>
    </div>

  )
}
export default PlayBar
