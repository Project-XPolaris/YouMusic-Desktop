import React from 'react'
import useStyles from './style'
import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core'
import { Delete, Folder, MoreVert, Sync } from '@material-ui/icons';
import { Library } from '../../api/library'

export interface LibraryItemPropsType {
  library:Library
  onScan:() => void
  onDelete:() => void
}

const LibraryItem = ({ library,onScan,onDelete }: LibraryItemPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <Folder />
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={onScan}>
              <Sync />
            </IconButton>
            <IconButton onClick={onDelete}>
              <Delete />
            </IconButton>
          </>

        }
        title={library.name}
        subheader={library.path}
      />
    </Card>
  )
}

export default LibraryItem
