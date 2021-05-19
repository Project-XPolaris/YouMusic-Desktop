import { Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import useStyles from './style'
import clsx from 'clsx'
import useEditorModel from '../../model'

export interface SaveDialogPropsType {
    className?:string
}

const SaveDialog = ({ className }: SaveDialogPropsType):ReactElement => {
  const classes = useStyles()
  const editorModel = useEditorModel()
  return (
    <Dialog open={Boolean(editorModel.saveProgress)} className={clsx(className)}>
      <DialogTitle>
            Saving
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <Typography variant='body1'>{editorModel.saveProgress?.text}</Typography>
          <div className={classes.progress}>
            <LinearProgress className={classes.progressbar} />
            <div className={classes.progressText}>
              {`${editorModel.saveProgress?.current} / ${editorModel.saveProgress?.total}`}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SaveDialog
