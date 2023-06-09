import { useCallback } from 'react'
import { useOnboarding } from '../provider/OnboardingProvider'

const useDataResetter = () => {
  const { setChosenPlugins } = useOnboarding()

  // Add data to reset on logout here
  const resetAppData = useCallback(() => {
    setChosenPlugins([])
  }, [setChosenPlugins])

  return { resetAppData }
}

export default useDataResetter
