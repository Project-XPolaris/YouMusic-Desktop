import React, { ReactElement, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { ApplicationConfig } from '../../config'

const useStyles = makeStyles({
  main: {}
})

interface InitPagePropsType {

}

const InitPage = ({}: InitPagePropsType):ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const toStartPage = () => {
    history.replace('/start')
  }
  const check = async () => {
    const apiUrl = localStorage.getItem(ApplicationConfig.keys.store.apiUrl)
    if (apiUrl === null) {
      toStartPage()
      return
    }
    history.replace('/home')
  }
  useEffect(() => {
    check()
  }, [])
  return (
    <div className={classes.main}>

    </div>
  )
}
export default InitPage
