import React, { ReactElement, ReactNode, useState } from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import PlayBar from './index'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'
import PlayPage from '../../pages/Play'
const useStyles = makeStyles((theme) => ({
  playerBar: {
    height: 72,
    width: '100vw',
    backgroundColor: '#202020',
    position: 'fixed',
    zIndex: 5000,
    bottom: 0
  },
  bar: {
    zIndex: theme.zIndex.drawer + 1
  },
  playDrawer: {
    width: '100vw',
    backgroundColor: '#171717'

  },
  playerDrawerContent: {
    width: '100%',
    height: '100vh'
  }
}))
const PlayBarLayout = ({ children, className }:{children?:ReactNode, className?:string}):ReactElement => {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  return (
    <div className={className}>
      { children }
      <div className={classes.playerBar}>
        <AudioPlayerProvider>
          <Drawer
            open={isDrawerOpen}
            anchor='bottom'
            onClose={() => setIsDrawerOpen(false)}
          >
            <div className={classes.playDrawer}>
              <div className={classes.playerDrawerContent}>
                <PlayPage onCollapse={() => setIsDrawerOpen(false)} />
              </div>
            </div>
          </Drawer>
          <PlayBar onMusicClick={() => setIsDrawerOpen(true)} className={classes.bar} />
        </AudioPlayerProvider>
      </div>
    </div>
  )
}
export default PlayBarLayout
