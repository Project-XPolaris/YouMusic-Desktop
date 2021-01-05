import { createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
    padding: theme.spacing(3),
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingBottom: theme.spacing(12)
  },
  content: {},
  item: {
    width: 120,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  grid: {},
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#303030'
    }
  }
}))
export default useStyles