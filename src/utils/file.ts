
export const readFile = (file:File):Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
  const fr = new FileReader()
  fr.onload = () => {
    resolve(fr.result)
  }
  fr.onerror = reject
  fr.readAsText(file)
})
