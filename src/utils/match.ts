export const matchName = (text:string, pattern:string): {[key:string]:string} => {
  const replaceString = '[\\^$.|?*+()'
  const extractNames = ['track', 'title', 'artist']
  for (const symbol of replaceString) {
    pattern = pattern.replace(symbol, `\\${symbol}`)
  }
  for (const extractName of extractNames) {
    pattern = pattern.replace(`%${extractName}%`, `(?<${extractName}>.*?)`)
  }
  const regex = new RegExp(`^${pattern}$`)
  const match = regex.exec(text)
  if (!match) {
    return {}
  }
  return match.groups ?? {}
}
