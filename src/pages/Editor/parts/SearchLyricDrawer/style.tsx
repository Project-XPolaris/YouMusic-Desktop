import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(80),
      padding: theme.spacing(2),
      backgroundColor: '#2A2A2A',
      height: '100%',
      paddingTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      ...theme.typography.h6,
      color: '#FFFFFF'
    },
    search: {
      marginTop: theme.spacing(2),
      border: '1px solid',
      borderColor: 'rgba(255,255,255,0)',
      borderRadius: theme.spacing(8),
      display: 'flex',
      paddingLeft: theme.spacing(2),
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    searchButton: {
      marginLeft: theme.spacing(2)
    },
    content: {
      display: 'flex',
      flex: 1
    },
    list: {
      width: theme.spacing(40),
      marginLeft: theme.spacing(2),
      borderLeft: '1px solid rgba(0,0,0,.15)',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column'
    },
    Label: {
      ...theme.typography.caption,
      color: '#FFFFFF',
      marginBottom: theme.spacing(2)
    },
    resultWrap: {
      flex: '1',
      position: 'relative'
    },
    resultList: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflowY: 'auto'
    },
    resultItemCover: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      objectFit: 'contain'
    },
    info: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      marginRight: theme.spacing(2),
      position: 'relative'
    },
    item: {
      marginTop: theme.spacing(4)
    },
    applyButton: {
      bottom: 0,
      position: 'absolute'
    },
    line: {
      ...theme.typography.body2,
      color: 'white'
    }
  })
)
export default useStyles
