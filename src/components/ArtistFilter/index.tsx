import React, { ReactElement } from 'react'
import useStyles from './style'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import ChipPickPopup from '../ChipPickPopup'
export type ArtistFilterData = {
  order:string
}
export interface ArtistFilterPropsType {
  className?: string
  filter:ArtistFilterData,
  onChange:(newValue:ArtistFilterData) => void
}
const orderFilterItem = [
  {
    name: 'id asc',
    value: 'id'
  },
  {
    name: 'id desc',
    value: '-id'
  },
  {
    name: 'name asc',
    value: 'name'
  },
  {
    name: 'name desc',
    value: '-name'
  }
]
const ArtistFilter = ({ className, filter, onChange }: ArtistFilterPropsType): ReactElement => {
  const classes = useStyles()
  const [orderAnchorEl, setOrderAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  return (
    <div className={clsx(className, classes.root)}>
      <IconButton size={'small'} onClick={(e) => setOrderAnchorEl(e.currentTarget)}>
        <Sort />
      </IconButton>
      <ChipPickPopup
        title={'orders'}
        anchor={orderAnchorEl}
        onClose={() => setOrderAnchorEl(null)}
        items={orderFilterItem}
        value={filter.order}
        onChange={(newOrder) => {
          onChange({
            ...filter,
            order: newOrder
          })
          setOrderAnchorEl(null)
        }}
      />
    </div>
  )
}

export default ArtistFilter
