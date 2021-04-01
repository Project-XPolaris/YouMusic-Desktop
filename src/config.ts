export const ApplicationConfig = {
  apiPaths: {
    albumList: '/album',
    album: '/album/:id',
    artistList: '/artist',
    artist: '/artist/:id',
    musicList: '/music',
    libraryList: '/library',
    libraryScan: '/library/:id/scan',
    libraryObject: '/library/:id',
    readPath: '/explore/read',
    info: '/app/info'
  },
  keys: {
    store: {
      apiUrl: 'API_URL',
      token: 'TOKEN'
    }
  }
}
