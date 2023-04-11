import { AuthenticationProvider } from 'app/provider/AuthenticationProvider'
import SafeScreenProvider from 'app/provider/SafeScreenProvider'
import React, { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <SafeScreenProvider>{children}</SafeScreenProvider>
    </AuthenticationProvider>
  )
}
