import * as React from 'react'
import { Grid, List, Menu, MenuItem, Pagination, Select } from '@material-ui/core'
import useStyles from './style'
import ArtistItem from '../../../components/ArtistItem'
import { useMount, useUnmount } from 'ahooks'
import useArtistListModel from './model'
import { useHistory } from 'react-router-dom'
import { useContextMenu } from '../../../hooks/context'
import { Artist } from '../../../api/artist'
import useEditorModel from '../../../models/editor'
import ArtistListItem from '../../../components/ArtistListItem'
import ArtistFilter, { ArtistFilterData } from '../../../components/ArtistFilter'
import { useEffect, useState } from 'react'
import { AlbumFilterData } from '../../../components/AlbumFilter'

const ArtistListPage = ():React.ReactElement => {
  const classes = useStyles()
  const artistModel = useArtistListModel()
  const editorModel = useEditorModel()
  const history = useHistory()
  const contextMenuController = useContextMenu<Artist>(undefined)
  const onArtistUpdate = async () => {
    await artistModel.fetchArtist({})
  }
  useMount(async () => {
    document.addEventListener('artistUpdate', onArtistUpdate)
    await artistModel.fetchArtist({})
  })
  useUnmount(() => {
    document.removeEventListener('artistUpdate', onArtistUpdate)
  })
  const [filter, setFilter] = useState<ArtistFilterData>({
    order: '-id'
  })
  useEffect(() => {
    (async () => {
      await artistModel.fetchArtist({ ...filter })
    })()
  }, [filter])
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
              editorModel.openEditArtist(contextMenuController.data)
            }
          }}
        >Edit</MenuItem>
      </Menu>
      <div className={classes.toolbar}>
        <ArtistFilter filter={filter} onChange={(newFilter) => setFilter(newFilter)} />
      </div>
      {/* <Grid container className={classes.grid}> */}
      {/*  {artistModel.data.map((artist) => ( */}
      {/*    <Grid container item key={artist.id} className={classes.item}> */}
      {/*      <ArtistItem */}
      {/*        artist={artist} */}
      {/*        onClick={(artist) => history.push(`/artist/${artist.id}`)} */}
      {/*        onContextClick={(e) => { */}
      {/*          contextMenuController.open(artist, { x: e.clientX - 2, y: e.clientY - 4 }) */}
      {/*        }} */}
      {/*      /> */}
      {/*    </Grid> */}
      {/*  ))} */}
      {/* </Grid> */}
      <List>
        {artistModel.data.map((artist) => (
          <ArtistListItem
            key={artist.id}
            artist={artist}
            onClick={(artist) => history.push(`/artist/${artist.id}`)}
            onContextClick={(e) => {
              contextMenuController.open(artist, { x: e.clientX - 2, y: e.clientY - 4 })
            }}
          />
        ))}
      </List>
      <Pagination count={Math.ceil(artistModel.total / 55)} onChange={(event, page) => artistModel.fetchArtist({ page })} />
    </div>
  )
}

export default ArtistListPage
