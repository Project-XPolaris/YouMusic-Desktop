import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative'
    },
    icon: {
      marginRight: theme.spacing(2)
    },
    popup: {
      padding: theme.spacing(2),
      backgroundColor: '#202020',
      width: theme.spacing(40)
    },
    header: {
      position: 'sticky',
      zIndex: 10,
      top: 0,
      backgroundColor: '#202020',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    searchBox: {
      backgroundColor: '#2a2a2a',
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)

    }
  })
)

export default useStyles
