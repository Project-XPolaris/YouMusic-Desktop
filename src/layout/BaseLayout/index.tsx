import * as React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Nav from '../Nav'
import useStyles from './style'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../../pages/Home'
import AlbumListPage from '../../pages/AlbumList'
import ArtistListPage from '../../pages/ArtistList'
import MusicListPage from '../../pages/MusicList'
import PlayBar from '../PlayBar'
import { AudioPlayerProvider } from 'react-use-audio-player'

const BaseLayout = ():React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            YouMusic
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <Router>
          <div className={classes.nav}>
            <Nav />
          </div>
          <Switch>
            <Route path="/albumlist">
              <div className={classes.content}>
                <AlbumListPage />
              </div>
            </Route>
            <Route path="/artistlist">
              <div className={classes.content}>
                <ArtistListPage />
              </div>
            </Route>
            <Route path="/musiclist">
              <div className={classes.content}>
                <MusicListPage />
              </div>
            </Route>
            <Route path="/">
              <div className={classes.content}>
                <HomePage />
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
  )
}

export default BaseLayout
