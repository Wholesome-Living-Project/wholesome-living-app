import { useRouter, useSegments } from 'expo-router'
import React, { PropsWithChildren, useEffect } from 'react'
import { FullUserType, useUser } from '../hooks/useUser'
import { useOnboarding } from './OnboardingProvider'

const useProtectedRoute = (user: FullUserType) => {
  const segments = useSegments()
  const router = useRouter()
  const { chosenPlugins } = useOnboarding()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    console.log(segments)

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user.user?.firebaseUID &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/welcome')
    } else if (user.user?.firebaseUID && inAuthGroup) {
      // Redirect away from the sign-in page.
      chosenPlugins ? router.replace('root') : router.replace('/(onboarding)')
    }
  }, [user.user?.firebaseUID, segments, router, chosenPlugins])
}

const SafeScreenProvider = ({ children }: PropsWithChildren) => {
  const user = useUser()

  useProtectedRoute(user)

  return <>{children}</>
}

export default SafeScreenProvider
