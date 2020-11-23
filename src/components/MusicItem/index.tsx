import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Music } from '../../api/music'
import { getMusicAlbumCoverUrl, getMusicArtistString } from '../../utils/music'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'
import { ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 180
  },
  cover: {
    width: 120,
    height: 120,
    objectFit: 'cover'
  },
  title: {
    ...theme.typography.subtitle1,
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  artist: {
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
})

interface MusicItemPropsType {
  music: Music,
  onClick: (music: Music) => void
}

const MusicItem = ({
  music,
  onClick
}: MusicItemPropsType): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <ButtonBase>
        <img src={getMusicAlbumCoverUrl(music)} className={classes.cover} onClick={() => onClick(music)} />
      </ButtonBase>
      <div className={classes.title}>
        {music.title}
      </div>
      <div className={classes.artist}>
        {getMusicArtistString(music)}
      </div>
    </div>
  )
}
export default MusicItem
