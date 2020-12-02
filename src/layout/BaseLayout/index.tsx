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
import { ArrowBack } from '@material-ui/icons'
import ArtistPage from '../../pages/Artist'
import MusicListPage from '../../pages/MusicList'
import AlbumListPage from '../../pages/AlbumList'

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
  return (
    <>
      <PlaylistDrawer />
      <div>
        <AppBar position="fixed" elevation={0} className={classes.appbar}>
          <Toolbar>
            <NavIcon />
            <Typography variant="h6" className={classes.title}>
            YouMusic
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <Router>
            <Switch>
              <Route path="/home">
                <div className={classes.content}>
                  <HomeLayout />
                </div>
              </Route>
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
