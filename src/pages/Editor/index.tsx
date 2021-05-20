import useStyles from './style'
import React, { useEffect } from 'react'
import useEditorModel, { EditMusic } from './model'
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
import { Save } from '@material-ui/icons'
import SaveDialog from './parts/SaveDialog'

export interface EditPagePropsType {
  className?: string
}
export interface ColData {
  id:number
  filename:string
  editMusic:EditMusic | undefined
}
const EditPage = ({ className }: EditPagePropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  useEffect(() => {
    model.loadMusic()
  }, [])
  const getData = ():ColData[] => {
    return model.musicList.filter(it => model.getEditMusic(it.id) !== undefined)
      .map(it => ({ id: it.id, filename: it.filename, editMusic: model.getEditMusic(it.id) }))
  }
  return (
    <div className={clsx(className, classes.root)}>
      <SaveDialog />
      <div className={classes.toolbar}>
        <div className={classes.title}>
          Editor
        </div>
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
                    color="primary"
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
                            color="primary"
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
                        <TableCell>{it.editMusic?.artist?.map(artistName => (<Chip key={artistName} label={artistName} />))}</TableCell>
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
