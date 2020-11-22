import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import BaseLayout from './layout/BaseLayout'
import appTheme from './theme'
import { ThemeProvider } from '@material-ui/core'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
        <ThemeProvider theme={appTheme}>
          <GlobalStyle />
          <BaseLayout />
        </ThemeProvider>
    </>
  )
}

render(<App />, mainElement)
