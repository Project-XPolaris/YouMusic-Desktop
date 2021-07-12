import useStyles from './style'
import React, { MouseEventHandler, ReactElement } from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Artist } from '../../api/artist'
import { Person } from '@material-ui/icons'

export interface ArtistListItemPropsType {
  artist:Artist
  onClick:(artist:Artist) => void
  onContextClick?:MouseEventHandler
}

const ArtistListItem = ({ artist, onContextClick, onClick }: ArtistListItemPropsType):ReactElement => {
  const classes = useStyles()
  return (
    <ListItem onContextMenu={onContextClick} button onClick={() => onClick(artist)} className={classes.root}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={artist.name}/>
    </ListItem>
  )
}

export default ArtistListItem
