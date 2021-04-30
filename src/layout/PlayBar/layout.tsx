import React, { ReactElement, ReactNode } from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import PlayBar from './index'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
  playerBar: {
    height: 72,
    width: '100vw',
    backgroundColor: '#202020',
    position: 'fixed',
    zIndex: 100,
    bottom: 0
  }
}))
const PlayBarLayout = ({ children, className }:{children?:ReactNode, className?:string}):ReactElement => {
  const classes = useStyles()
  return (
    <div className={className}>
      { children }
      <div className={classes.playerBar}>
        <AudioPlayerProvider>
          <PlayBar />
        </AudioPlayerProvider>
      </div>
    </div>
  )
}
export default PlayBarLayout
