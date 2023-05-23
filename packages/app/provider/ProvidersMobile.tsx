import { AuthenticationProvider } from 'app/provider/AuthenticationProvider'
import { MeditationProvider } from 'app/provider/MeditationContentProvider'
import SafeScreenProvider from 'app/provider/SafeScreenProvider'
import React, { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <MeditationProvider>
        <SafeScreenProvider>{children}</SafeScreenProvider>
      </MeditationProvider>
    </AuthenticationProvider>
  )
}
