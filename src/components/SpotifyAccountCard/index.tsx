import React, { ReactElement } from 'react'
import useStyles from './style'
import clsx from 'clsx'
import { SpotifyIcon } from '../icons/SpotifyIcon'
import { ButtonBase } from '@material-ui/core'

export interface SpotifyAccountCardPropsType {
  className?:any,
  isLogin?:boolean,
  onLogin:() => void
  logout:() => void
}

const SpotifyAccountCard = ({ className, onLogin, logout, isLogin = false }: SpotifyAccountCardPropsType): ReactElement => {
  const classes = useStyles()
  return (
    <ButtonBase className={clsx(classes.root, className, isLogin ? classes.login : classes.notLogin)} onClick={() => {
      if (!isLogin) {
        onLogin()
      } else {
        logout()
      }
    }}>
      <SpotifyIcon className={className.icon} width={48} height={48} />
      <div className={classes.text}>
        {
          isLogin ? 'Already link' : 'Link to spotify'
        }
      </div>
    </ButtonBase>
  )
}

export default SpotifyAccountCard
