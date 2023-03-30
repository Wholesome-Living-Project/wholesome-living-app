import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import { Padder } from 'app/components/ui/Padder'
import { SafeAreaBackground } from 'app/components/ui/SafeAreaBackground'
import Spacer from 'app/components/ui/Spacer'
import { Heading3 } from 'app/theme/typography'
import React from 'react'

export function DashboardScreen() {
  return (
    <SafeAreaBackground>
      <Padder>
        <Heading3>Dashboard</Heading3>
        <Spacer x={2} />
        <MeditateDetailedBanner />
      </Padder>
    </SafeAreaBackground>
  )
}
