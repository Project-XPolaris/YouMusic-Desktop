import express from 'express'
import { webContents } from 'electron'

export const runExpress = ():void => {
  const app = express()
  const port = 3070
  app.get('/spotify/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + '210f3d41c0af4aefb8115b57524a2155' +
      '&redirect_uri=http://localhost:3070/spotify/login/callback')
  })
  app.get('/spotify/login/callback', async (req, res) => {
    const { code } = req.query
    for (const webContent of webContents.getAllWebContents()) {
      webContent.send('spotifyCodeReceive', code)
    }
    res.send(JSON.stringify({ success: 'true' }))
  })
  app.listen(port, () => {
    console.log(`auth listening at http://localhost:${port}`)
  })
}
