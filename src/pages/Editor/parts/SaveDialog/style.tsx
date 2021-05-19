import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      width: theme.spacing(40),
      marginBottom: theme.spacing(2)
    },
    progress: {
      display: 'flex',
      alignItems: 'center'
    },
    progressbar: {
      flexGrow: 1
    },
    progressText: {
      ...theme.typography.body2,
      marginLeft: theme.spacing(2)
    }
  })
)
export default useStyles
