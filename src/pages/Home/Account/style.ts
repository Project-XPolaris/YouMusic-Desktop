import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    header: {
      backgroundColor: '#3c3f41',
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    username: {
      ...theme.typography.h5,
      color: 'white',
      flexGrow: 1,
      marginLeft: theme.spacing(2)
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(2)
    },
    card: {
      color: 'white',
      width: theme.spacing(30),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    actionCard: {
      color: 'white',
      padding: theme.spacing(2),
      width: theme.spacing(30),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    actionCardIcon: {
      fontSize: 32
    },
    actionCardText: {
      ...theme.typography.h6,
      fontSize: 18,
      marginTop: theme.spacing(1)
    }
  })
)

export default useStyles
