import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  noCover: {
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCoverIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 48
  },
  cover: {
    objectFit: 'cover'
  }
}))
export default useStyles
