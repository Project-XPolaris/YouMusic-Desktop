import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      width: theme.spacing(40),
      height: theme.spacing(40),
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      backgroundColor: '#2A2A2A',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    avatar:{
      width: theme.spacing(8)
    },
    list: {
      flexGrow: 1
    }
  })
)
export default useStyles
