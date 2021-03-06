import React, { MouseEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Artist } from '../../api/artist'
import { getImageUrl } from '../../utils/image'
import PersonIcon from '@material-ui/icons/Person'
import { ButtonBase } from '@material-ui/core'

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
  }
})

interface ArtistItemPropsType {
  artist:Artist;
  onClick:(artist:Artist) => void
  onContextClick?:MouseEventHandler
}
const ArtistItem = ({ onContextClick, artist, onClick }: ArtistItemPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <div className={classes.main} onContextMenu={onContextClick}>
      <ButtonBase onClick={() => onClick(artist)}>
        {
          artist.avatar ? <img src={getImageUrl(artist.avatar)} className={classes.cover}/> : <div className={classes.noCover}><PersonIcon className={classes.noCoverIcon} /></div>
        }
      </ButtonBase>
      <div className={classes.title}>
        {artist.name}
      </div>
    </div>
  )
}
export default ArtistItem
