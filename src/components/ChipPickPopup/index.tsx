import React from 'react'
import { Chip, Paper, Popover } from '@material-ui/core'
import useStyles from './style'

export interface PickUpChip {
  name: string,
  value: any
}

export interface ChipPickPopupPropsType {
  anchor: any
  onClose: () => void
  items: PickUpChip[]
  value: any
  onChange: (value: any) => void
  title: string
}

const ChipPickPopup = ({ anchor, onClose, items, value, onChange, title }: ChipPickPopupPropsType) => {
  const classes = useStyles()
  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
    >
      <Paper className={classes.root}>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.container}>
          {
            items.map((item: PickUpChip) => {
              return (
                <Chip
                  label={item.name}
                  key={item.value}
                  className={classes.chip}
                  color={value === item.value ? 'primary' : undefined}
                  clickable
                  onClick={() => onChange(item.value)}
                />
              )
            })
          }
        </div>
      </Paper>
    </Popover>
  )
}

export default ChipPickPopup
