import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white'
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  })
)
export default useStyles
