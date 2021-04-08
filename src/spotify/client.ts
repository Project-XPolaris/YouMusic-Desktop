import { ipcRenderer } from 'electron'
import { sendSpotifyAuthCode } from '../api/spotify'

ipcRenderer.on('spotifyCodeReceive', async (e, code) => {
  await sendSpotifyAuthCode(code)
})
