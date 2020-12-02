import React, { useEffect } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import HomePage from '../../pages/Home'
import AlbumListPage from '../../pages/Home/AlbumList'
import Nav from '../Nav'
import useStyles from './style'
import ArtistListPage from '../../pages/Home/ArtistList'
import MusicListPage from '../../pages/Home/MusicList'
import useLayoutModel from '../../models/layout'

export const HomeLayout = () => {
  const classes = useStyles()
  const { path, url } = useRouteMatch()
  const layoutModel = useLayoutModel()
  if (layoutModel.navIcon !== 'Menu') {
    layoutModel.setNavIcon('Menu')
  }
  return (
    <div className={classes.main}>
      <div className={classes.nav}>
        <Nav />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={`${path}/album`}>
            <AlbumListPage />
          </Route>
          <Route path={`${path}/artist`}>
            <ArtistListPage />
          </Route>
          <Route path={`${path}/music`}>
            <MusicListPage />
          </Route>
          <Route path={path}>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
