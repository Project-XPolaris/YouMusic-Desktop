import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    header: {
      width: theme.spacing(60),
      backgroundColor: '#2a2a2a',
      padding: theme.spacing(2)
    },
    example: {
      ...theme.typography.body2,
      color: '#c2c2c2',
      fontSize: 14,
      marginTop: theme.spacing(2),
      userSelect: 'text'
    },
    list: {
      height: theme.spacing(30),
      overflowY: 'auto',
      width: theme.spacing(60)
    },
    content: {
      padding: theme.spacing(2)
    }
  })
)
export default useStyles
