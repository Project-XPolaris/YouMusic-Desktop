import React from 'react'
import useStyles from './style'
import { ExitToApp, Link, Person } from '@material-ui/icons';
import { Avatar, ButtonBase, Paper, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { ApplicationConfig } from '../../../config';
import { electronApp } from '../../../remote';

export interface AccountPagePropsType {

}

const AccountPage = ({}: AccountPagePropsType) => {
  const classes = useStyles()
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
        <ButtonBase onClick={() => ipcRenderer.send('openSpotifyLoginWindow')}>
          <Paper className={classes.actionCard}>
            <Link className={classes.actionCardIcon} />
            <div className={classes.actionCardText}>
              Link to Spotify
            </div>
          </Paper>
        </ButtonBase>
        <ButtonBase onClick={() => {
          localStorage.removeItem(ApplicationConfig.keys.store.apiUrl)
          localStorage.removeItem(ApplicationConfig.keys.store.token)
          localStorage.removeItem(ApplicationConfig.keys.store.username)
          electronApp.exit()
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
