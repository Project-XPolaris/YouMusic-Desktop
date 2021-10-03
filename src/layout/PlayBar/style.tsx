import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import theme from '../../theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      marginLeft: 16,
      marginRight: 16
    },
    cover: {
      width: 48,
      height: 48,
      objectFit: 'cover',
      marginRight: theme.spacing(2)
    },
    info: {
      display: 'flex',
      alignItems: 'center',
      width: '30vw'
    },
    title: {
      ...theme.typography.body1,
      color: theme.palette.primary.contrastText,
      maxWidth: 200,
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    artist: {
      ...theme.typography.body2,
      color: theme.palette.primary.contrastText,
      maxWidth: 200,
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    center: {
      flexGrow: 1,
      textAlign: 'center'
    },
    right: {
      width: '30vw',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: theme.spacing(4)
    },
    control: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    volumeIcon: {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.contrastText
    },
    volumeSlider: {
      width: theme.spacing(10),
      color: theme.palette.primary.contrastText
    },
    buttons: {
      display: 'flex'
    },
    controlButton: {
      alignSelf: 'center'
    },
    playSlider: {
      display: 'flex',
      alignItems: 'center'
    },
    timeLabel: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.contrastText
    },
    sliderbar: {
      width: '100%',
      position: 'absolute',
      top: -14
    },
    root: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    loading: {
      width: theme.spacing(20)
    },
    playDrawer: {
      height: '100vh',
      width: '100vw',
      paddingTop: theme.spacing(6)
    },
    playerDrawerContent: {
      width: '100%',
      height: '100%',
    }
  })
)
export default useStyles
