import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { runExpress } from './express/instance'
import './spotify/login'
import './notification/client'
import { Channels } from './channels'
let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true
    },
    icon: path.join(__dirname, '/assets/icon.png'),
    frame: false
  })
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000/')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'start'
      })
    )
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
ipcMain.on('close', () => {
  app.exit(0)
})
app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    runExpress()
    // if (process.env.NODE_ENV === 'development') {
    //   installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err))
    //   installExtension(REDUX_DEVTOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err))
    // }
  })
app.allowRendererProcessReuse = true

ipcMain.on(Channels.ExitApp, () => {
  app.exit()
})
ipcMain.on(Channels.Min, () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on(Channels.Max, () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
      return
    }
    mainWindow.maximize()
  }
})
