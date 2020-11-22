export const playTimeText = (duration:number):string => {
  duration = duration / 100
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration - (hours * 3600)) / 60)
  const seconds = duration - (hours * 3600) - (minutes * 60)
  const parts:string[] = []
  if (hours !== 0) {
    if (hours < 10) {
      parts.push('0' + hours)
    } else {
      parts.push('' + hours)
    }
  }
  if (minutes < 10) {
    parts.push('0' + minutes.toFixed(0))
  } else {
    parts.push(minutes.toFixed(0))
  }
  if (seconds < 10) {
    parts.push('0' + seconds.toFixed(0))
  } else {
    parts.push(seconds.toFixed(0))
  }
  return parts.join(':')
}
