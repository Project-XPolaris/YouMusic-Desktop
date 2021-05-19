import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      height: '100%'
    },
    item: {
      marginBottom: theme.spacing(2)
    },
    cover: {
      width: '60%', marginBottom: theme.spacing(2)
    },
    applyButton: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
)

export default useStyles
