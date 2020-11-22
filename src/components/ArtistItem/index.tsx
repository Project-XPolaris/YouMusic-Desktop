import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'
import { Artist } from '../../api/artist'
import { getImageUrl } from '../../utils/image'

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
  }
})

interface ArtistItemPropsType {
  artist:Artist;
}
const ArtistItem = ({ artist }: ArtistItemPropsType):React.ReactElement => {
  const classes = useStyles()
  console.log(artist.avatar)
  return (
    <div className={classes.main}>
      <img src={getImageUrl(artist.avatar)} className={classes.cover}/>
      <div className={classes.title}>
        {artist.name}
      </div>
    </div>
  )
}
export default ArtistItem
