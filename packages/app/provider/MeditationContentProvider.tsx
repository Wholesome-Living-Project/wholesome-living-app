import { useUser } from 'app/hooks/useUser'
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
          meditationTime: meditationTime.toString(),
          endTime: new Date().toString(),
          userId: user?.id,
        })
      } catch (e) {
        console.log(e)
      }
    },
    [user?.id]
  )

  const getMeditations = useCallback(async () => {
    if (!user?.id) return
    const { data } = await api.meditationApi.meditationGetAllUserIDGet(user.id)
    setMeditations(data)
  }, [user?.id])

  useEffect(() => {
    getMeditations()
  }, [])

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
