export interface LoginHistory {
  apiUrl:string
  username:string
  token:string
}

class LoginHistoryManager {
  list:LoginHistory[]
  constructor () {
    this.list = []
  }

  refresh () {
    const rawData = localStorage.getItem('loginHistory')
    if (rawData === null) {
      this.list = []
      return
    }
    this.list = JSON.parse(rawData)
  }

  addHistory (history:LoginHistory) {
    this.list = this.list.filter(savedHistory => !(savedHistory.apiUrl === history.apiUrl && savedHistory.username === history.username))
    this.list.unshift(history)
    this.save()
  }

  save () {
    const rawData = JSON.stringify(this.list)
    localStorage.setItem('loginHistory', rawData)
  }
}

export const loginHistoryManager = new LoginHistoryManager()
