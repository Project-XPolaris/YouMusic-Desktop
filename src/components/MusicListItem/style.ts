import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white'
    },
    cover: {
      width: theme.spacing(6),
      marginRight: theme.spacing(2),
      height: theme.spacing(6),
      objectFit: 'contain'
    },
    selectedItem: {
      backgroundColor: theme.palette.primary.dark
    },
    icon: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      width: 48,
      height: 48
    }
  })
)

export default useStyles
