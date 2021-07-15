import React, { ReactElement } from 'react'
import useStyles from './style'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import ChipPickPopup from '../ChipPickPopup'
export type MusicFilterData = {
  order:string
}
export interface MusicFilterPropsType {
  className?: string
  filter:MusicFilterData,
  onChange:(newValue:MusicFilterData) => void
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
    name: 'title asc',
    value: 'title'
  },
  {
    name: 'title desc',
    value: '-title'
  }
]
const MusicFilter = ({ className, filter, onChange }: MusicFilterPropsType): ReactElement => {
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

export default MusicFilter
