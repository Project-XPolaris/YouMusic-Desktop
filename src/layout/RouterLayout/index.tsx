import React, { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import HomePage from '../../pages/Home'
import AlbumListPage from '../../pages/Home/AlbumList'
import ArtistListPage from '../../pages/Home/MusicList'
import MusicListPage from '../../pages/Home/ArtistList'
const RouterLayout = ():ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/albumlist">
          <AlbumListPage />
        </Route>
        <Route path="/artistlist">
          <ArtistListPage />
        </Route>
        <Route path="/musiclist">
          <MusicListPage />
        </Route>
      </Switch>
    </Router>
  )
}
export default RouterLayout
