import React, { ReactElement } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import useStyles from './style'
import ArtistPickView from '../ArtistPickView'
import { useArtistPickController } from '../ArtistPickView/hook'

export interface ArtistListEditDialogPropsType {
  open?: boolean
  onCancel: () => void
  initValue:string[]
  onOk: (values: string[]) => void
}

const ArtistListEditDialog = ({ initValue, onOk, onCancel, open = false }: ArtistListEditDialogPropsType):ReactElement => {
  const classes = useStyles()
  const controller = useArtistPickController(initValue)
  const onDialogOk = () => {
    if (controller.selected.length === 0) {
      return
    }
    onOk(controller.selected)
  }
  return (
    <Dialog open={open} maxWidth={'xs'} fullWidth onClose={onCancel}>
      <DialogTitle>
        Pick up tags
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ArtistPickView controller={controller} className={classes.input}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogOk}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArtistListEditDialog
