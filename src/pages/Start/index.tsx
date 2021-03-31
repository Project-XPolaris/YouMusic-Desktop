import React, { ReactElement, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core'
import { NavigateNext, Person } from '@material-ui/icons'
import { ApplicationConfig } from '../../config'
import { useHistory } from 'react-router-dom'
import { useUpdate } from 'ahooks'
import { LoginHistory, loginHistoryManager } from '../../utils/login'

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
  },
  tabs: {
    marginTop: theme.spacing(2)
  },
  itemPrimary: {
    color: 'white'
  }

}))

interface StartPagePropsType {

}

const StartPage = ({}: StartPagePropsType) : ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const [inputAPIURL, setInputAPIURL] = useState<string | undefined>()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const refresh = useUpdate()
  const apply = () => {
    if (inputAPIURL === undefined) {
      return
    }
    localStorage.setItem(ApplicationConfig.keys.store.apiUrl, inputAPIURL)
    history.replace('/')
  }
  const check = async () => {
    const apiUrl = localStorage.getItem(ApplicationConfig.keys.store.apiUrl)
    if (apiUrl !== null) {
      history.replace('/home')
    }
  }
  const loginHandler = async () => {
    if (!inputAPIURL) {
      return
    }
    const loginHistory : LoginHistory = {
      apiUrl: inputAPIURL,
      username: 'public',
      token: ''
    }
    loginHistoryManager.addHistory(loginHistory)
    localStorage.setItem(ApplicationConfig.keys.store.apiUrl, inputAPIURL)
    history.replace('/home')
  }
  useEffect(() => {
    check()
    loginHistoryManager.refresh()
    refresh()
  }, [])
  const renderHistoryView = () => {
    const onItemClick = (loginHistory:LoginHistory) => {
      localStorage.setItem(ApplicationConfig.keys.store.apiUrl, loginHistory.apiUrl)
      history.push('/home')
    }
    return (
      <div>
        <List>
          {
            loginHistoryManager.list.map((loginHistory, idx) => {
              return (
                <ListItem key={idx} button onClick={() => onItemClick(loginHistory)}>
                  <ListItemAvatar>
                    <Avatar>
                      <Person/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={loginHistory.username}
                    secondary={loginHistory.apiUrl}
                    primaryTypographyProps={{ className: classes.itemPrimary }}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
  const renderNewLoginView = () => {
    return (
      <>
        <TextField
          label="ApiUrl"
          variant="outlined"
          fullWidth
          onChange={(e) => setInputAPIURL(e.target.value)}
          value={inputAPIURL}
        />
      </>
    )
  }
  return (
    <div className={classes.main}>
      <Typography variant="h2" gutterBottom style={{ color: '#FFFFFF' }}>
        Start
      </Typography>
      <Tabs
        className={classes.tabs}
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, v) => setTabIndex(v)}
      >
        <Tab label="Recently login" />
        <Tab label="New login" />
      </Tabs>
      <div className={classes.form}>
        {
          tabIndex === 0 && renderHistoryView()
        }
        {
          tabIndex === 1 && renderNewLoginView()
        }
      </div>
      <Fab color="primary" className={classes.fab} onClick={loginHandler}>
        <NavigateNext />
      </Fab>
    </div>
  )
}
export default StartPage
