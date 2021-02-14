import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    header: {
      display: 'flex'
    },
    title: {
      flex: 1
    },
    content: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap'
    }
  })
)

export default useStyles
