import React, { ReactElement, useEffect, useState } from 'react'
import { Avatar, Dialog, InputBase, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import useStyles from './style'
import { useDebounce } from 'ahooks'
import { Artist, fetchArtistList } from '../../api/artist'
import { getImageUrl } from '../../utils/image'

export interface ArtistPickDialogPropsType {
    open?:boolean
    onPick:(artist:Artist) => void
}

const ArtistPickDialog = ({ onPick, open = false }: ArtistPickDialogPropsType):ReactElement => {
  const classes = useStyles()
  const [key, setKey] = useState<string | undefined>()
  const searchKey = useDebounce(key, { wait: 500 })
  const [artists, setArtists] = useState<Artist[]>([])
  useEffect(() => {
    (async () => {
      if (searchKey) {
        const response = await fetchArtistList({ page: 1, pageSize: 10, search: searchKey })
        setArtists(response.data)
      }
    })()
  }, [searchKey])
  return (
    <Dialog open={open}>
      <div className={classes.content}>
        <div className={classes.header}>
          <InputBase fullWidth placeholder={'search for'} onChange={(e) => setKey(e.target.value)} />
        </div>
        <List className={classes.list}>
          {
            artists.map(artist => {
              return (
                <ListItem key={artist.id} button onClick={() => onPick(artist)}>
                  <ListItemAvatar>
                    <Avatar src={getImageUrl(artist.avatar)} />
                  </ListItemAvatar>
                  <ListItemText primary={artist.name} />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Dialog>
  )
}

export default ArtistPickDialog
