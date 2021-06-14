import useStyles from './style'
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar, ListItemText,
  TextField
} from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { SearchAlbumEntity, searchAlbumMeta } from '../../../../api/meta'

export interface SearchAlbumDrawerPropsType {
  isOpen:boolean
  className?:string
  onCLose:() => void
  onApply:(cover:string, name:string, artist:string) => void
}

const SearchAlbumDrawer = ({ onApply, onCLose, className, isOpen = false }: SearchAlbumDrawerPropsType):ReactElement => {
  const classes = useStyles()
  const [albums, setAlbums] = useState<SearchAlbumEntity[]>([])
  const [inputSearch, setInputSearch] = useState<string>()
  const [selectAlbum, setSelectAlbum] = useState<SearchAlbumEntity>()
  useEffect(() => {
    if (albums.length === 0) {
      setSelectAlbum(undefined)
      return
    }
    setSelectAlbum(albums[0])
  }, [albums])
  const onSearch = async () => {
    if (!inputSearch) {
      return
    }
    const response = await searchAlbumMeta(inputSearch)
    if (response) {
      setAlbums(response)
    }
  }
  const onApplyClickHandler = () => {
    if (!selectAlbum) {
      return
    }
    onApply(selectAlbum.cover, selectAlbum.name, selectAlbum.artists)
  }
  return (
    <Drawer anchor={'right'} open={isOpen} className={className} onClose={onCLose}>
      <div className={classes.root}>
        <div className={classes.search}>
          <InputBase
            fullWidth
            placeholder='search album key...'
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <IconButton
            className={classes.searchButton}
            size='small'
            onClick={onSearch}
          >
            <SearchOutlined />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.info}>
            {
              selectAlbum &&
                <>
                  <img src={selectAlbum.cover} className={classes.cover} />
                  <TextField className={classes.item} value={selectAlbum.name} label={'name'} fullWidth size={'small'}/>
                  <TextField className={classes.item} value={selectAlbum.artists} label={'artist'} fullWidth size={'small'} disabled/>
                  <Button
                    className={classes.applyButton}
                    fullWidth
                    variant='contained'
                    onClick={onApplyClickHandler}
                  >
                    Apply
                  </Button>
                </>
            }

          </div>
          <div className={classes.list}>
            <div className={classes.Label}>
              Search result
            </div>
            <div className={classes.resultWrap}>
              <List className={classes.resultList}>
                {
                  albums.map((it, idx) => {
                    return (
                      <ListItem key={idx} button onClick={() => setSelectAlbum(it)}>
                        <ListItemAvatar>
                          <img src={it.cover} className={classes.resultItemCover} />
                        </ListItemAvatar>
                        <ListItemText primary={it.name} secondary={it.artists}/>
                      </ListItem>
                    )
                  })
                }
              </List>
            </div>

          </div>
        </div>
      </div>

    </Drawer>
  )
}

export default SearchAlbumDrawer
