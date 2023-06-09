import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRootNavigation } from 'expo-router'
import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { useFinance } from '../../../provider/FinanceContentProvider'
import { COLORS } from '../../../theme/theme'
import { Heading4, Regular } from '../../../theme/typography'
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
  const navigation = useRootNavigation()

  return (
    <Flex column>
      <Flex row justify={'space-between'} align={'flex-end'}>
        <ListTitle>History</ListTitle>
        {preview && (
          <TouchableOpacity onPress={() => navigation?.navigate('finance-analytics' as never)}>
            <Flex row align={'center'}>
              <Regular color={COLORS.CTA}>Details</Regular>
              <Spacer x={0.5} />
            </Flex>
          </TouchableOpacity>
        )}
      </Flex>
      <Spacer x={2} />
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
