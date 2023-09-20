import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { UserUpdateUserRequest, UserUserDB } from '../../api/openapi'
import { api } from '../../api/requests'
import { deleteUserAccount, signIn, signOut, signUp } from '../auth/auth'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from './NotificationProvider'

export type UserType = { firebaseUID: string } & UserUserDB
type AuthenticationType = {
  user: UserType | null
  loading: boolean
  getUser: () => Promise<UserType | undefined>
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
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthenticationType>({} as AuthenticationType)

export const useAuthentication = () => useContext(AuthContext)

const useProvideAuth = (): AuthenticationType => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const currentFirebaseUser = useAuth()
  const { expoPushToken } = useNotifications()

  const getUser = useCallback(
    async (uid?: string) => {
      if (uid || currentFirebaseUser?.uid) {
        const id = uid ?? currentFirebaseUser?.uid
        if (id) {
          try {
            const { data } = await api.userApi.usersIdGet(id)
            console.log('got user ', data.email)

            const u: UserType = {
              ...data,
              firebaseUID: id,
            }
            setUser(u)

            return u
          } catch (e) {
            console.log('error getting user', e)
          }
        }
      } else {
        console.log('firebase user not available? : ', uid)
      }
    },
    [currentFirebaseUser?.uid]
  )

  const patchUser = useCallback(
    async (request: UserUpdateUserRequest) => {
      try {
        await api.userApi.usersPut(request)

        return await getUser(currentFirebaseUser?.uid)
      } catch (e) {
        console.log('error patching user', e)
      }
    },
    [currentFirebaseUser?.uid, getUser]
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

      try {
        if (creds.data) {
          await api.userApi.usersPost({
            firstName,
            email,
            lastName,
            dateOfBirth,
            id: creds.data.user.uid,
            expoPushToken,
          })
          if (creds.data?.user.uid) {
            await AsyncStorage.setItem('userData', creds.data.user.uid)
          }
        } else if (creds.message === 'Firebase: Error (auth/email-already-in-use).') {
          console.log('email already in use.')
          const existing = await signIn(email, password)

          if (existing?.user.uid) {
            console.log('trying to create user with existing firebase user')
            await api.userApi.usersPost({
              firstName,
              email,
              lastName,
              dateOfBirth,
              id: existing.user.uid,
            })

            await AsyncStorage.setItem('userData', existing?.user.uid)
          }
        }
      } catch (e) {
        console.log(e)
      }

      return getUser(creds.data?.user.uid)
    },
    [expoPushToken, getUser]
  )

  const signOutUser = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userData')
      await signOut()
      setUser(null)
    } catch (e) {
      /* do nothing as user is probably not logged in */
    } finally {
      setUser(null)
      await AsyncStorage.removeItem('userData')
    }
  }, [])

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const fbUser = await signIn(email, password)
      if (fbUser?.user.uid) await AsyncStorage.setItem('userData', fbUser?.user.uid)

      return getUser(fbUser?.user.uid)
    },
    [getUser]
  )

  const getInitialUser = useCallback(async () => {
    const id = await AsyncStorage.getItem('userData')
    // if user has not been initialized yet (via firebase) we do not create it on app start
    if (!id) return

    try {
      setLoading(true)
      await getUser(id)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [getUser])

  const deleteAccount = useCallback(async () => {
    try {
      await api.userApi.usersPut({
        firstName: `anonymous`,
        email: `anonymous@${user?.id}.com`,
        lastName: 'anonymous',
        dateOfBirth: '2000-01-01',
      })
      await AsyncStorage.removeItem('userData')
      await deleteUserAccount()
      await signOutUser()
      Alert.alert('User successfully deleted')
    } catch (e) {
      console.log(e)
    } finally {
      await AsyncStorage.removeItem('userData')
    }
  }, [signOutUser, user?.id])

  useEffect(() => {
    getInitialUser()
  }, [getInitialUser])

  return {
    user,
    loading,
    getUser,
    patchUser,
    signOutUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    deleteAccount,
  }
}

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const providedAuth = useProvideAuth()
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>
}
