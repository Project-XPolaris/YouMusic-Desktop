import * as React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './style'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PlayBar from '../PlayBar'
import { AudioPlayerProvider } from 'react-use-audio-player'
import PlaylistDrawer from '../Playlist'
import { HomeLayout } from '../HomeLayout'
import AlbumPage from '../../pages/Album'
import useLayoutModel from '../../models/layout'
import { ArrowBack, Remove } from '@material-ui/icons'
import ArtistPage from '../../pages/Artist'
import MusicListPage from '../../pages/MusicList'
import AlbumListPage from '../../pages/AlbumList'
import MinimizeSharpIcon from '@material-ui/icons/MinimizeSharp'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import { electronApp, electronRemote, isElectron } from '../../remote'

const BaseLayout = ():React.ReactElement => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const NavIcon = () => {
    switch (layoutModel.navIcon) {
      case 'Menu':
        return (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        )
      case 'Back':
        return (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.back()}
          >
            <ArrowBack />
          </IconButton>
        )
    }
  }
  const onClose = () => {
    electronApp.exit()
  }
  const onMin = () => {
    electronRemote.BrowserWindow.getFocusedWindow().minimize()
  }
  const onMax = () => {
    const currentWindow = electronRemote.BrowserWindow.getFocusedWindow()
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
  }
  return (
    <>
      <PlaylistDrawer />
      <div>
        <AppBar position="fixed" elevation={0} className={classes.appbar}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <NavIcon />
            <Typography variant="h6" className={classes.title}>
            YouMusic
            </Typography>
            {
              isElectron() &&
                <>
                  <IconButton size='small' className={classes.windowAction} onClick={onMin}>
                    <MinimizeSharpIcon className={classes.actionIcon} />
                  </IconButton>
                  <IconButton size='small' className={classes.windowAction} onClick={onMax}>
                    <CheckBoxOutlineBlankSharpIcon className={classes.actionIcon} />
                  </IconButton>
                  <IconButton size='small' className={classes.windowAction} onClick={onClose}>
                    <ClearSharpIcon className={classes.actionIcon} />
                  </IconButton>
                </>
            }
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <Router>
            <Switch>

              <Route path="/album/:albumId">
                <div className={classes.content}>
                  <AlbumPage />
                </div>
              </Route>
              <Route path="/artist/:artistId">
                <div className={classes.content}>
                  <ArtistPage />
                </div>
              </Route>
              <Route path="/musiclist">
                <div className={classes.content}>
                  <MusicListPage />
                </div>
              </Route>
              <Route path="/albumlist">
                <div className={classes.content}>
                  <AlbumListPage />
                </div>
              </Route>
              <Route path="/home">
                <div className={classes.content}>
                  <HomeLayout />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
        <div className={classes.playerBar}>
          <AudioPlayerProvider>
            <PlayBar />
          </AudioPlayerProvider>
        </div>
      </div>
    </>
  )
}

export default BaseLayout
