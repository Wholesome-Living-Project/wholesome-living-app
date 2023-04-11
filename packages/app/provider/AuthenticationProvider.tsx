import { signIn, signOut, signUp } from 'app/auth/auth'
import { useAuth } from 'app/hooks/useAuth'
import { useEffectOnce } from 'app/hooks/useEffectOnce'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { UserUpdateUserRequest, UserUserDB } from '../../api/openapi'
import { api } from '../../api/requests'

export type UserType = { firebaseUID: string } & UserUserDB
type AuthenticationType = {
  user: UserType | null
  loading: boolean
  getUser: () => void
  patchUser: (request: UserUpdateUserRequest) => Promise<UserType | undefined>
  signOutUser: () => void
  signInWithEmailAndPassword: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => Promise<UserType | undefined>
  createUserWithEmailAndPassword: ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
  }: {
    email: string
    password: string
    firstName: string
    lastName: string
    dateOfBirth: string
  }) => Promise<UserType | undefined>
}

const AuthContext = createContext<AuthenticationType>({} as AuthenticationType)

export const useAuthentication = () => useContext(AuthContext)

const useProvideAuth = (): AuthenticationType => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const firebaseUser = useAuth()

  const getUser = useCallback(async () => {
    if (firebaseUser?.uid) {
      const { data } = await api.userApi.usersIdGet(firebaseUser.uid)
      console.log('got user ', data.email)

      const u: UserType = {
        ...data,
        firebaseUID: firebaseUser.uid ?? null,
      }
      setUser(u)

      return u
    } else {
      console.log('firebase user not available? : ', firebaseUser?.uid)
    }
  }, [firebaseUser, setUser])

  const patchUser = useCallback(
    async (request: UserUpdateUserRequest) => {
      await api.userApi.usersPut(request)
      return getUser()
    },
    [getUser]
  )

  const createUserWithEmailAndPassword = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    }: {
      email: string
      password: string
      firstName: string
      lastName: string
      dateOfBirth: string
    }) => {
      const creds = await signUp(email, password)
      console.log('signed up and have new firebase user: ' + creds)

      await api.userApi.usersPost({
        firstName,
        email,
        lastName,
        dateOfBirth,
        id: firebaseUser?.uid,
      })

      return getUser()
    },
    [getUser]
  )

  const signOutUser = useCallback(async () => {
    try {
      await signOut()
    } catch (e) {
      /* do nothing as user is probably not logged in */
    } finally {
      setUser(null)
    }
  }, [])

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      await signIn(email, password)
      return getUser()
    },
    [getUser]
  )

  const getInitialUser = useCallback(async () => {
    // if user has not been initialized yet (via firebase) we do not create it on app start
    if (!firebaseUser?.uid) return

    try {
      setLoading(true)
      await getUser()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [setLoading, getUser])

  useEffectOnce(() => {
    getInitialUser()
  })

  return {
    user,
    loading,
    getUser,
    patchUser,
    signOutUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  }
}

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const providedAuth = useProvideAuth()
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>
}
