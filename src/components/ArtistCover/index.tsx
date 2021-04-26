import React, { ReactElement } from 'react'
import { Person } from '@material-ui/icons'
import useStyles from './style'
import { getImageUrl } from '../../utils/image'
import clsx from 'clsx'

export interface ArtistCoverPropsType {
  coverUrl:string | undefined
  className?:string
}

const ArtistCover = ({ coverUrl, className }: ArtistCoverPropsType): ReactElement => {
  const classes = useStyles()
  if (coverUrl) {
    return (
      <img src={getImageUrl(coverUrl)} className={clsx(classes.cover, className)} />
    )
  } else {
    return (
      <div className={clsx(classes.noCover, className)}>
        <Person className={classes.noCoverIcon} />
      </div>
    )
  }
}

export default ArtistCover
