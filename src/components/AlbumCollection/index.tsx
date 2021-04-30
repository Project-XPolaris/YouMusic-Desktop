import React from 'react'
import Collection from '../Collection'
import { Album } from '../../api/album'
import AlbumItem from '../AlbumItem'
import useStyles from './style'
import clsx from 'clsx'

export interface AlbumCollectionPropsType {
  title: string
  albums: Album[]
  className?: string
  onItemClick?:(album:Album) => void
  onTitleClick?:(album:Album) => void
}

const AlbumCollection = ({ title, albums, className, onItemClick, onTitleClick }: AlbumCollectionPropsType): React.ReactElement => {
  const classes = useStyles()
  return (
    <Collection title={title} className={clsx(className, classes.root)}>
      {albums.map(album => (
        <AlbumItem album={album} onClick={onItemClick} onTitleClick={onTitleClick} key={album.id} className={classes.item} />
      ))}
    </Collection>
  )
}

export default AlbumCollection
