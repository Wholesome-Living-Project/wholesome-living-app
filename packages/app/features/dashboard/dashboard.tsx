import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import { Padder } from 'app/components/ui/Padder'
import { SafeAreaBackground } from 'app/components/ui/SafeAreaBackground'
import React from 'react'

export function DashboardScreen() {
  return (
    <SafeAreaBackground>
      <Padder>
        <MeditateDetailedBanner />
      </Padder>
    </SafeAreaBackground>
  )
}
