import { BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import url from 'url'

function createEditor () {
  const editorWindow = new BrowserWindow({
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
    editorWindow.loadURL('http://localhost:4000/#/editor')
  } else {
    editorWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'editor'
      })
    )
  }
}

console.log("init editor")
let editIds:number[] = []
ipcMain.on('openEditor', (e, ids) => {
  editIds = ids
  createEditor()
})
ipcMain.handle('getEditIds', () => {
  return editIds
})
