import { useCallback } from 'react'
import { useOnboarding } from '../provider/OnboardingProvider'

const UseDataResetter = () => {
  const {
    setCoach,
    setChosenPlugins,
    setUserPlugins,
    setChosenPluginSteps,
    setFinishedPlugins,
    setVisitedOnboardingSteps,
    setRoundUpNumber,
    setTakeElevatorNotification,
    setFinanceSaveReminderNotification,
    setMeditateReminderNotification,
    setNotificationFrequency,
    setNotificationPeriod,
    setSelectedGoalPeriod,
    setSelectedGoalNumber,
    setSelectedGoalTime,
    setSelectedStrategy,
    setElevatorSettings,
    setSavingGoal,
  } = useOnboarding()

  // Add data to reset on logout here
  const resetAppData = useCallback(() => {
    setChosenPlugins([])
  }, [setChosenPlugins])

  return { resetAppData }
}

export default UseDataResetter
