import * as React from 'react'
import { List, Pagination, Menu, MenuItem } from '@material-ui/core'
import useStyles from './style'
import { useMount, useUnmount } from 'ahooks'
import useMusicListModel from './model'
import usePlayerModel from '../../../models/player'
import MusicListItem from '../../../components/MusicListItem'
import { useContextMenu } from '../../../hooks/context'
import { Music } from '../../../api/music'
import useEditorModel from '../../../models/editor'
import { ReactElement } from 'react'

const MusicListPage = ():ReactElement => {
  const classes = useStyles()
  const musicModel = useMusicListModel()
  const playerModel = usePlayerModel()
  const editorModel = useEditorModel()
  const contextMenuController = useContextMenu<Music>(undefined)
  const onMusicUpdate = () => {
    musicModel.fetchMusic({})
  }
  useMount(async () => {
    document.addEventListener('musicUpdate', onMusicUpdate)
    await musicModel.fetchMusic({})
  })
  useUnmount(() => {
    document.removeEventListener('musicUpdate', onMusicUpdate)
  })
  console.log(musicModel.total)
  return (
    <div className={classes.root}>
      <Menu
        open={contextMenuController.isOpen}
        onClose={() => contextMenuController.close()}
        anchorReference='anchorPosition'
        anchorPosition={
          { top: contextMenuController.anchor?.y ?? 0, left: contextMenuController.anchor?.x ?? 0 }
        }
      >
        <MenuItem
          onClick={() => {
            contextMenuController.close()
            if (contextMenuController.data) {
              if (musicModel.selectedMusic.length > 1) {
                editorModel.openEditMusic(musicModel.selectedMusic)
              } else {
                editorModel.openEditMusic([contextMenuController.data])
              }
            }
          }}
        >Edit</MenuItem>
        <MenuItem
          onClick={() => {
            contextMenuController.close()
            if (contextMenuController.data) {
              musicModel.switchSelect(contextMenuController.data)
            }
          }}
        >Select</MenuItem>
        {
          musicModel.selectMode &&
          <MenuItem
            onClick={() => {
              contextMenuController.close()
              musicModel.selectNone()
            }}
          >Unselect All</MenuItem>
        }
      </Menu>
      <div className={classes.toolbar}>

      </div>
      <List>
        {musicModel.data.map((music) => {
          return (
            <MusicListItem
              music={music}
              key={music.id}
              onClick={() => {
                if (musicModel.selectMode) {
                  musicModel.switchSelect(music)
                } else {
                  playerModel.playMusic(music)
                }
              }}
              onContextMenu={(e) => {
                contextMenuController.open(music, { x: e.clientX - 2, y: e.clientY - 4 })
              }}
              selected={musicModel.isSelected(music)}
            />
          )
        })}
      </List>
      <Pagination
        count={Math.ceil(musicModel.total / 20)}
        onChange={(event, page) => musicModel.fetchMusic({ page })}
      />
    </div>
  )
}

export default MusicListPage
