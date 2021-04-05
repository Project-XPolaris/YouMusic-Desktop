import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Music } from '../../api/music'
import { getMusicAlbumCoverUrl, getMusicArtistString } from '../../utils/music'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'
import { ButtonBase } from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

const useStyles = makeStyles({
  main: {
    width: 120,
    height: 180
  },
  cover: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: theme.spacing(1)
  },
  noCover: {
    width: 120,
    height: 120,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(1)
  },
  noCoverIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 32
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
        {
          music.album?.cover ? <img src={getMusicAlbumCoverUrl(music)} className={classes.cover} onClick={() => onClick(music)} /> :<div className={classes.noCover}><MusicNoteIcon className={classes.noCoverIcon} /></div>
        }
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
