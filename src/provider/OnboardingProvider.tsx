import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { SettingsNotificationType, SettingsStrategyType, UserPluginName } from '../../api/openapi'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'

type OnboardingType = {
  chosenPlugins: UserPluginName[]
  setChosenPlugins: (st: UserPluginName[]) => void
  visitedOnboardingSteps: string[]
  setVisitedOnboardingSteps: (st: string[]) => void
  finishedPlugins: UserPluginName[]
  setFinishedPlugins: (st: UserPluginName[]) => void
  setChosenPluginSteps: (st: string[]) => void
  chosenPluginSteps: string[]
  selectedGoalTime: number
  setSelectedGoalTime: (st: number) => void
  selectedGoalNumber: number
  setSelectedGoalNumber: (st: number) => void
  selectedGoalPeriod: SettingsNotificationType
  setSelectedGoalPeriod: (st: SettingsNotificationType) => void
  meditateReminderNotification: boolean
  setMeditateReminderNotification: (st: boolean) => void
  financeSaveReminderNotification: boolean
  setFinanceSaveReminderNotification: (st: boolean) => void
  selectedStrategy: SettingsStrategyType
  setSelectedStrategy: (st: SettingsStrategyType) => void
  takeElevatorNotification: boolean
  setTakeElevatorNotification: (st: boolean) => void
  setRoundUpNumber: (st: number) => void
  roundUpNumber: number
  setElevatorSettings: () => void
  setFinanceSettings: () => void
  setMeditationSettings: () => void
  setUserPlugins: () => void
}

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType)

export const useOnboarding = () => useContext(OnboardingContext)

const useProvideOnboarding = (): OnboardingType => {
  const [chosenPlugins, setChosenPlugins] = useState<UserPluginName[]>([])
  const [chosenPluginSteps, setChosenPluginSteps] = useState<string[]>([])
  const [visitedOnboardingSteps, setVisitedOnboardingSteps] = useState<string[]>([])
  const [finishedPlugins, setFinishedPlugins] = useState<UserPluginName[]>([])

  // meditation goal
  const [selectedGoalTime, setSelectedGoalTime] = useState(1)
  const [selectedGoalNumber, setSelectedGoalNumber] = useState(1)
  const [selectedGoalPeriod, setSelectedGoalPeriod] = useState<SettingsNotificationType>(
    SettingsNotificationType.NotificationTypeWeek
  )
  const [meditateReminderNotification, setMeditateReminderNotification] = useState(false)

  // finance
  const [financeSaveReminderNotification, setFinanceSaveReminderNotification] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<SettingsStrategyType>(
    SettingsStrategyType.StrategyTypeRound
  )
  const [roundUpNumber, setRoundUpNumber] = useState(5)

  // elevator
  const [takeElevatorNotification, setTakeElevatorNotification] = useState(false)

  const { user } = useUser()

  const setUserPlugins = useCallback(async () => {
    if (!user?.id) return
    try {
      await api.settingsApi.settingsPost(user?.id, {
        enabledPlugins: chosenPlugins,
        finance: {
          notifications: financeSaveReminderNotification,
          amountNotifications: 0,
          investmentGoal: 0,
          investmentTimeGoal: 0,
          strategyAmount: roundUpNumber || 0,
          strategy: selectedStrategy,
          periodNotifications: SettingsNotificationType.NotificationTypeDay,
        },
        meditation: {
          notifications: meditateReminderNotification,
          amountNotifications: selectedGoalNumber,
          periodNotifications: selectedGoalPeriod,
          meditationTimeGoal: selectedGoalTime,
        },
        elevator: {
          notifications: takeElevatorNotification,
          amountNotifications: 0,
          goal: 0,
          periodNotifications: SettingsNotificationType.NotificationTypeDay,
        },
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [
    chosenPlugins,
    financeSaveReminderNotification,
    meditateReminderNotification,
    roundUpNumber,
    selectedGoalNumber,
    selectedGoalPeriod,
    selectedGoalTime,
    selectedStrategy,
    takeElevatorNotification,
    user?.id,
  ])

  const setElevatorSettings = useCallback(async () => {
    if (!user?.id) return
    try {
      await api.settingsApi.settingsElevatorPut(user?.id, {
        notifications: takeElevatorNotification,
        amountNotifications: 0,
        goal: 0,
        periodNotifications: SettingsNotificationType.NotificationTypeDay,
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [takeElevatorNotification, user?.id])

  const setFinanceSettings = useCallback(async () => {
    if (!user?.id) return
    try {
      await api.settingsApi.settingsFinancePut(user?.id, {
        notifications: financeSaveReminderNotification,
        amountNotifications: 0,
        investmentGoal: 0,
        investmentTimeGoal: 0,
        strategyAmount: roundUpNumber || 0,
        strategy: selectedStrategy,
        periodNotifications: SettingsNotificationType.NotificationTypeDay,
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [financeSaveReminderNotification, roundUpNumber, selectedStrategy, user?.id])

  const setMeditationSettings = useCallback(async () => {
    if (!user?.id) return
    try {
      await api.settingsApi.settingsMeditationPut(user?.id, {
        notifications: meditateReminderNotification,
        amountNotifications: selectedGoalNumber,
        periodNotifications: selectedGoalPeriod,
        meditationTimeGoal: selectedGoalTime,
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [
    meditateReminderNotification,
    selectedGoalNumber,
    selectedGoalPeriod,
    selectedGoalTime,
    user?.id,
  ])

  return {
    chosenPlugins,
    setChosenPlugins,
    visitedOnboardingSteps,
    setVisitedOnboardingSteps,
    finishedPlugins,
    setFinishedPlugins,
    setChosenPluginSteps,
    chosenPluginSteps,
    selectedGoalTime,
    setSelectedGoalTime,
    selectedGoalNumber,
    setSelectedGoalNumber,
    selectedGoalPeriod,
    setSelectedGoalPeriod,
    meditateReminderNotification,
    setMeditateReminderNotification,
    financeSaveReminderNotification,
    setFinanceSaveReminderNotification,
    selectedStrategy,
    setSelectedStrategy,
    takeElevatorNotification,
    setTakeElevatorNotification,
    setRoundUpNumber,
    roundUpNumber,
    setElevatorSettings,
    setFinanceSettings,
    setMeditationSettings,
    setUserPlugins,
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
