import { User } from 'firebase/auth'
import { useMemo } from 'react'
import { useAuthentication, UserType } from '../provider/AuthenticationProvider'
import { useAuth } from './useAuth'

export type FullUserType = { firebaseUser: User | null; user: UserType | null }
export const useUser: () => FullUserType = () => {
  const firebaseUser = useAuth()
  const { user } = useAuthentication()

  return useMemo(() => {
    return { firebaseUser: firebaseUser, user: user }
  }, [firebaseUser, user])
}
