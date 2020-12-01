import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 240,
      height: '100%',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.default,
      '& .Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        '&:hover $child': {
          color: 'red'
        }
      },
      '& .MuiListItem-button.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .Mui-focusVisible': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  })
)
export default useStyles
