import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    '-webkit-app-region': 'drag',
  },
  main: {
    backgroundColor: '#181818',
    height: '100vh',
    paddingTop: theme.spacing(6),
    display: 'flex',
    width: '100vw'
  },
  content: {
    overflowX: 'hidden'
  },
  playerBar: {
    height: 72,
    width: '100vw',
    backgroundColor: '#202020',
    position: 'fixed',
    zIndex: 100,
    bottom: 0
  },
  appbar: {
    backgroundColor: '#202020',

  },
  toolbar:{
    padding: 0
  },
  windowAction: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1)
  },
  actionIcon: {
    fontSize: theme.spacing(2)
  }
}))
export default useStyles
