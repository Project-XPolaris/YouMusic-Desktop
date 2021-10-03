import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      width: '100%',
      display: 'flex',
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    tab: {

    },
    musicView: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1
    },
    lyricsView: {
      width: '100vw',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    lyricsContainer: {
      width: '60vw',
      height: '70%',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    },
    lyricLine: {
      ...theme.typography.h6,
      fontSize: 16,
      marginBottom: theme.spacing(2)
    },
    lyricActive: {
      color: theme.palette.primary.main
    },
    lyricInactive: {
      color: 'white'
    },
    name: {
      ...theme.typography.h5,
      color: theme.palette.primary.main,
      marginTop: theme.spacing(4)
    },
    album: {
      ...theme.typography.h6,
      fontSize: 14,
      fontWeight: 300,
      marginTop: theme.spacing(2),
      color: 'white'
    },
    artist: {
      ...theme.typography.h6,
      fontSize: 14,
      fontWeight: 300,
      color: 'white'
    },
    cover: {
      width: theme.spacing(30)
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
