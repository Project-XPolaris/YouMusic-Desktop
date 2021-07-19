import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    progress: {
      width: theme.spacing(30),
      display: 'flex',
      flexDirection: 'column'
    },
    progressText: {
      ...theme.typography.body1,
      color: 'white',
      marginBottom: theme.spacing(1)
    }
  })
)
export default useStyles
