import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ElevatorCreateElevatorRequest, ElevatorElevatorDB } from '../../api/openapi'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'

type ElevatorContentType = {
  saveElevatorSession: (elevatorSession: ElevatorCreateElevatorRequest) => Promise<void>
  getElevatorSessions: () => Promise<void>
  elevatorSessions: ElevatorElevatorDB[]
  dailyStairs: { [key: string]: number }
  totalStairs: number
  totalElevation: number
  walkedElevation: number
  resetElevatorData: () => void
}

const ElevatorContext = createContext<ElevatorContentType>({} as ElevatorContentType)

export const useElevator = () => useContext(ElevatorContext)

const useProvideElevator = (): ElevatorContentType => {
  const [elevatorSessions, setElevatorSessions] = useState<ElevatorElevatorDB[]>(
    //@ts-ignore
    []
  )
  const { user } = useUser()

  const saveElevatorSession = useCallback(
    async (elevatorSession: ElevatorCreateElevatorRequest) => {
      if (!user?.id) return
      try {
        await api.elevatorApi.elevatorPost(user.id, {
          amountStairs: elevatorSession.amountStairs,
          stairs: elevatorSession.stairs,
          heightGain: elevatorSession.heightGain,
        })
      } catch (e) {
        console.log(e)
      }
    },
    [user?.id]
  )

  const getElevatorSessions = useCallback(async () => {
    if (!user?.id) return
    try {
      const { data } = await api.elevatorApi.elevatorGet(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        user.id,
        undefined
      )
      setElevatorSessions(data)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const resetElevatorData = useCallback(async () => {
    setElevatorSessions([])
  }, [])

  useEffect(() => {
    getElevatorSessions()
  }, [getElevatorSessions])

  const dailyStairs = useMemo(() => {
    if (elevatorSessions.length < 1) return {}
    let daily = {}
    // @ts-ignore
    elevatorSessions.forEach((session) => {
      if (!session.time) return
      const date = new Date(session.time * 1000).toLocaleDateString()
      if (daily.hasOwnProperty(date)) {
        daily[date] += session.amountStairs
      } else {
        daily[date] = session.amountStairs
      }
    })
    return daily
  }, [elevatorSessions])

  const totalStairs = useMemo(() => {
    if (elevatorSessions.length < 1) return 0
    let total = 0
    elevatorSessions.forEach((session) => {
      if (!session.amountStairs) return
      total += session.amountStairs
    })
    return total
  }, [elevatorSessions])

  const totalElevation = useMemo(() => {
    if (elevatorSessions.length < 1) return 0
    let total = 0
    elevatorSessions.forEach((session) => {
      if (!session.heightGain) return
      total += session.heightGain
    })
    return total
  }, [elevatorSessions])

  const walkedElevation = useMemo(() => {
    if (elevatorSessions.length < 1) return 0
    let total = 0
    elevatorSessions.forEach((session) => {
      if (!session.heightGain) return
      total += session.stairs ? session.heightGain : 0
    })
    return total
  }, [elevatorSessions])

  return {
    saveElevatorSession,
    getElevatorSessions,
    elevatorSessions,
    dailyStairs,
    totalStairs,
    totalElevation,
    walkedElevation,
    resetElevatorData,
  }
}

export const ElevatorProvider = ({ children }: PropsWithChildren) => {
  const providedElevatorProps = useProvideElevator()
  return (
    <>
      <ElevatorContext.Provider value={providedElevatorProps}>{children}</ElevatorContext.Provider>
    </>
  )
}
