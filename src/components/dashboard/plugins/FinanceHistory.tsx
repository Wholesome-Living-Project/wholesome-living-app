import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { useFinance } from '../../../provider/FinanceContentProvider'
import { Heading4 } from '../../../theme/typography'
import { Flex } from '../../ui/Flex'
import Spacer from '../../ui/Spacer'
import FinanceListItem from './FinanceListItem'

const ListTitle = styled(Heading4)`
  padding: 0;
`

type Props = {
  preview?: number
}

const FinanceHistory = ({ preview }: Props) => {
  const { spendings } = useFinance()

  return (
    <Flex column>
      <ListTitle>History</ListTitle>
      <Spacer x={1} />
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
