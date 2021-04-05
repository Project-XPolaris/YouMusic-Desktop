import React, { ReactElement } from 'react'
import useStyles from './style'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import OrderPopup from './components/OrderPopup'
export type AlbumFilterData = {
  order:string
}
export interface AlbumFilterPropsType {
  className?: any
  filter:AlbumFilterData,
  onChange:(newValue:AlbumFilterData) => void
}
const AlbumFilter = ({ className, filter, onChange }: AlbumFilterPropsType): ReactElement => {
  const classes = useStyles()
  const [orderAnchorEl, setOrderAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  return (
    <div className={clsx(className, classes.root)}>
      <IconButton size={'small'} onClick={(e) => setOrderAnchorEl(e.currentTarget)}>
        <Sort />
      </IconButton>
      <OrderPopup
        anchor={orderAnchorEl}
        onClose={() => setOrderAnchorEl(null)}
        value={filter.order}
        onChange={(newOrder) => {
          onChange({
            ...filter,
            order: newOrder
          })
        }}
      />
    </div>
  )
}

export default AlbumFilter
