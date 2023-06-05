import { DripsyProvider as Provider, makeTheme } from 'dripsy'
import React from 'react'

const theme = makeTheme({})

export function Dripsy({ children }: { children: React.ReactNode }) {
  return (
    <Provider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr>
      {children}
    </Provider>
  )
}
