import React, { PropsWithChildren } from 'react'
import { AuthenticationProvider } from './AuthenticationProvider'
import { ChatProvider } from './ChatProvider'
import { ElevatorProvider } from './ElevatorContentProvider'
import { FinanceProvider } from './FinanceContentProvider'
import { MeditationProvider } from './MeditationContentProvider'
import { OnboardingProvider } from './OnboardingProvider'
import SafeScreenProvider from './SafeScreenProvider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <FinanceProvider>
        <MeditationProvider>
          <ElevatorProvider>
            <OnboardingProvider>
              <ChatProvider>
                <SafeScreenProvider>{children}</SafeScreenProvider>
              </ChatProvider>
            </OnboardingProvider>
          </ElevatorProvider>
        </MeditationProvider>
      </FinanceProvider>
    </AuthenticationProvider>
  )
}
