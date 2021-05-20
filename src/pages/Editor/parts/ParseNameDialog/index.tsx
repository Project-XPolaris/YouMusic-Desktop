import React, { ReactElement, useEffect, useState } from 'react'
import useStyles from './style'
import { Button, Dialog, DialogActions, InputBase, List, ListItem, ListItemText } from '@material-ui/core'
import { matchName } from '../../../../utils/match'
export interface MatchResult {
  track?:string
  title?:string
}
export interface ParseNameDialogPropsType {
  name?: string
  open?: boolean
  onOk:(matchString:string) => void
  onCancel:() => void
}

const ParseNameDialog = ({
  name,
  open = false,
  onOk,
  onCancel
}: ParseNameDialogPropsType): ReactElement => {
  const [matchString, setMatchString] = useState<string>('')
  const [result, setResult] = useState<{[key:string]:string}>({})
  useEffect(() => {
    if (name) {
      setResult(matchName(name, matchString))
    }
  }, [matchString])
  const classes = useStyles()
  return (
    <Dialog open={open} maxWidth={'xl'} onClose={onCancel}>
      <div className={classes.header}>
        <InputBase placeholder="match pattern" onChange={e => setMatchString(e.target.value)} fullWidth />
        <div className={classes.example}>
          {name}
        </div>
      </div>
      <div className={classes.list}>
        <List>
          {
            Object.getOwnPropertyNames(result).map(label => {
              return (
                <ListItem key={label}>
                  <ListItemText primary={result[label]} secondary={label} />
                </ListItem>
              )
            })
          }
        </List>
      </div>
      <DialogActions>
        <Button onClick={() => onOk(matchString)}>
          OK
        </Button>
        <Button onClick={() => onCancel()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ParseNameDialog
