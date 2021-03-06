import React, { ReactElement, useEffect } from 'react'
import useStyles from './style'
import LibraryItem from '../../../components/LibraryItem'
import useLibraryListModel from './model'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import PathSelectDialog from './parts/PathSelectDialog'
import useLayoutModel from '../../../models/layout'
import { useInterval } from 'ahooks'

const LibraryPage = ():ReactElement => {
  const classes = useStyles()
  const model = useLibraryListModel()
  const layoutModel = useLayoutModel()
  useEffect(() => {
    model.fetchLibrary({})
  }, [])
  useInterval(() => {
    model.refreshTask()
  }, 3000)
  return (
    <div className={classes.root}>
      <PathSelectDialog
        open={Boolean(layoutModel.dialogs['library/pickDirectory'])}
        onCancel={() => {
          layoutModel.switchDialog('library/pickDirectory')
        }}
        onOk={(pickPath) => {
          model.newLibrary(pickPath)
          layoutModel.switchDialog('library/pickDirectory')
        }}
      />
      <div className={classes.headerAction}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            layoutModel.switchDialog('library/pickDirectory')
          }}
        >
          Add library
        </Button>
      </div>
      {
        model.data && model.data.map(it => (
          <div className={classes.item} key={it.path}>
            <LibraryItem
              library={it}
              onDelete={() => model.remove(it.id)}
              onScan={() => model.scan(it.id)}
              task={model.taskList.find(task => task.id === it.id)}
            />
          </div>
        ))
      }

    </div>
  )
}

export default LibraryPage
