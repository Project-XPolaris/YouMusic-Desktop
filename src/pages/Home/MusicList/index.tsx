import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import { List, Menu, MenuItem, Pagination } from '@material-ui/core'
import useStyles from './style'
import useMusicListModel from './model'
import usePlayerModel from '../../../models/player'
import MusicListItem from '../../../components/MusicListItem'
import { useContextMenu } from '../../../hooks/context'
import { Music } from '../../../api/music'
import MusicEditDrawer from '../../../components/MusicEditDrawer'
import { ipcRenderer } from 'electron'

const MusicListPage = (): ReactElement => {
  const classes = useStyles()
  const musicModel = useMusicListModel()
  const playerModel = usePlayerModel()
  const contextMenuController = useContextMenu<Music>(undefined)
  useEffect(() => {
    musicModel.fetchMusic({ order: '-id', page: musicModel.page })
  }, [])
  return (
    <div className={classes.root}>
      <Menu
        open={contextMenuController.isOpen}
        onClose={() => contextMenuController.close()}
        anchorReference='anchorPosition'
        anchorPosition={
          {
            top: contextMenuController.anchor?.y ?? 0,
            left: contextMenuController.anchor?.x ?? 0
          }
        }
      >
        <MenuItem
          onClick={() => {
            contextMenuController.close()
            if (contextMenuController.data) {
              if (musicModel.selectedMusic.length > 1) {
                ipcRenderer.send('openEditor', musicModel.selectedMusic.map(it => it.id))
                musicModel.selectNone()
              } else {
                ipcRenderer.send('openEditor', [contextMenuController.data.id])
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
      <MusicEditDrawer
        onUpdateMusic={updateMusics => {
          musicModel.update(updateMusics)
        }}
      />
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
                contextMenuController.open(music, {
                  x: e.clientX - 2,
                  y: e.clientY - 4
                })
              }}
              selected={musicModel.isSelected(music)}
            />
          )
        })}
      </List>
      <Pagination
        count={Math.ceil(musicModel.total / 20)}
        onChange={(event, page) => musicModel.fetchMusic({ page, order: '-id' })}
      />
    </div>
  )
}

export default MusicListPage
