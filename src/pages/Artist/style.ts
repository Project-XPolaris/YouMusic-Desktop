import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {},
  cover: {
    width: 240,
    height: 240,
    objectFit: 'cover'
  },
  noCover: {
    width: 240,
    height: 240,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCoverIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 48
  },
  title: {
    color: theme.palette.primary.contrastText
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  link: {
    ...theme.typography.body1
  },
  sideContent: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'center',
    width: '100%'
  },
  artistName: {
    marginTop: theme.spacing(2),
    ...theme.typography.h5
  },
  actionButton: {
    marginTop: theme.spacing(2)
  }
}))
export default useStyles
