import { BrowserWindow, ipcMain } from 'electron'

ipcMain.on('openSpotifyLoginWindow', async () => {
  const loginWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })
  await loginWindow.loadURL('http://localhost:3070/spotify/login')
  loginWindow.show()
})
