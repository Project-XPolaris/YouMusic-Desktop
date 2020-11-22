import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  main: {
    backgroundColor: '#181818',
    height: '100vh',
    paddingTop: theme.spacing(8),
    display: 'flex',
    width: '100vw',
  },
  content: {
    width: 'calc(100vw - 240px)',
    height: '100%'
  },
  nav: {
    height: 'calc(100vh - 64px)',
    width: 240
  },
  playerBar: {
    height: 72,
    width: '100vw',
    backgroundColor: '#202020',
    position: 'fixed',
    zIndex: 100,
    bottom: 0
  }
}))
export default useStyles
