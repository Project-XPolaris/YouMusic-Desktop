import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)

    },
    title: {
      ...theme.typography.h6
    },
    container: {
      display: 'flex',
      marginTop: theme.spacing(2)
    },
    chip: {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)

export default useStyles
