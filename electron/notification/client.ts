import { client as WebsocketClient } from 'websocket'
import { ipcMain, webContents } from 'electron'
import { Channels } from '../channels'

const webSocket = new WebsocketClient({})
let notificationId:string

webSocket.connect('ws://localhost:3010')

const messageHandler = (message:any) => {
  switch (message.event) {
    case 'Register':
      notificationId = message.data.id
      return
    case 'RefreshSpotifyAuth':
      for (const webContent of webContents.getAllWebContents()) {
        webContent.send(Channels.RefreshSpotifyAuth)
      }
      return
    case 'LibraryScanComplete':
      for (const webContent of webContents.getAllWebContents()) {
        webContent.send(Channels.LibraryScanComplete, message.data.id, message.data.path)
      }
  }
}
webSocket.on('connect', (cb) => {
  console.log('connected')
  cb.on('message', (e) => {
    const rawData = e.utf8Data
    if (rawData) {
      const message = JSON.parse(rawData)
      messageHandler(message)
    }
  })
})

ipcMain.on(Channels.GetNotificationId, (event) => {
  event.returnValue = notificationId
})
