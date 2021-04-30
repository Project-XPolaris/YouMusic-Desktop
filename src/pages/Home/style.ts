import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    paddingBottom: theme.spacing(12)
  },
  collection: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4)
  }
}))
export default useStyles
