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

const MusicListPage = ({}) => {
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
              editorModel.openEditMusic(contextMenuController.data)
            }
          }}
        >Edit</MenuItem>
      </Menu>
      <List>
        {musicModel.data.map((music) => {
          return (
            <MusicListItem
              music={music}
              key={music.id}
              onClick={() => playerModel.playMusic(music)}
              onContextMenu={(e) => {
                contextMenuController.open(music, { x: e.clientX - 2, y: e.clientY - 4 })
              }}
            />
          )
        })}
      </List>
      <Pagination count={Math.floor(musicModel.total / 55)}
        onChange={(event, page) => musicModel.fetchMusic({ page })} />
    </div>
  )
}

export default MusicListPage
