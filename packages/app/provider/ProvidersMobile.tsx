import { AuthenticationProvider } from 'app/provider/AuthenticationProvider'
import { FinanceProvider } from 'app/provider/FinanceContentProvider'
import { MeditationProvider } from 'app/provider/MeditationContentProvider'
import { OnboardingProvider } from 'app/provider/OnboardingProvider'
import SafeScreenProvider from 'app/provider/SafeScreenProvider'
import React, { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <FinanceProvider>
        <MeditationProvider>
          <OnboardingProvider>
            <SafeScreenProvider>{children}</SafeScreenProvider>
          </OnboardingProvider>
        </MeditationProvider>
      </FinanceProvider>
    </AuthenticationProvider>
  )
}
