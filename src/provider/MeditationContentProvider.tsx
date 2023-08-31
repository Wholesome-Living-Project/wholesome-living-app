import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MeditationMeditationDB } from '../../api/openapi'
import { api } from '../../api/requests'
import { getUnixTime } from '../helpers/getUnixTime'
import { useUser } from '../hooks/useUser'

type MeditationContentType = {
  timerDifference: number
  setTimerDifference: (st: number) => void
  saveMeditation: (meditationTime: number) => void
  getMeditations: () => Promise<void>
  meditations: MeditationMeditationDB[]
  resetMeditationData: () => void
}

const MeditateContext = createContext<MeditationContentType>({} as MeditationContentType)

export const useMeditate = () => useContext(MeditateContext)

const useProvideMeditate = (): MeditationContentType => {
  const [timerDifference, setTimerDifference] = useState(60)

  const [meditations, setMeditations] = useState<MeditationMeditationDB[]>(
    //@ts-ignore
    []
  )
  const { user } = useUser()

  const saveMeditation = useCallback(
    async (meditationTime: number) => {
      if (!user?.id) return

      try {
        await api.meditationApi.meditationPost(user.id, {
          meditationTime: meditationTime,
          endTime: getUnixTime(),
        })
      } catch (e) {
        console.log(e)
      }
    },
    [user?.id]
  )

  const resetMeditationData = useCallback(async () => {
    setMeditations([])
  }, [])

  const getMeditations = useCallback(async () => {
    if (!user?.id) return
    try {
      const { data } = await api.meditationApi.meditationGet()
      setMeditations(data)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  useEffect(() => {
    getMeditations()
  }, [getMeditations])

  return {
    timerDifference,
    setTimerDifference,
    saveMeditation,
    getMeditations,
    meditations,
    resetMeditationData,
  }
}

export const MeditationProvider = ({ children }: PropsWithChildren) => {
  const providedMeditateProps = useProvideMeditate()
  return (
    <>
      <MeditateContext.Provider value={providedMeditateProps}>{children}</MeditateContext.Provider>
    </>
  )
}
