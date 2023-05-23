import { useAuth } from 'app/hooks/useAuth'
import { useAuthentication, UserType } from 'app/provider/AuthenticationProvider'
import { User } from 'firebase/auth'
import { useMemo } from 'react'

export type FullUserType = { firebaseUser: User | null; user: UserType | null }
export const useUser: () => FullUserType = () => {
  const firebaseUser = useAuth()
  const { user } = useAuthentication()

  return useMemo(() => {
    return { firebaseUser: firebaseUser, user: user }
  }, [firebaseUser, user])
}
