import FinanceDetailedBanner from 'app/components/dashboard/plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import RunDetailedBanner from 'app/components/dashboard/plugins/RunDetailedBanner'
import Spacer from 'app/components/ui/Spacer'
import { Heading3 } from 'app/theme/typography'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

export function DashboardScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Heading3>Dashboard</Heading3>
        <Spacer x={2} />
        <MeditateDetailedBanner />
        <Spacer x={4} />
        <RunDetailedBanner />
        <Spacer x={4} />
        <FinanceDetailedBanner />
        <Spacer x={4} />
      </ScrollView>
    </SafeAreaView>
  )
}
