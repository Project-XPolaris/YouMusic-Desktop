import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      height: 'calc(100vh - 72px)',
      display: 'flex',
      paddingTop: 48,
      flexDirection: 'column'
    },
    header: {
      width: '100%',
      display: 'flex',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    tab: {

    },
    musicViewContainer: {
      width: '100vw',
      height: 'calc(100vh - 72px - 48px - 48px)',
      display: 'flex',
      flexGrow: 1,
      paddingTop: 32,
      justifyContent: 'center',
      position: 'relative'
    },
    content: {
      width: '70vw',
      display: 'flex',
      height: '100%'
    },
    musicView: {
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    coverViewContainer: {
      width: 240,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 16,
      justifyContent: 'center'
    },
    right: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    rightHeader: {
      marginTop: 32
    },
    metaData: {
      display: 'flex'
    },
    artist: {
      ...theme.typography.caption,
      fontSize: 16,
      color: theme.palette.primary.main,
      marginRight: theme.spacing(4)
    },
    album: {
      ...theme.typography.caption,
      fontSize: 16,
      color: 'white'
    },
    title: {
      ...theme.typography.h4,
      color: 'white'
    },
    lyricViewContainer: {
      display: 'flex',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      flexDirection: 'column',
      flexGrow: 1
    },
    lyricsView: {
      // display: 'flex',
      paddingTop: 16,
      paddingBottom: 32
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center'
    },
    lyricLine: {
      ...theme.typography.h6,
      fontSize: 14,
      fontWeight: 300,
      marginBottom: theme.spacing(2)
    },
    lyricActive: {
      color: theme.palette.primary.main
    },
    lyricInactive: {
      color: 'white'
    },
    // name: {
    //   ...theme.typography.h5,
    //   color: theme.palette.primary.main,
    //   marginTop: theme.spacing(4)
    // },
    // album: {
    //   ...theme.typography.h6,
    //   fontSize: 14,
    //   fontWeight: 300,
    //   marginTop: theme.spacing(2),
    //   color: 'white'
    // },
    // artist: {
    //   ...theme.typography.h6,
    //   fontSize: 14,
    //   fontWeight: 300,
    //   color: 'white'
    // },
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
