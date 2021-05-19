import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    toolbar: {
      width: '100vw',
      height: theme.spacing(4),
      borderBottom: '1px solid #2b2b2b'
    },
    content: {
      display: 'flex',
      height: 'calc(100vh - 48px - 32px)'
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
