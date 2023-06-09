import React from 'react'
import { FinanceGetInvestmentResponse } from '../../../../api/openapi'
import ListItem, { ListItemActions } from './ListItem'

type Props = {
  spending: FinanceGetInvestmentResponse
}
const FinanceListItem = ({ spending }: Props) => {
  const { amount, spendingTime, description } = spending
  return (
    <ListItem
      title={new Date(spendingTime ? spendingTime * 1000 : '').toLocaleDateString()}
      content={`${amount} CHF - ${description}`}
      possibleActions={ListItemActions.DELETE}
    />
  )
}

export default FinanceListItem
