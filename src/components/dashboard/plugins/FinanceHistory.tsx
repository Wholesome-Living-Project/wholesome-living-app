import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'
import { useFinance } from '../../../provider/FinanceContentProvider'
import { Flex } from '../../ui/Flex'
import FinanceListItem from './FinanceListItem'

type Props = {
  preview?: number
}

const FinanceHistory = ({ preview }: Props) => {
  const { spendings } = useFinance()

  return (
    <Flex column>
      {spendings.slice(0, preview ? preview : -1).map((spending, i) => (
        <Fragment key={i}>
          <FinanceListItem spending={spending} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  )
}

export default FinanceHistory
