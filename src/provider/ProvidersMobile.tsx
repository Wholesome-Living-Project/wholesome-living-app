import React, { PropsWithChildren } from 'react'
import { AuthenticationProvider } from './AuthenticationProvider'
import { FinanceProvider } from './FinanceContentProvider'
import { MeditationProvider } from './MeditationContentProvider'
import { OnboardingProvider } from './OnboardingProvider'
import SafeScreenProvider from './SafeScreenProvider'

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
