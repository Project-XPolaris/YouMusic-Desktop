import React, { useEffect } from 'react'
import useStyles from './style'
import LibraryItem from '../../../components/LibraryItem'
import useLibraryListModel from './model'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import PathSelectDialog from './parts/PathSelectDialog'
import useLayoutModel from '../../../models/layout'

export interface LibraryPagePropsType {

}

const LibraryPage = ({}: LibraryPagePropsType) => {
  const classes = useStyles()
  const model = useLibraryListModel()
  const layoutModel = useLayoutModel()
  useEffect(() => {
    model.fetchLibrary({})
  }, [])
  console.log(model.data)
  return (
    <div className={classes.root}>
      <PathSelectDialog
        open={Boolean(layoutModel.dialogs['library/pickDirectory'])}
        onCancel={() => {
          layoutModel.switchDialog('library/pickDirectory')
        }}
        onOk={(pickPath) => {}}
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
          <LibraryItem library={it} key={it.path}/>
        ))
      }

    </div>
  )
}

export default LibraryPage
