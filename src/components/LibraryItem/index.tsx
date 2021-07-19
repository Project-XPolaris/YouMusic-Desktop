import React from 'react'
import { Avatar, Card, CardHeader, IconButton, LinearProgress } from '@material-ui/core'
import { Delete, Folder, Sync } from '@material-ui/icons'
import { Library } from '../../api/library'
import { Task } from '../../api/task'
import useStyles from './style'

export interface LibraryItemPropsType {
  library:Library
  onScan:() => void
  onDelete:() => void
  task:Task | undefined
}

const LibraryItem = ({ library, onScan, onDelete, task }: LibraryItemPropsType):React.ReactElement => {
  const classes = useStyles()
  const renderItem = () => {
    if (task && task.status === 'Running') {
      let progress = 0
      if (task.output.total !== 0) {
        progress = (task.output.current / task.output.total) * 100
      }
      return (
        <div className={classes.progress}>
          <div className={classes.progressText}>
            { task.output.current } of { task.output.total } | { progress.toFixed(2) }%
          </div>
          <LinearProgress value={progress} />
        </div>
      )
    }
    return (
      <>
        <IconButton onClick={onScan}>
          <Sync />
        </IconButton>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </>
    )
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <Folder />
          </Avatar>
        }
        action={
          renderItem()
        }
        title={library.name}
        subheader={library.path}
      />
    </Card>
  )
}

export default LibraryItem
