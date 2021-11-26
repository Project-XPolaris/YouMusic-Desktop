import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolbar: {
      width: '100vw',
      height: theme.spacing(6),
      borderBottom: '1px solid #2b2b2b',
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    content: {
      display: 'flex',
      height: 'calc(100vh - 48px - 48px)'
    },
    view: {
      width: 320,
      borderRight: '1px solid #2b2b2b'
    },
    list: {
      width: 'calc(100vw - 320px)',
      overflowY: 'scroll',
      overflowX: 'hidden',
      position: 'relative'
    },
    tableHeader: {
      position: 'sticky',
      top: 0
    },
    title: {
      ...theme.typography.h6,
      color: 'white',
      flexGrow: 1
    },
    editCell: {
      color: theme.palette.primary.main
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
