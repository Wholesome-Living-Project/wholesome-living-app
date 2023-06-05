import React, { PropsWithChildren } from 'react'
import { Dripsy as DripsyProvider } from './DripsyProvider'

// add providers here
const Providers = ({ children }: PropsWithChildren) => {
  return <DripsyProvider>{children}</DripsyProvider>
}

export default Providers
