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
import { fetchAppInfo } from '../../api/info'
import { useSnackbar } from 'notistack'
import request from 'umi-request'

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
  },
  input: {
    marginBottom: theme.spacing(2)
  }

}))

const StartPage = () : ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [inputAPIURL, setInputAPIURL] = useState<string | undefined>()
  const [inputUsername, setInputUsername] = useState<string | undefined>()
  const [inputPassword, setInputPassword] = useState<string | undefined>()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const refresh = useUpdate()
  const loginHandler = async () => {
    if (!inputAPIURL) {
      return
    }
    localStorage.setItem(ApplicationConfig.keys.store.apiUrl, inputAPIURL)
    const serviceInfo = await fetchAppInfo()
    enqueueSnackbar('connect to service success', { variant: 'success' })
    if (inputUsername && inputPassword && serviceInfo.authEnable && serviceInfo.authUrl) {
      const response = await request.post(serviceInfo.authUrl, { data: { username: inputUsername, password: inputPassword } })
      if (response.token) {
        enqueueSnackbar('user login success', { variant: 'success' })
        const loginHistory : LoginHistory = {
          apiUrl: inputAPIURL,
          username: inputUsername,
          token: response.token
        }
        loginHistoryManager.addHistory(loginHistory)
        localStorage.setItem(ApplicationConfig.keys.store.token, response.token)
        localStorage.setItem(ApplicationConfig.keys.store.username, inputUsername)
      }
    } else {
      const loginHistory : LoginHistory = {
        apiUrl: inputAPIURL,
        username: 'public',
        token: ''
      }
      localStorage.removeItem(ApplicationConfig.keys.store.token)
      localStorage.setItem(ApplicationConfig.keys.store.username, 'public')
      loginHistoryManager.addHistory(loginHistory)
    }
    history.push('/home')
  }
  useEffect(() => {
    // check()
    loginHistoryManager.refresh()
    refresh()
  }, [])
  const renderHistoryView = () => {
    const onItemClick = (loginHistory:LoginHistory) => {
      localStorage.setItem(ApplicationConfig.keys.store.apiUrl, loginHistory.apiUrl)
      localStorage.setItem(ApplicationConfig.keys.store.username, loginHistory.username)
      if (loginHistory.token !== undefined && loginHistory.token.length > 0) {
        localStorage.setItem(ApplicationConfig.keys.store.token, loginHistory.token)
      }
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
          className={classes.input}
        />
        <TextField
          label="username"
          variant="outlined"
          fullWidth
          onChange={(e) => setInputUsername(e.target.value)}
          value={inputUsername}
          className={classes.input}
        />
        <TextField
          label="password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e) => setInputPassword(e.target.value)}
          value={inputPassword}
          className={classes.input}
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
