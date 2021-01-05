import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialogContent-root': {
        padding: 0
      }

    },
    button: {
      color: theme.palette.primary.contrastText
    },
    pathHeader: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#2a2a2a',
      padding: theme.spacing(2)
    },
    pathInput: {
      flex: 1,
      marginRight: theme.spacing(2),
      width: theme.spacing(40)
    },
    backIcon: {
      marginRight: theme.spacing(2)
    },
    itemContainer: {
      width: theme.spacing(60),
      height: theme.spacing(40),
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '8px'
      },
      '*::-webkit-scrollbar-track': {
        background: 'rgba(0,0,0,0)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#303030'
      }
    }
  })
)
export default useStyles
