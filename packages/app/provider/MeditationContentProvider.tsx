import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

type MeditationContentType = {
  timerDifference: number
  setTimerDifference: (st: number) => void
}

const MeditateContext = createContext<MeditationContentType>({} as MeditationContentType)

export const useMeditate = () => useContext(MeditateContext)

const useProvideMeditate = (): MeditationContentType => {
  const [timerDifference, setTimerDifference] = useState(60)

  return { timerDifference, setTimerDifference }
}

export const MeditationProvider = ({ children }: PropsWithChildren) => {
  const providedMeditateProps = useProvideMeditate()
  return (
    <>
      <MeditateContext.Provider value={providedMeditateProps}>{children}</MeditateContext.Provider>
    </>
  )
}
