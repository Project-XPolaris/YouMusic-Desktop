import { createModel } from 'hox'
import { useState } from 'react'
import { AccountInfo, fetchMyAccount } from '../../../api/account'
import { unlinkSpotify } from '../../../api/spotify'
import { ipcRenderer } from 'electron'
import { Channels } from '../../../../electron/channels'

const AccountModel = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>()
  const refresh = async () => {
    const response = await fetchMyAccount()
    setAccountInfo(response)
  }
  const unlink = async () => {
    await unlinkSpotify()
    await refresh()
  }
  ipcRenderer.on(Channels.RefreshSpotifyAuth,() => {
    refresh()
  })
  return {
    accountInfo, refresh, unlink
  }
}
const useAccountModel = createModel(AccountModel)
export default useAccountModel
