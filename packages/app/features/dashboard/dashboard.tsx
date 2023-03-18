import { Padder } from 'app/components/Padder'
import { SafeAreaBackground } from 'app/components/SafeAreaBackground'
import { useAuth } from 'app/hooks/useAuth'
import { Heading3 } from 'app/theme/typography'
import React from 'react'

export function DashboardScreen() {
  const user = useAuth()

  return (
    <SafeAreaBackground>
      <Padder>
        <Heading3>Welcome {user?.email}</Heading3>
      </Padder>
    </SafeAreaBackground>
  )
}
