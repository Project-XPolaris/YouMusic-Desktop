import * as React from 'react'
import { AppBar, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import useStyles from './style'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PlaylistDrawer from '../Playlist'
import { HomeLayout } from '../HomeLayout'
import AlbumPage from '../../pages/Album'
import useLayoutModel from '../../models/layout'
import { ArrowBack, ExitToApp, Link, MusicNote } from '@material-ui/icons'
import ArtistPage from '../../pages/Artist'
import MusicListPage from '../../pages/MusicList'
import AlbumListPage from '../../pages/AlbumList'
import MinimizeSharpIcon from '@material-ui/icons/MinimizeSharp'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import { electronApp, electronRemote } from '../../remote'
import PlayBarLayout from '../PlayBar/layout'
import StartPage from '../../pages/Start'
import { ApplicationConfig } from '../../config'
import { ipcRenderer } from 'electron'
import MusicEditDrawer from '../../components/MusicEditDrawer'
import ArtistPickDialog from '../../components/ArtistPickDialog'
import ArtistListEditDialog from '../../components/ArtistListEditDialog';
const BaseLayout = ():React.ReactElement => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const [linkMenuAnchor, setLinkMenuAnchor] = React.useState<null | HTMLElement>(null)

  const handleLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLinkMenuAnchor(event.currentTarget)
  }

  const handleLinkClose = () => {
    setLinkMenuAnchor(null)
  }
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
            <MusicNote />
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
      <Menu
        id="link-menu"
        anchorEl={linkMenuAnchor}
        keepMounted
        open={Boolean(linkMenuAnchor)}
        onClose={handleLinkClose}
      >
        <MenuItem
          onClick={() => {
            handleLinkClose()
            localStorage.removeItem(ApplicationConfig.keys.store.apiUrl)
            localStorage.removeItem(ApplicationConfig.keys.store.token)
            onClose()
          }}
        >
          <ExitToApp className={classes.menuIcon} />
          Disconnect service (restart)
        </MenuItem>
      </Menu>
      <PlaylistDrawer />
      <MusicEditDrawer />
      {/*<ArtistPickDialog*/}
      {/*  open={true}*/}
      {/*  onPick={(artist) => {}}*/}
      {/*/>*/}
      {/*<ArtistListEditDialog open={true} onCancel={() => {}} onOk={() => {}} initValue={["Oasis"]} />*/}
      <div>
        <AppBar position="fixed" elevation={0} className={classes.appbar}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <NavIcon />
            <Typography variant="h6" className={classes.title}>
            YouMusic
            </Typography>
            <IconButton className={classes.action} size='small' onClick={handleLinkClick}>
              <Link />
            </IconButton>
            <IconButton size='small' className={classes.windowAction} onClick={onMin}>
              <MinimizeSharpIcon className={classes.actionIcon} />
            </IconButton>
            <IconButton size='small' className={classes.windowAction} onClick={onMax}>
              <CheckBoxOutlineBlankSharpIcon className={classes.actionIcon} />
            </IconButton>
            <IconButton size='small' className={classes.windowAction} onClick={onClose}>
              <ClearSharpIcon className={classes.actionIcon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <Router>
            <Switch>
              <Route path="/home">
                <PlayBarLayout className={classes.content}>
                  <HomeLayout />
                </PlayBarLayout>
              </Route>
              <Route path="/album/:albumId">
                <PlayBarLayout className={classes.content}>
                  <AlbumPage />
                </PlayBarLayout>
              </Route>
              <Route path="/artist/:artistId">
                <PlayBarLayout className={classes.content}>
                  <ArtistPage />
                </PlayBarLayout>
              </Route>
              <Route path="/musiclist">
                <PlayBarLayout className={classes.content}>
                  <MusicListPage />
                </PlayBarLayout>
              </Route>
              <Route path="/albumlist">
                <PlayBarLayout className={classes.content}>
                  <AlbumListPage />
                </PlayBarLayout>
              </Route>
              <Route path="/">
                <div className={classes.content}>
                  <StartPage />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
        {/* <div className={classes.playerBar}> */}
        {/*  <AudioPlayerProvider> */}
        {/*    <PlayBar /> */}
        {/*  </AudioPlayerProvider> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default BaseLayout
