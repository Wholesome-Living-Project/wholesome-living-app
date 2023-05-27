import FinanceListItem from 'app/components/dashboard/plugins/FinanceListItem'
import { Flex } from 'app/components/ui/Flex'
import { useFinance } from 'app/provider/FinanceContentProvider'
import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'

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
