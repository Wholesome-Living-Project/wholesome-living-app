import DashboardHeader from 'app/components/dashboard/DashboardHeader'
import Forest from 'app/components/dashboard/Forest'
import FinanceDetailedBanner from 'app/components/dashboard/plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import RunDetailedBanner from 'app/components/dashboard/plugins/RunDetailedBanner'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { SPACING } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import styled from 'styled-components'

const AppTitleContainer = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 2}px;
`

const SectionTitleContainer = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 2}px;
`

export function DashboardScreen() {
  return (
    <SafeAreaView>
      <DashboardHeader />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <SectionTitleContainer>
          <Heading4>Your Forest</Heading4>
        </SectionTitleContainer>
        <Forest />
        <SectionTitleContainer>
          <Heading4>Your Plugins</Heading4>
        </SectionTitleContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Spacer x={2} />
          <MeditateDetailedBanner />
          <Spacer x={2} />
          <FinanceDetailedBanner />
          <Spacer x={2} />
          <RunDetailedBanner />
          <Spacer x={2} />
        </ScrollView>
        <Spacer x={4} />
      </ScrollView>
    </SafeAreaView>
  )
}
