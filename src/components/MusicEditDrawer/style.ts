import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    content: {
      padding: theme.spacing(6),
      width: theme.spacing(60),
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#202020',
      height: '100%'
    },
    cover: {
      width: theme.spacing(20),
      marginBottom: theme.spacing(6)
    },
    uploadCover: {
      marginTop: theme.spacing(3)
    },
    item: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    bottomActions: {
      marginTop: 'auto'
    }
  })
)

export default useStyles
