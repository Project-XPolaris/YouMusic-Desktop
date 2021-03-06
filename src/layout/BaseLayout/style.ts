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
    '-webkit-app-region': 'drag'
  },
  main: {
    backgroundColor: '#181818',
    height: '100vh',
    paddingTop: theme.spacing(6),
    display: 'flex',
    width: '100vw'
  },
  content: {
    overflowX: 'hidden',
    width: '100%'
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
    zIndex: theme.zIndex.modal + 1
  },
  toolbar: {
    padding: 0
  },
  windowAction: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1)
  },
  actionIcon: {
    fontSize: theme.spacing(2)
  },
  action: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2)
  },
  divider: {
    backgroundColor: '#EEEEEE',
    height: theme.spacing(3),
    width: 1
  },
  menuIcon: {
    marginRight: theme.spacing(1)
  },
  searchBar: {
    marginRight: theme.spacing(4)
  }
}))
export default useStyles
