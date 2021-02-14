export const ApplicationConfig = {
  apiUrl: 'http://192.168.31.186:3000',
  apiPaths: {
    albumList: '/album',
    album: '/album/:id',
    artistList: '/artist',
    artist: '/artist/:id',
    musicList: '/music',
    libraryList: '/library',
    libraryScan: '/library/:id/scan',
    libraryObject: '/library/:id',
    readPath: '/explore/read'
  },
  keys: {
    store: {
      apiUrl: 'API_URL'
    }
  }
}
