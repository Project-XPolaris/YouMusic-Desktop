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
    empty: {
      width: 240,
      height: 240,
      marginBottom: theme.spacing(2),
      backgroundColor: '#2b2b2b'
    },
    bottomAction: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      display: 'flex'
    },
    applyButton: {
      alignSelf: 'center'
    }
  })
)

export default useStyles
