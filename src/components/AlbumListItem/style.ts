import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: '8px 16px',
      alignItems: 'center'
    },
    cover: {
      width: 48,
      height: 48
    },
    text: {
      color: 'white',
      marginLeft: theme.spacing(1)
    }
  })
)

export default useStyles
