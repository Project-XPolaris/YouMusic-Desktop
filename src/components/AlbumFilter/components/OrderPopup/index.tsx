import React, { ReactElement } from 'react'
import { Chip, Paper, Popover } from '@material-ui/core'
import useStyles from './style'

export interface OrderPopupPropsType {
  anchor:any
  onClose:() => void
  value:string
  onChange:(newValue:string) => void
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
const OrderPopup = ({ anchor, onClose, onChange, value }: OrderPopupPropsType): ReactElement => {
  const classes = useStyles()
  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
    >
      <Paper className={classes.root}>
        <div className={classes.title}>
          Orders
        </div>
        <div className={classes.container}>
          {
            orderFilterItem.map(item => {
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

export default OrderPopup
