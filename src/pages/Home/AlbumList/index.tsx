import * as React from 'react'
import { useEffect, useState } from 'react'
import { Grid, MenuItem, Pagination, Menu } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../../components/AlbumItem'
import useAlbumListModel from './model'
import usePlayerModel from '../../../models/player'
import { useHistory } from 'react-router-dom'
import AlbumFilter, { AlbumFilterData } from '../../../components/AlbumFilter'
import { useContextMenu } from '../../../hooks/context'
import { Album } from '../../../api/album'
import { useMount, useUnmount } from 'ahooks'
import useEditorModel from '../../../models/editor'

const AlbumListPage = (): React.ReactElement => {
  const classes = useStyles()
  const albumListModel = useAlbumListModel()
  const playerModel = usePlayerModel()
  const editorModel = useEditorModel()
  const history = useHistory()
  const contextMenuController = useContextMenu<Album>(undefined)
  const [filter, setFilter] = useState<AlbumFilterData>({
    order: '-id'
  })
  useEffect(() => {
    (async () => {
      await albumListModel.fetchAlbum({ ...filter })
    })()
  }, [filter])
  const onAlbumUpdate = async () => {
    await albumListModel.fetchAlbum({ ...filter })
  }
  useMount(async () => {
    document.addEventListener('albumUpdate', onAlbumUpdate)
  })
  useUnmount(() => {
    document.removeEventListener('albumUpdate', onAlbumUpdate)
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
              editorModel.openEditAlbum(contextMenuController.data)
            }
          }}
        >Edit</MenuItem>
      </Menu>
      <div className={classes.toolbar}>
        <AlbumFilter filter={filter} onChange={(newFilter) => setFilter(newFilter)}/>
      </div>
      <Grid container className={classes.grid}>
        {albumListModel.data.map((album) => (
          <Grid item key={album.id} className={classes.item}>
            <AlbumItem
              album={album}
              onClick={(album) => playerModel.playAlbum(album.id)}
              onTitleClick={(album) => history.push(`/album/${album.id}`)}
              onContextClick={(e) => {
                contextMenuController.open(album, { x: e.clientX - 2, y: e.clientY - 4 })
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(albumListModel.total / 55)}
        onChange={(event, page) => albumListModel.fetchAlbum({ page })} />
    </div>
  )
}

export default AlbumListPage
