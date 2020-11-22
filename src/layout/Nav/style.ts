import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 240,
      height: '100%',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.default
    }
  })
)
export default useStyles
