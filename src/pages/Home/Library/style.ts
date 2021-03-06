import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      flex: 1
    },
    headerAction: {
      display: 'flex',
      flexDirection: 'row-reverse',
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    item: {
      marginBottom: theme.spacing(2)
    }
  })
)
export default useStyles
