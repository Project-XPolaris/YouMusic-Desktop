import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#181818',
    height: '100%',
    display: 'flex',
    width: '100vw'
  },
  content: {
    width: 'calc(100vw - 240px)',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  nav: {
    height: 'calc(100vh - 64px)',
    width: 240
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
}))
export default useStyles
