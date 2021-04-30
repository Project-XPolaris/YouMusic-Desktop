import React, { ReactNode } from 'react'
import { Typography } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'

export interface CollectionPropsType {
  title: string
  children: ReactNode
  className?: string
}

const Collection = ({ title, children, className }: CollectionPropsType): React.ReactElement => {
  const classes = useStyles()
  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.header}>
        <Typography variant='h6' gutterBottom className={classes.title}>
          {title}
        </Typography>
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default Collection
