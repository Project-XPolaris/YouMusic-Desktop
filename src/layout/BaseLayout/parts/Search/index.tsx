import React, { ReactElement, useEffect, useState } from 'react'
import useStyles from './style'
import {
  Avatar,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar, ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Popover
} from '@material-ui/core'
import clsx from 'clsx'
import { PlayArrow, Search } from '@material-ui/icons'
import { useDebounce } from 'ahooks'
import { fetchMusicList, Music } from '../../../../api/music'
import { Album, fetchAlbumList } from '../../../../api/album'
import { Artist, fetchArtistList } from '../../../../api/artist'
import { getMusicAlbumCoverUrl } from '../../../../utils/music'
import { getImageUrl } from '../../../../utils/image'
import usePlayerModel from '../../../../models/player'
import { useHistory } from 'react-router-dom'

export interface SearchBarPropsType {
  className?:string
}

const SearchBar = ({ className }: SearchBarPropsType):ReactElement => {
  const classes = useStyles()
  const [input, setInput] = useState<string>('')
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>()
  const [searchResult, setSearchResult] = useState<{music:Music[], album:Album[], artist:Artist[]} | undefined>()
  const playModel = usePlayerModel()
  const history = useHistory()
  const searchKey = useDebounce(
    input, { wait: 500 }
  )
  const search = async () => {
    if (searchKey.length === 0) {
      return
    }
    const [musicResponse, albumResponse, artistResponse] = await Promise.all([
      fetchMusicList({ pageSize: 5, search: searchKey }),
      fetchAlbumList({ pageSize: 5, search: searchKey }),
      fetchArtistList({ pageSize: 5, search: searchKey })
    ])
    setSearchResult({
      music: musicResponse.data as any,
      album: albumResponse.data as any,
      artist: artistResponse.data as any
    })
  }
  useEffect(() => {
    search()
  }, [searchKey])
  useEffect(() => {
    if (!anchor) {
      setSearchResult(undefined)
      setInput('')
    }
  }, [anchor])
  return (
    <div className={clsx(classes.root, className)}>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Paper className={classes.popup}>
          <div className={classes.header}>
            <div className={classes.searchBox}>
              <Search className={classes.icon}/>
              <InputBase
                onChange={(e) => setInput(e.target.value)}
                placeholder={'search...'}
              />
            </div>
          </div>

          <List dense>
            <ListItem button>
              <ListItemText primary={`search ${input}`} />
            </ListItem>
          </List>
          {
            searchResult && (<>
              <List subheader={<ListSubheader>music</ListSubheader>} dense>
                {
                  searchResult.music.map(music => {
                    return (
                      <ListItem
                        key={music.id}
                        button
                        onClick={() => playModel.playMusic(music)}
                      >
                        <ListItemAvatar>
                          <Avatar src={getMusicAlbumCoverUrl(music)} variant={'square'}/>
                        </ListItemAvatar>
                        <ListItemText primary={music.title} />
                      </ListItem>
                    )
                  })
                }
                <ListItem
                  button
                  onClick={() => {
                    history.push(`/musiclist?search=${searchKey}`)
                    setAnchor(null)
                  }}
                >
                  <ListItemText primary={'More music result'} />
                </ListItem>
              </List>
              <List subheader={<ListSubheader>album</ListSubheader>} dense>
                {
                  searchResult.album.map(album => {
                    return (
                      <ListItem
                        key={album.id}
                        button
                        onClick={() => history.push(`album/${album.id}`)}
                      >
                        <ListItemAvatar>
                          <Avatar src={getImageUrl(album.cover)} variant={'square'}/>
                        </ListItemAvatar>
                        <ListItemText primary={album.name} />
                        <ListItemSecondaryAction>
                          <IconButton size={'small'} onClick={() => playModel.playAlbum(album.id)}>
                            <PlayArrow />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })
                }
                <ListItem
                  button
                  onClick={() => {
                    history.push(`/albumlist?search=${searchKey}`)
                    setAnchor(null)
                  }}
                >
                  <ListItemText primary={'More album result'} />
                </ListItem>
              </List>
              <List subheader={<ListSubheader>artist</ListSubheader>} dense>
                {
                  searchResult.artist.map(artist => {
                    return (
                      <ListItem key={artist.id} button onClick={() => history.push(`artist/${artist.id}`)}>
                        <ListItemAvatar>
                          <Avatar src={getImageUrl(artist.avatar)} variant={'square'}/>
                        </ListItemAvatar>
                        <ListItemText primary={artist.name} />
                      </ListItem>
                    )
                  })
                }
                <ListItem
                  button
                  onClick={() => {
                    history.push(`/artistlist?search=${searchKey}`)
                    setAnchor(null)
                  }}
                >
                  <ListItemText primary={'More artist result'} />
                </ListItem>
              </List>
            </>)
          }
        </Paper>
      </Popover>
      <IconButton onClick={e => setAnchor(e.currentTarget)}>
        <Search />
      </IconButton>
    </div>
  )
}

export default SearchBar
