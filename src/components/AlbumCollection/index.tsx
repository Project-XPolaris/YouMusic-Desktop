import React from 'react'
import Collection from '../Collection'
import { Album } from '../../api/album'
import AlbumItem from '../AlbumItem'
import useStyles from './style';
import clsx from 'clsx';

export interface AlbumCollectionPropsType {
  title: string
  albums: Album[]
  className: any
}

const AlbumCollection = ({ title, albums,className }: AlbumCollectionPropsType): React.ReactElement => {
  const classes = useStyles()
  return (
    <Collection title={title} className={clsx(className,classes.root)}>
      {albums.map(album => (
        <AlbumItem album={album} onClick={() => {}} onTitleClick={() => {}} key={album.id} className={classes.item} />
      ))}
    </Collection>
  )
}

export default AlbumCollection
