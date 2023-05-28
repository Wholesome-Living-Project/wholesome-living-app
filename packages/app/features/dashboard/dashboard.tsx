import FinanceDetailedBanner from 'app/components/dashboard/plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import RunDetailedBanner from 'app/components/dashboard/plugins/RunDetailedBanner'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { SPACING } from 'app/theme/theme'
import { Heading3, Heading5 } from 'app/theme/typography'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import styled from 'styled-components'

const AppTitleContainer = styled(Flex)`
  background: red;
  width: 100%;
  padding: ${SPACING * 2}px;
`

export function DashboardScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <AppTitleContainer flex={1}>
          <Heading5>Wholesome</Heading5>
          <Heading3>Dashbord</Heading3>
        </AppTitleContainer>
        <Spacer x={2} />
        <MeditateDetailedBanner />
        <Spacer x={4} />
        <FinanceDetailedBanner />
        <Spacer x={4} />
        <RunDetailedBanner />
      </ScrollView>
    </SafeAreaView>
  )
}
