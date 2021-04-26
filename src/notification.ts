import { ipcRenderer } from 'electron'
import { Channels } from '../electron/channels'

ipcRenderer.on(Channels.NotificationRegister, (event, id) => {
  console.log(id)
})
