import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import HomePage from '../../pages/Home'
import AlbumListPage from '../../pages/AlbumList'
import ArtistListPage from '../../pages/MusicList'
import MusicListPage from '../../pages/ArtistList'
const RouterLayout = () => {
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
