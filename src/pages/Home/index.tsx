import * as React from 'react'
import { createStyles, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'

const HomePage = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom style={{ color: '#FFFFFF' }}>
        Home
      </Typography>
    </div>
  )
}

export default HomePage
