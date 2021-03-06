export interface LyricLine {
  time:number
  text:string
}
export class LyricsManager {
  lines:Array<LyricLine> = [];
  static fromLyricsText (rawLrc:string):LyricsManager {
    const instance = new LyricsManager()
    const timeExp = /^\[([\d:.]*)]/g
    const lines : Array<string> = rawLrc.split('\n')
    for (let line of lines) {
      line = line.trim()
      const result = timeExp.exec(line)
      if (result) {
        const text = line.replace(timeExp, '').trim()
        if (text) {
          const timeArr = RegExp.$1.split(':')
          if (timeArr.length < 3) timeArr.unshift('0')
          if (timeArr[2].indexOf('.') > -1) {
            timeArr.push(...timeArr[2].split('.'))
            timeArr.splice(2, 1)
          }
          instance.lines.push({
            time: parseInt(timeArr[0]) * 60 * 60 * 1000 + parseInt(timeArr[1]) * 60 * 1000 + parseInt(timeArr[2]) * 1000 + parseInt(timeArr[3] || '0'),
            text
          })
        }
      }
    }
    return instance
  }

  getLyricTimeByTime = (time:number):number => {
    if (this.lines.length === 0) {
      return 0
    }
    for (let i = 0; i < this.lines.length - 1; i++) {
      if (this.lines[i + 1].time > time) {
        return this.lines[i].time
      }
    }
    return this.lines[this.lines.length - 1].time
  }
}
