import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import { Padder } from 'app/components/ui/Padder'
import { SafeArea } from 'app/components/ui/SafeArea'
import Spacer from 'app/components/ui/Spacer'
import { Heading3 } from 'app/theme/typography'
import React from 'react'

export function DashboardScreen() {
  return (
    <SafeArea>
      <Padder>
        <Heading3>Dashboard</Heading3>
        <Spacer x={2} />
        <MeditateDetailedBanner />
      </Padder>
    </SafeArea>
  )
}
