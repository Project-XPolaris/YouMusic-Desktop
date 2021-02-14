import React, { useEffect, useState } from 'react'
import useStyles from './style'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { ArrowBack, Description, Folder } from '@material-ui/icons'
import { fetchDirectoryContent, FileItem } from '../../../../../api/explore'

export interface PathSelectDialogPropsType {
  open:boolean
  onCancel:() => void
  onOk:(path:string) => void
}

const PathSelectDialog = ({ open = false, onCancel, onOk }: PathSelectDialogPropsType):React.ReactElement => {
  const classes = useStyles()
  const [currentPath, setCurrentPath] = useState<string | undefined>('/')
  const [pathInput, setPathInput] = useState<string | undefined>()
  const [content, setContent] = useState<FileItem[]>([])
  const [sep, setSep] = useState<string | undefined>()
  useEffect(() => {
    (async () => {
      const response = await fetchDirectoryContent(currentPath)
      setContent(response.files.filter(it => it.type === 'Directory'))
      setPathInput(response.path)
      setSep(response.sep)
    })()
  }, [currentPath])
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={classes.root}
      onClose={onCancel}
    >
      <DialogContent>
        <div className={classes.pathHeader}>
          <IconButton
            className={classes.backIcon}
            size={'small'}
            onClick={() => {
              if (currentPath && sep) {
                const parts = currentPath.split(sep)
                parts.pop()
                console.log(parts.join(sep))
                if (parts.length > 1) {
                  setCurrentPath(parts.join(sep))
                } else {
                  setCurrentPath('/')
                }
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <InputBase
            className={classes.pathInput}
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
          />
          <Button
            color='secondary'
            onClick={() => {
              setCurrentPath(pathInput)
            }}
          >
            Go
          </Button>
        </div>
        <div className={classes.itemContainer}>
          <List>
            {
              content.map(item => (
                <ListItem
                  button
                  key={item.path}
                  onClick={() => {
                    if (item.type === 'Directory') {
                      setCurrentPath(item.path)
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {item.type === 'Directory' ? <Folder /> : <Description />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                  />
                </ListItem>
              ))
            }
          </List>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => {
            if (currentPath) {
              onOk(currentPath)
            }
          }}
        >
          Add
        </Button>
        <Button
          className={classes.button}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PathSelectDialog
