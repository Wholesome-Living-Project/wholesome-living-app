import { useCallback } from 'react'
import { useElevator } from '../provider/ElevatorContentProvider'
import { useFinance } from '../provider/FinanceContentProvider'
import { useLevels } from '../provider/LevelProvider'
import { useMeditate } from '../provider/MeditationContentProvider'
import { useOnboarding } from '../provider/OnboardingProvider'

const useDataResetter = () => {
  const { setChosenPlugins } = useOnboarding()
  const { resetFinanceData } = useFinance()
  const { resetLevelData } = useLevels()
  const { resetMeditationData } = useMeditate()
  const { resetElevatorData } = useElevator()

  // Add data to reset on logout here
  const resetAppData = useCallback(() => {
    setChosenPlugins([])
    resetFinanceData()
    resetLevelData()
    resetMeditationData()
    resetElevatorData()
  }, [resetElevatorData, resetFinanceData, resetLevelData, resetMeditationData, setChosenPlugins])

  return { resetAppData }
}

export default useDataResetter
