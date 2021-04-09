import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import AlbumIcon from '@material-ui/icons/Album'
import PersonIcon from '@material-ui/icons/Person'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import useStyles from './style'
import useLayoutModel, { TabIndex } from '../../models/layout'
import { useHistory } from 'react-router-dom'
import { LibraryMusic, Person } from '@material-ui/icons';

const NavItems: {
  icon: React.ReactElement, title: string, index: TabIndex, path: string
}[] = [
  {
    icon: <HomeIcon />,
    title: 'Home',
    index: 'Home',
    path: '/home'
  },
  {
    icon: <AlbumIcon />,
    title: 'Album',
    index: 'AlbumList',
    path: '/home/album'
  },
  {
    icon: <PersonIcon />,
    title: 'Artist',
    index: 'ArtistList',
    path: '/home/artist'
  },
  {
    icon: <MusicNoteIcon />,
    title: 'Music',
    index: 'MusicList',
    path: '/home/music'
  },
  {
    icon: <LibraryMusic />,
    title: 'Library',
    index: 'Library',
    path: '/home/library'
  },
  {
    icon: <Person />,
    title: 'Person',
    index: 'Person',
    path: '/home/account'
  }
]
const Nav = () => {
  const classes = useStyles()
  const layoutModel = useLayoutModel()
  const history = useHistory()
  return (
    <div className={classes.root}>
      <List component='nav'>
        {NavItems.map((item) => (
          <ListItem
            key={item.index}
            button
            selected={layoutModel.activeIndex === item.index}
            onClick={() => {
              layoutModel.setActiveIndex(item.index)
              history.push(item.path)
              console.log(item)
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
export default Nav
