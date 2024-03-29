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
    info: '/info',
    spotifyCode: '/spotify/client/code',
    spotifyUnlink: '/spotify/login',
    spotifySearch: '/spotify/search',
    accountInfo: '/account/my',
    searchAlbumMeta: '/meta/search/album',
    searchMusicMeta: '/meta/search/music',
    musicMetaLyric: '/meta/lyric'
  },
  keys: {
    store: {
      apiUrl: 'API_URL',
      token: 'TOKEN',
      username: 'USERNAME'
    }
  }
}
