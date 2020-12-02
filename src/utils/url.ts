export const getQueryParamsFromSearch = (search:string):{[key:string]:string} => {
  const searchUrl = new URLSearchParams(search)
  const result : {[key:string]:string} = {}
  searchUrl.forEach((value, key) => {
    result[key] = value
  })
  return result
}
