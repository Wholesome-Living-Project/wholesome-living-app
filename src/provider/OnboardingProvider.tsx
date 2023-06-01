import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { plugins } from '../helpers/pluginList'
import { UserPluginName } from "../../api/openapi";

type OnboardingType = {
  chosenPlugins: UserPluginName[]
  setChosenPlugins: (st: UserPluginName[]) => void
  visitedOnboardingSteps: string[]
  setVisitedOnboardingSteps: (st: string[]) => void
  finishedPlugins: UserPluginName[]
  setFinishedPlugins: (st: UserPluginName[]) => void
  setChosenPluginSteps: (st: UserPluginName[]) => void
  chosenPluginSteps: UserPluginName[]
  selectedGoalTime: number
  setSelectedGoalTime: (st: number) => void
  selectedGoalNumber: number
  setSelectedGoalNumber: (st: number) => void
  selectedGoalPeriod: string
  setSelectedGoalPeriod: (st: string) => void
  meditateReminderNotification: boolean
  setMeditateReminderNotification: (st: boolean) => void
  financeSaveReminderNotification: boolean
  setFinanceSaveReminderNotification: (st: boolean) => void
  selectedStrategy: string
  setSelectedStrategy: (st: string) => void
  takeElevatorNotification: boolean
  setTakeElevatorNotification: (st: boolean) => void
  setRoundUpNumber: (st: number) => void
  roundUpNumber: number
}

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType)

export const useOnboarding = () => useContext(OnboardingContext)

const useProvideOnboarding = (): OnboardingType => {
  const [chosenPlugins, setChosenPlugins] = useState<UserPluginName[]>([])
  const [chosenPluginSteps, setChosenPluginSteps] = useState<UserPluginName[]>([])
  const [visitedOnboardingSteps, setVisitedOnboardingSteps] = useState<string[]>([])
  const [finishedPlugins, setFinishedPlugins] = useState<UserPluginName[]>([])

  // meditation goal
  const [selectedGoalTime, setSelectedGoalTime] = useState(1)
  const [selectedGoalNumber, setSelectedGoalNumber] = useState(1)
  const [selectedGoalPeriod, setSelectedGoalPeriod] = useState('weeks')
  const [meditateReminderNotification, setMeditateReminderNotification] = useState(false)

  // finance
  const [financeSaveReminderNotification, setFinanceSaveReminderNotification] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState('roundup')
  const [roundUpNumber, setRoundUpNumber] = useState(5)

  // elevator
  const [takeElevatorNotification, setTakeElevatorNotification] = useState(false)

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
