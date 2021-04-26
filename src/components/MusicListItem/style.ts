import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white'
    },
    cover:{
      width: theme.spacing(8),
      marginRight: theme.spacing(2)
    }
  })
)

export default useStyles
