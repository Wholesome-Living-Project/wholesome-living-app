import { AuthenticationProvider } from 'app/provider/AuthenticationProvider'
import { MeditationProvider } from 'app/provider/MeditationContentProvider'
import { OnboardingProvider } from 'app/provider/OnboardingProvider'
import SafeScreenProvider from 'app/provider/SafeScreenProvider'
import React, { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <MeditationProvider>
        <OnboardingProvider>
          <SafeScreenProvider>{children}</SafeScreenProvider>
        </OnboardingProvider>
      </MeditationProvider>
    </AuthenticationProvider>
  )
}
