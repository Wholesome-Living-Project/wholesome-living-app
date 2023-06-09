import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MeditationGetMeditationResponse, SettingsPluginName } from '../../api/openapi'
import { api } from '../../api/requests'
import { getUnixTime } from '../helpers/getUnixTime'
import { useUser } from '../hooks/useUser'
import { useOnboarding } from './OnboardingProvider'

type MeditationContentType = {
  timerDifference: number
  setTimerDifference: (st: number) => void
  saveMeditation: (meditationTime: number) => void
  getMeditations: () => void
  meditations: MeditationGetMeditationResponse
}

const MeditateContext = createContext<MeditationContentType>({} as MeditationContentType)

export const useMeditate = () => useContext(MeditateContext)

const useProvideMeditate = (): MeditationContentType => {
  const [timerDifference, setTimerDifference] = useState(60)
  const { setChosenPlugins, chosenPlugins, setUserPlugins } = useOnboarding()

  const [meditations, setMeditations] = useState<MeditationGetMeditationResponse>(
    //@ts-ignore
    []
  )
  const { user } = useUser()

  const addPlugin = useCallback(
    async (plugin: SettingsPluginName) => {
      setChosenPlugins([...chosenPlugins, plugin])
      await setUserPlugins()
    },
    [chosenPlugins, setChosenPlugins, setUserPlugins]
  )

  const saveMeditation = useCallback(
    async (meditationTime: number) => {
      if (!user?.id) return

      // add meditation plugin if not already added
      if (!chosenPlugins.includes(SettingsPluginName.PluginNameMeditation))
        addPlugin(SettingsPluginName.PluginNameMeditation)

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
