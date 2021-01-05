import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    headerAction: {
      display: 'flex',
      flexDirection: 'row-reverse',
      width: '100%',
      marginBottom: theme.spacing(2)
    }
  })
)
export default useStyles
