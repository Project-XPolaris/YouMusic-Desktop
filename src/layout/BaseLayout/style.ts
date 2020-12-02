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
    overflowX:'hidden'
  },
  playerBar: {
    height: 72,
    width: '100vw',
    backgroundColor: '#202020',
    position: 'fixed',
    zIndex: 100,
    bottom: 0
  },
  appbar:{
    backgroundColor:'#202020'
  }
}))
export default useStyles
