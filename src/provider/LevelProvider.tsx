import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'

type LevelContentType = {}

const LevelContext = createContext<LevelContentType>({} as LevelContentType)

export const useLevels = () => useContext(LevelContext)

type ExperienceMapType = { experience: {} }

const useProvideLevels = (): LevelContentType => {
  const [experienceMap, setExperienceMap] = useState([])
  const { user } = useUser()
  const getLevels = useCallback(async () => {
    try {
      if (!user?.id) return
      console.log(user?.id)
      const { data } = await api.levelApi.progressGet(user?.id)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  useEffect(() => {
    getLevels()
  }, [getLevels])

  return {}
}

export const LevelProvider = ({ children }: PropsWithChildren) => {
  const providedLevelProps = useProvideLevels()
  return (
    <>
      <LevelContext.Provider value={providedLevelProps}>{children}</LevelContext.Provider>
    </>
  )
}
