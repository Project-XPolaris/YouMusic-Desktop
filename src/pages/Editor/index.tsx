import useStyles from './style'
import React, { useEffect } from 'react'
import useEditorModel from './model'
import clsx from 'clsx'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import EditorView from './parts/editor'

export interface EditPagePropsType {
  className?: string
}

const EditPage = ({ className }: EditPagePropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  useEffect(() => {
    model.loadMusic()
  }, [])

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.toolbar}>

      </div>
      <div className={classes.content}>
        <div className={classes.view}>
          <EditorView />
        </div>
        <div className={classes.list}>
          <Table stickyHeader size="small">
            <TableHead >
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Filename</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                model.musicList.map(it => {
                  return (
                    <TableRow
                      key={it.id}
                      hover
                      onClick={() => model.setEditId(it.id)}
                    >
                      <TableCell>{it.id}</TableCell>
                      <TableCell>{it.filename}</TableCell>
                      <TableCell>{it.title}</TableCell>
                      <TableCell>{it.album?.name}</TableCell>
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
