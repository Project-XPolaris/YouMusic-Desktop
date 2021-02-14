import React, { ReactElement, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, TextField, Typography } from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import { ApplicationConfig } from '../../config'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100vw',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    position: 'relative'
  },
  form: {
    marginTop: theme.spacing(4),
    width: '100%',
    flexGrow: 1
  },
  fab: {
    alignSelf: 'flex-end'
  }

}))

interface StartPagePropsType {

}

const StartPage = ({}: StartPagePropsType) : ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const [inputAPIURL, setInputAPIURL] = useState<string | undefined>()
  const apply = () => {
    if (inputAPIURL === undefined) {
      return
    }
    localStorage.setItem(ApplicationConfig.keys.store.apiUrl, inputAPIURL)
    history.replace('/')
  }
  return (
    <div className={classes.main}>
      <Typography variant="h2" gutterBottom style={{ color: '#FFFFFF' }}>
        Start
      </Typography>
      <div className={classes.form}>
        <TextField id="outlined-basic" label="ApiURL" variant="outlined" fullWidth onChange={(e) => setInputAPIURL(e.target.value)} />
      </div>
      <Fab color="primary" className={classes.fab} onClick={() => apply()}>
        <NavigateNext />
      </Fab>
    </div>
  )
}
export default StartPage
