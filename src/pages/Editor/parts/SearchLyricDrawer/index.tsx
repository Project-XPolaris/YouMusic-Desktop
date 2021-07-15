import useStyles from './style'
import { Button, Drawer, IconButton, InputBase, List, ListItem, ListItemText } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { fetchMusicMetaLyric, SearchMusicEntity, searchMusicMeta } from '../../../../api/meta'
import { LyricsManager } from '../../../../utils/lyrics'
import { SearchLyricDrawerController } from './hook'

export interface SearchLyricDrawerPropsType {
  isOpen:boolean
  className?: string;
  onCLose:() => void
  onApply:(lyric:string) => void
  controller:SearchLyricDrawerController
}

const SearchLyricDrawer = ({ className, isOpen, onCLose, controller, onApply }: SearchLyricDrawerPropsType): React.ReactElement => {
  const classes = useStyles()
  const [musicList, setMusicList] = useState<SearchMusicEntity[]>([])
  const [selectMusic, setSelectMusic] = useState<SearchMusicEntity>()
  const [lyricManager, setLyricManager] = useState<LyricsManager>()
  const [rawLyric, setRawLyric] = useState<string>()
  useEffect(() => {
    if (musicList.length === 0) {
      setSelectMusic(undefined)
      return
    }
    setSelectMusic(musicList[0])
  }, [musicList])
  const onSearch = async () => {
    if (!controller.inputSearch) {
      return
    }
    const response = await searchMusicMeta(controller.inputSearch)
    if (response) {
      setMusicList(response)
    }
  }
  const refreshLyric = async () => {
    if (!selectMusic) {
      return
    }
    const response = await fetchMusicMetaLyric(selectMusic)
    setRawLyric(response.lyric)
    setLyricManager(LyricsManager.fromLyricsText(response.lyric))
  }
  useEffect(() => {
    refreshLyric()
  }, [selectMusic])
  const onApplyButtonClick = () => {
    if (rawLyric) {
      onApply(rawLyric)
    }
  }
  return (
    <Drawer anchor={'right'} open={isOpen} className={className} onClose={onCLose}>
      <div className={classes.root}>
        <div className={classes.search}>
          <InputBase
            fullWidth
            placeholder='search music key...'
            value={controller.inputSearch}
            onChange={(e) => controller.setInputSearch(e.target.value)}
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
              selectMusic && lyricManager &&
              <>
                <div className={classes.resultWrap}>
                  <div className={classes.resultList}>
                    {
                      lyricManager.lines.map((line) => {
                        return (
                          <div className={classes.line} key={line.time}>
                            {line.text}
                          </div>
                        )
                      })

                    }
                  </div>
                </div>
                <Button
                  className={classes.applyButton}
                  fullWidth
                  variant='contained'
                  onClick={onApplyButtonClick}
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
                  musicList.map((it, idx) => {
                    return (
                      <ListItem key={idx} button onClick={() => setSelectMusic(it)} selected={selectMusic?.id === it.id}>
                        <ListItemText primary={it.name} secondary={it.artists.map(it => it.name).join('/')}/>
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

export default SearchLyricDrawer
