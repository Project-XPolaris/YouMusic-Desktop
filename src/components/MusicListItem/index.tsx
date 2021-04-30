import React, { MouseEventHandler, ReactElement } from 'react'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Music } from '../../api/music'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import useStyles from './style'
import clsx from 'clsx'

export interface MusicListItemPropsType {
  music: Music
  onClick: () => void
  onContextMenu?:MouseEventHandler
  selected:boolean
}

const MusicListItem = ({ music, onClick, onContextMenu, selected }: MusicListItemPropsType):ReactElement => {
  const classes = useStyles()
  return (
    <ListItem
      button={!selected as any}
      className={clsx(classes.root, selected ? classes.selectedItem : undefined)}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <ListItemAvatar>
        <img src={getMusicAlbumCoverUrl(music)} className={classes.cover} alt={music.title} />
      </ListItemAvatar>
      <ListItemText
        primary={music.title}
        secondary={`${music.album.name} - ${music.artist.map(it => it.name).join('/')}`}
      />
    </ListItem>
  )
}

export default MusicListItem
