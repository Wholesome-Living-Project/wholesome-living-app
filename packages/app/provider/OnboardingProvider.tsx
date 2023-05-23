import { plugins } from 'app/helpers/pluginList'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'

type OnboardingType = {
  chosenPlugins: plugins[]
  setChosenPlugins: (st: plugins[]) => void
  goToNextStep: () => void
  finishedOnboardingSteps: string[]
  setFinishedOnboardingSteps: (st: string[]) => void
  finishedPlugins: string[]
  setFinishedPlugins: (st: string[]) => void
}

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType)

export const useOnboarding = () => useContext(OnboardingContext)

const useProvideOnboarding = (): OnboardingType => {
  const [chosenPlugins, setChosenPlugins] = useState<plugins[]>([])
  const [finishedOnboardingSteps, setFinishedOnboardingSteps] = useState<string[]>([])
  const [finishedPlugins, setFinishedPlugins] = useState<string[]>([])

  const goToNextStep = useCallback(() => {
    // go to next step
  }, [])

  return {
    chosenPlugins,
    setChosenPlugins,
    goToNextStep,
    finishedOnboardingSteps,
    setFinishedOnboardingSteps,
    finishedPlugins,
    setFinishedPlugins,
  }
}

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const providedOnboardingProps = useProvideOnboarding()
  return (
    <>
      <OnboardingContext.Provider value={providedOnboardingProps}>
        {children}
      </OnboardingContext.Provider>
    </>
  )
}
