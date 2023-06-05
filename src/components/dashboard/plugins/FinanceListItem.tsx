import React from 'react'
import ListItem, { ListItemActions } from './ListItem'

type Props = {
  spending: {
    amount: number
    date: number
    text: string
  }
}
const FinanceListItem = ({ spending }: Props) => {
  const { amount, date, text } = spending
  return (
    <ListItem
      title={new Date(date ? date * 1000 : '').toLocaleDateString()}
      content={`${amount} CHF - ${text}`}
      possibleActions={ListItemActions.DELETE}
    />
  )
}

export default FinanceListItem