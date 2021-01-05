import React from 'react'
import useStyles from './style'
import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core'
import { Folder, MoreVert } from '@material-ui/icons'
import { Library } from '../../api/library'

export interface LibraryItemPropsType {
  library:Library
}

const LibraryItem = ({ library }: LibraryItemPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
            <Folder />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={library.name}
        subheader={library.path}
      />
    </Card>
  )
}

export default LibraryItem
