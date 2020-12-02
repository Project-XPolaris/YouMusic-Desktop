import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, GridProps, Pagination } from '@material-ui/core'
import MusicItem from '../MusicItem'
import { Music } from '../../api/music'
import usePlayerModel from '../../models/player'
import clsx from 'clsx'

const useStyles = makeStyles({
  main: {}
})

interface GridContainerPropsType {
  source?:any[]
  total?:number,
  onPageChange:(page:number)=> void
  itemClassName?:any
  containerProps?:GridProps
  builder:(item:any) => React.ReactElement
  getItemKey:(item:any) => string | number
}
const GridContainer = ({ source = [], total = 0, onPageChange, itemClassName, containerProps = {}, builder, getItemKey }: GridContainerPropsType):React.ReactElement => {
  const classes = useStyles()
  return (
    <>
      <Grid container {...containerProps}>
        {source.map((item:any) => (
          <Grid container item key={getItemKey(item)} className={clsx(itemClassName)}>
            { builder(item) }
          </Grid>
        ))}
      </Grid>
      <Pagination count={total / 55} onChange={(event, page) => onPageChange(page)} />
    </>
  )
}
export default GridContainer
