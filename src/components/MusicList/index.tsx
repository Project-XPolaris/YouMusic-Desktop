import React from 'react'
import { Grid, GridProps, Pagination } from '@material-ui/core'
import clsx from 'clsx'

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
