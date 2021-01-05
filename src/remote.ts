export let electron : any
export let electronRemote : any
export let electronApp : any
if (window.require) {
  electron = window.require('electron')
  electronRemote = electron?.remote
  electronApp = electron?.remote?.app
}
