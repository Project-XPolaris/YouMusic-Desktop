import { green, pink } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core'

const appTheme = createMuiTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[500]
    }
  },

})
export default appTheme
