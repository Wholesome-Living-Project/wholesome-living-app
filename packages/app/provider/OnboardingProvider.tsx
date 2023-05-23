import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'

type OnboardingType = {
  chosenPlugins: string[]
  setChosenPlugins: (st: string[]) => void
  goToNextStep: () => void
}

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType)

export const useOnboarding = () => useContext(OnboardingContext)

const useProvideOnboarding = (): OnboardingType => {
  const [chosenPlugins, setChosenPlugins] = useState<string[]>([])

  const goToNextStep = useCallback(() => {
    // go to next step
  }, [])

  return { chosenPlugins, setChosenPlugins, goToNextStep }
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
