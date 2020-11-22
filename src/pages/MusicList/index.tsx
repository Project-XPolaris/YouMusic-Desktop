import * as React from 'react'
import { createStyles, Grid, Typography, withStyles } from '@material-ui/core'
import useStyles from './style'
import AlbumItem from '../../components/AlbumItem'
import ArtistItem from '../../components/ArtistItem'
import MusicItem from '../../components/MusicItem'
import { useMount } from 'ahooks'
import useMusicListModel from './model'
import usePlayerModel from '../../model/player'

const MusicListPage = ({}) => {
  const classes = useStyles()
  const musicModel = useMusicListModel()
  const playerModel = usePlayerModel()
  useMount(async () => {
    await musicModel.fetchMusic()
  })
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        {musicModel.data.map((music) => (
          <Grid container item key={music.id} className={classes.item}>
            <MusicItem music={music} onClick={() => playerModel.setCurrentMusic(music)}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MusicListPage
