import React, { MouseEventHandler } from 'react';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Music } from '../../api/music'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import useStyles from './style'

export interface MusicListItemPropsType {
  music: Music
  onClick: () => void
  onContextMenu:MouseEventHandler<any>
}

const MusicListItem = ({ music, onClick, onContextMenu }: MusicListItemPropsType) => {
  const classes = useStyles()
  return (
    <ListItem button className={classes.root} onClick={onClick} onContextMenu={onContextMenu}>
      <ListItemAvatar>
        <img src={getMusicAlbumCoverUrl(music)} className={classes.cover} />
      </ListItemAvatar>
      <ListItemText
        primary={music.title}
        secondary={`${music.album.name} - ${music.artist.map(it => it.name).join('/')}`}
      />
    </ListItem>
  )
}

export default MusicListItem
