import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  SettingsGetSettingsResponse,
  SettingsNotificationType,
  SettingsPluginName,
  SettingsStrategyType,
} from '../../api/openapi'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'

type OnboardingType = {
  chosenPlugins: SettingsPluginName[]
  setChosenPlugins: (st: SettingsPluginName[]) => void
  visitedOnboardingSteps: string[]
  setVisitedOnboardingSteps: (st: string[]) => void
  finishedPlugins: SettingsPluginName[]
  setFinishedPlugins: (st: SettingsPluginName[]) => void
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
  savingGoal: string
  setSavingGoal: (st: string) => void
  notificationPeriod: SettingsNotificationType
  setNotificationPeriod: (st: SettingsNotificationType) => void
  notificationFrequency: number
  setNotificationFrequency: (st: number) => void
  settings: SettingsGetSettingsResponse | undefined
}

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType)

export const useOnboarding = () => useContext(OnboardingContext)

const useProvideOnboarding = (): OnboardingType => {
  const [settings, setSettings] = useState<SettingsGetSettingsResponse>()
  const [chosenPlugins, setChosenPlugins] = useState<SettingsPluginName[]>([])
  const [chosenPluginSteps, setChosenPluginSteps] = useState<string[]>([])
  const [visitedOnboardingSteps, setVisitedOnboardingSteps] = useState<string[]>([])
  const [finishedPlugins, setFinishedPlugins] = useState<SettingsPluginName[]>([])

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
  const [savingGoal, setSavingGoal] = useState<string>('')
  const [notificationPeriod, setNotificationPeriod] = useState<SettingsNotificationType>(
    SettingsNotificationType.NotificationTypeWeek
  )
  const [notificationFrequency, setNotificationFrequency] = useState<number>(1)
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
          amountNotifications: notificationFrequency,
          investmentGoal: 0,
          investmentTimeGoal: 1,
          strategyAmount: roundUpNumber || 0,
          strategy: selectedStrategy,
          periodNotifications: notificationPeriod,
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
    notificationFrequency,
    notificationPeriod,
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
    if (!user?.id || !Number(savingGoal)) return
    try {
      await api.settingsApi.settingsFinancePut(user?.id, {
        notifications: financeSaveReminderNotification,
        amountNotifications: notificationFrequency,
        investmentGoal: Number(savingGoal),
        investmentTimeGoal: 1,
        strategyAmount: roundUpNumber || 0,
        strategy: selectedStrategy,
        periodNotifications: notificationPeriod,
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [
    financeSaveReminderNotification,
    notificationFrequency,
    notificationPeriod,
    roundUpNumber,
    savingGoal,
    selectedStrategy,
    user?.id,
  ])

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

  const getSettings = useCallback(async () => {
    console.log('gettings settings')
    if (!user?.id) return
    try {
      const { data } = await api.settingsApi.settingsGet(user.id)
      if (data) {
        setSettings(data)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&set(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
        // data.enabledPlugins&&setChosenPlugins(data.enabledPlugins)
      }
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  useEffect(() => {
    getSettings()
  }, [getSettings])

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
    savingGoal,
    setSavingGoal,
    notificationPeriod,
    setNotificationPeriod,
    notificationFrequency,
    setNotificationFrequency,
    settings,
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
