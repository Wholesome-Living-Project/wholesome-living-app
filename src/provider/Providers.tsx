import React, { PropsWithChildren } from 'react'
import { AuthenticationProvider } from './AuthenticationProvider'
import { ChatProvider } from './ChatProvider'
import { ElevatorProvider } from './ElevatorContentProvider'
import { FinanceProvider } from './FinanceContentProvider'
import { LevelProvider } from './LevelProvider'
import { MeditationProvider } from './MeditationContentProvider'
import { OnboardingProvider } from './OnboardingProvider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <OnboardingProvider>
        <ChatProvider>
          <FinanceProvider>
            <LevelProvider>
              <ElevatorProvider>
                <MeditationProvider>{children}</MeditationProvider>
              </ElevatorProvider>
            </LevelProvider>
          </FinanceProvider>
        </ChatProvider>
      </OnboardingProvider>
    </AuthenticationProvider>
  )
}
