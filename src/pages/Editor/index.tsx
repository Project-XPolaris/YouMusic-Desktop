import useStyles from './style'
import React, { useEffect, useState } from 'react'
import useEditorModel, { EditMusic, MusicUpdateData } from './model'
import clsx from 'clsx'
import {
  Checkbox,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core'
import EditorView from './parts/editor'
import { Bookmark, Save } from '@material-ui/icons'
import SaveDialog from './parts/SaveDialog'
import ParseNameDialog, { MatchResult } from './parts/ParseNameDialog'
import { matchName } from '../../utils/match'

export interface EditPagePropsType {
  className?: string
}

export interface ColData {
  id: number
  filename: string
  editMusic: EditMusic | undefined
}

const EditPage = ({ className }: EditPagePropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const [matchString, setMatchString] = useState<string | undefined>()
  useEffect(() => {
    model.loadMusic()
  }, [])
  const getData = (): ColData[] => {
    return model.musicList.filter(it => model.getEditMusic(it.id) !== undefined)
      .map(it => ({
        id: it.id,
        filename: it.filename,
        editMusic: model.getEditMusic(it.id)
      }))
  }
  const onMatchString = () => {
    if (!model.editIds || model.setEditIds.length === 0) {
      return
    }
    const id = model.editIds[0]
    const music = model.musicList.find(it => it.id === id)
    if (!music) {
      return
    }
    setMatchString(music.filename.substr(0, music.filename.lastIndexOf('.')))
  }
  const onMatchOk = (pattern: string) => {
    setMatchString(undefined)
    if (!model.editIds) {
      return
    }
    const updates = model.updateMusics
    for (const editId of model.editIds) {
      const music = model.musicList.find(it => it.id === editId)
      if (!music) {
        continue
      }
      const result : MatchResult = matchName(music.filename.substr(0, music.filename.lastIndexOf('.')), pattern)
      const update = updates.find(it => editId === it.id)
      if (update) {
        if (result.title) {
          update.title = result.title
        }
        if (result.artist) {
          update.artist = [result.artist]
        }
      } else {
        const newUpdate: MusicUpdateData = {
          id: editId,
          title: result.title,
          artist: result.artist ? [result.artist] : undefined
        }
        updates.push(newUpdate)
      }
    }
    model.setUpdateMusics([...updates])
  }
  return (
    <div className={clsx(className, classes.root)}>
      <SaveDialog />
      <ParseNameDialog
        open={Boolean(matchString)}
        name={matchString ?? ''}
        onCancel={() => setMatchString(undefined)}
        onOk={onMatchOk}
      />
      <div className={classes.toolbar}>
        <div className={classes.title}>
          Editor
        </div>
        {
          (model.editIds?.length ?? 0) > 0 && <Tooltip title='match filename'>
            <IconButton size='medium' onClick={onMatchString}>
              <Bookmark />
            </IconButton>
          </Tooltip>
        }

        <Tooltip title='Save all changes'>
          <IconButton size='medium' onClick={() => model.saveAll()}>
            <Save />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.content}>
        <div className={classes.view}>
          <EditorView />
        </div>
        <div className={classes.list}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color='primary'
                    onChange={(e) => {
                      if (e.target.checked) {
                        model.setEditIds(model.musicList.map(it => it.id))
                      } else {
                        model.setEditIds([])
                      }
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Filename</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                getData()
                  .map(it => {
                    return (
                      <TableRow
                        key={it.id}
                      >
                        <TableCell>
                          <Checkbox
                            color='primary'
                            onChange={(e) => {
                              if (e.target.checked) {
                                model.setEditIds([...((model.editIds ?? []).filter(selectedId => selectedId !== it.id)), it.id])
                              } else {
                                model.setEditIds((model.editIds ?? []).filter(selectedId => selectedId !== it.id))
                              }
                            }}
                            checked={Boolean(model.editIds?.find(selectedId => selectedId === it.id))}
                          />
                        </TableCell>
                        <TableCell>{it.id}</TableCell>
                        <TableCell>{it.filename}</TableCell>
                        <TableCell>{it.editMusic?.title}</TableCell>
                        <TableCell>{it.editMusic?.artist?.map(artistName => (
                          <Chip key={artistName} label={artistName} />))}</TableCell>
                        <TableCell>{it.editMusic?.album}</TableCell>
                      </TableRow>
                    )
                  })
              }
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default EditPage
