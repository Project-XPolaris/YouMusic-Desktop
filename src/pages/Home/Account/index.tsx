import React, { ReactElement, useEffect } from 'react'
import useStyles from './style'
import { ExitToApp, Person } from '@material-ui/icons'
import { Avatar, ButtonBase, Paper } from '@material-ui/core'
import { ipcRenderer } from 'electron'
import { ApplicationConfig } from '../../../config'
import SpotifyAccountCard from '../../../components/SpotifyAccountCard'
import useAccountModel from './model'

const AccountPage = ():ReactElement => {
  const classes = useStyles()
  const accountModel = useAccountModel()
  useEffect(() => {
    accountModel.refresh()
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar >
          <Person/>
        </Avatar>
        <div className={classes.username}>
          { localStorage.getItem(ApplicationConfig.keys.store.username) }
        </div>
      </div>
      <div className={classes.content}>
        <SpotifyAccountCard
          className={classes.card}
          onLogin={() => ipcRenderer.send('openSpotifyLoginWindow')}
          isLogin={accountModel.accountInfo?.spotifyLogin ?? false}
          logout={() => {
            accountModel.unlink()
          }}
        />
        <ButtonBase onClick={() => {
          localStorage.removeItem(ApplicationConfig.keys.store.apiUrl)
          localStorage.removeItem(ApplicationConfig.keys.store.token)
          localStorage.removeItem(ApplicationConfig.keys.store.username)
          ipcRenderer.send('close')
        }}>
          <Paper className={classes.actionCard}>
            <ExitToApp className={classes.actionCardIcon} />
            <div className={classes.actionCardText}>
              Logout
            </div>
          </Paper>
        </ButtonBase>
      </div>

    </div>
  )
}

export default AccountPage
