import React from 'react'
import { Artist } from '../../api/artist'
import Collection from '../Collection'
import useStyles from '../AlbumCollection/style'
import clsx from 'clsx'
import AlbumArtistItem from '../AlbumArtist'

export interface ArtistCollectionPropsType {
  title: string
  artistList: Artist[]
  className?: string
  onItemClick?:(artist:Artist) => void
}

const ArtistCollection = ({ artistList, title, className, onItemClick }: ArtistCollectionPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <Collection title={title} className={clsx(className, classes.root)}>
      {
        artistList.map(artist => (
          <AlbumArtistItem
            artist={artist}
            key={artist.id}
            className={classes.item}
            onClick={() => {
              if (onItemClick) {
                onItemClick(artist)
              }
            }}
          />
        ))
      }
    </Collection>
  )
}

export default ArtistCollection
