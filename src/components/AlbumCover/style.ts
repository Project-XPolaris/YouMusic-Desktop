import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import theme from '../../theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    noCoverIcon: {
      color: theme.palette.primary.contrastText,
      fontSize: 32
    },
    noCover: {
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
)

export default useStyles
