import React, { SyntheticEvent, useEffect, useState } from 'react'
import { IconButton, LinearProgress, Slider, Typography, withStyles } from '@material-ui/core'
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
import { VolumeDown } from '@material-ui/icons'
import { useLocalStorageState } from 'ahooks'
import useStyles from './style'
import clsx from 'clsx'

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
const PlayBar = ({ onMusicClick, className }:{ onMusicClick:() => void, className?:string }): React.ReactElement => {
  const classes = useStyles()
  const playerModel = usePlayerModel()
  const layoutModel = useLayoutModel()
  const currentMusic = playerModel.getCurrentPlay()
  const [saveVolume, setSaveVolume] = useLocalStorageState('saveVolume', 0)
  const {
    togglePlayPause,
    playing,
    volume,
    ended,
    stop,
    load,
    loading,
    player
  } = useAudioPlayer()
  useEffect(() => {
    if (currentMusic) {
      if (player != null) {
        player.unload()
      }
      load({
        src: getPlayerUrl(currentMusic),
        format: ['mp3'],
        autoplay: true,
        volume: saveVolume / 100
      })
    }
  }, [currentMusic])
  useEffect(() => {
    volume(saveVolume / 100)
  }, [playerModel.getCurrentPlay()])
  useEffect(() => {
    volume(saveVolume / 100)
  }, [saveVolume])
  const [sliderValue, setSliderValue] = useState(-1)
  const {
    percentComplete,
    duration,
    seek
  } = useAudioPosition({ highRefreshRate: true })
  const onSliderChange = (_: SyntheticEvent, value:number | number[]) => {
    if (Array.isArray(value)) {
      return
    }
    setSliderValue(value)
  }
  const onSliderCommit = (_: SyntheticEvent, value:number | number[]) => {
    if (Array.isArray(value)) {
      return
    }
    setSliderValue(-1)
    seek(duration * value / 100)
  }
  useEffect(() => {
    if (ended && playerModel.playIndex < playerModel.playlist.length - 1) {
      playerModel.nextMusic()
      togglePlayPause()
    }
  }, [ended])
  useEffect(() => {
    playerModel.setCurrentPlayTime(percentComplete * duration * 10)
  }, [percentComplete])
  return (
    <div className={clsx(classes.root, className)}>
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
            <img
              src={getMusicAlbumCoverUrl(currentMusic)}
              className={classes.cover}
              alt={currentMusic.title}
              onClick={onMusicClick}
            />
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
            {
              loading && playerModel.playlist.length > 0 ? <div className={classes.loading}>
                <LinearProgress color="secondary" />
              </div>
                : <div className={classes.buttons}>
                  <IconButton onClick={() => playerModel.previousMusic()} className={classes.controlButton} >
                    <SkipPreviousIcon />
                  </IconButton>

                  <IconButton onClick={() => togglePlayPause()} className={classes.controlButton}>
                    {(playing ?? false) ? <PauseIcon fontSize="large" color="primary" /> : <PlayArrowIcon fontSize="large" color="primary"/>}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      stop()
                      playerModel.nextMusic()
                    }}
                    className={classes.controlButton}
                  >
                    <SkipNextIcon />
                  </IconButton>

                </div>
            }
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
            value={saveVolume}
            onChange={(_, value:number | number[]) => {
              if (Array.isArray(value)) {
                return
              }
              setSaveVolume(value)
            }}
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
