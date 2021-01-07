import React from 'react';
import { Album } from '../../api/album';
import { Artist } from '../../api/artist';
import Collection from '../Collection';
import useStyles from '../AlbumCollection/style';
import clsx from 'clsx';
import AlbumArtistItem from '../AlbumArtist';

export interface ArtistCollectionPropsType {
  title: string
  artistList: Artist[]
  className: any
}

const ArtistCollection = ({artistList,title,className}: ArtistCollectionPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <Collection title={title} className={clsx(className,classes.root)}>
      {
        artistList.map(artist => (
          <AlbumArtistItem artist={artist} key={artist.id} className={classes.item}/>
        ))
      }
    </Collection>
  );
};

export default ArtistCollection;
