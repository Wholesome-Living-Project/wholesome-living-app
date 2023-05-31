import PluginDetailedBanner from 'app/components/dashboard/PluginDetailedBanner'
import { useFinance } from 'app/provider/FinanceContentProvider'
import { COLORS } from 'app/theme/theme'
import { Regular } from 'app/theme/typography'
import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { UserPluginName } from '../../../../api/openapi'

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Content = () => {
  const { aggregateSavings } = useFinance()

  return (
    <Wrapper>
      <Regular color={COLORS.WHITE}>Saved this month</Regular>
      <Text style={{ fontSize: 33, color: COLORS.WHITE, fontWeight: '600' }}>
        {aggregateSavings + '.-'}
      </Text>
    </Wrapper>
  )
}

const FinanceDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={UserPluginName.PluginNameElevator}
      backgroundImage={require('../../../../assets/images/man_saving_money.jpg')}
    />
  )
}

export default FinanceDetailedBanner
