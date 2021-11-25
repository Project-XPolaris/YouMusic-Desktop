import useStyles from './style'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { Apps } from '@material-ui/icons'
import ChipPickPopup from '../ChipPickPopup'
import React from 'react'
export interface ViewSelectItem {
  name:string
  value:string
}

export interface ViewSelectPopupPropsType {
  className?: string;
  items:ViewSelectItem[]
  value:string
  onChange:(value:string) => void
}

const ViewSelectPopup = ({ className, value, onChange, items = [] }: ViewSelectPopupPropsType): React.ReactElement => {
  const classes = useStyles()
  const [popupAnchorEl, setPopupAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  return (
    <div className={clsx(className, classes.root)}>
      <IconButton size={'small'} onClick={(e) => setPopupAnchorEl(e.currentTarget)}>
        <Apps />
      </IconButton>
      <ChipPickPopup
        title={'view'}
        anchor={popupAnchorEl}
        onClose={() => setPopupAnchorEl(null)}
        items={items}
        value={value}
        onChange={(v) => {
          onChange(v)
          setPopupAnchorEl(null)
        }}
      />
    </div>
  )
}

export default ViewSelectPopup
