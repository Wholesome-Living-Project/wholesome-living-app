import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MeditationGetMeditationResponse } from '../../api/openapi'
import { api } from '../../api/requests'
import { getUnixTime } from '../helpers/getUnixTime'
import { useUser } from '../hooks/useUser'

type MeditationContentType = {
  timerDifference: number
  setTimerDifference: (st: number) => void
  saveMeditation: (meditationTime: number) => void
  getMeditations: () => void
  meditations: MeditationGetMeditationResponse[]
}

const MeditateContext = createContext<MeditationContentType>({} as MeditationContentType)

export const useMeditate = () => useContext(MeditateContext)

const useProvideMeditate = (): MeditationContentType => {
  const [timerDifference, setTimerDifference] = useState(60)
  const [meditations, setMeditations] = useState<MeditationGetMeditationResponse[]>([])
  const { user } = useUser()

  const saveMeditation = useCallback(
    async (meditationTime: number) => {
      if (!user?.id) return

      try {
        await api.meditationApi.meditationPost({
          meditationTime: meditationTime,
          endTime: getUnixTime(),
        })
      } catch (e) {
        console.log(e)
      }
    },
    [user?.id]
  )

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

  return { timerDifference, setTimerDifference, saveMeditation, getMeditations, meditations }
}

export const MeditationProvider = ({ children }: PropsWithChildren) => {
  const providedMeditateProps = useProvideMeditate()
  return (
    <>
      <MeditateContext.Provider value={providedMeditateProps}>{children}</MeditateContext.Provider>
    </>
  )
}
