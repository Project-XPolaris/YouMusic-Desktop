import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(1)
  },
  notLogin: {
    backgroundColor: 'rgba(0,0,0,.76)'
  },
  login: {
    backgroundColor: '#1ecf5f'
  },
  icon: {
    fontSize: 32,
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: '#2a2a2a'
  },
  actionCardText: {
    ...theme.typography.h6,
    fontSize: 18,
    marginTop: theme.spacing(1)
  },
  text: {
    ...theme.typography.h6,
    fontSize: 14
  }
}))
export default useStyles
