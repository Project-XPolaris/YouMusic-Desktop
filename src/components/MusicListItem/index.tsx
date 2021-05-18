import React, { MouseEventHandler, ReactElement } from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Music } from '../../api/music'
import { getMusicAlbumCoverUrl } from '../../utils/music'
import useStyles from './style'
import clsx from 'clsx'
import { MusicNote } from '@material-ui/icons'

export interface MusicListItemPropsType {
  music: Music
  onClick: () => void
  onContextMenu?: MouseEventHandler
  selected: boolean
}

const MusicListItem = ({
  music,
  onClick,
  onContextMenu,
  selected
}: MusicListItemPropsType): ReactElement => {
  const classes = useStyles()
  const getMeta = () => {
    const parts:string[] = []
    if (music.album) {
      parts.push(music.album.name)
    }
    if (music.artist.length > 0) {
      parts.push(music.artist.map(it => it.name).join('/'))
    }
    parts.push(music.filename)
    return parts.join(' | ');
  }
  return (
    <ListItem
      button={!selected as any}
      className={clsx(classes.root, selected ? classes.selectedItem : undefined)}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <ListItemAvatar>
        {
          music.album?.cover ? <img src={getMusicAlbumCoverUrl(music)} className={classes.cover} alt={music.title} />
            : <Avatar variant={'rounded'} className={classes.icon}><MusicNote /></Avatar>
        }
      </ListItemAvatar>
      <ListItemText
        primary={music.title}
        secondary={getMeta()}
      />
    </ListItem>
  )
}

export default MusicListItem
