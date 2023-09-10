import { useRootNavigationState, useRouter, useSegments } from 'expo-router'
import React, { PropsWithChildren } from 'react'
import { FullUserType, useUser } from '../hooks/useUser'
import { useOnboarding } from './OnboardingProvider'

const useProtectedRoute = (user: FullUserType) => {
  const segments = useSegments()
  const router = useRouter()
  const { chosenPlugins, loading } = useOnboarding()
  const rootNavigationState = useRootNavigationState()

  /*
  useEffect(() => {
    if (loading || !rootNavigationState?.key) return
    const inAuthGroup = segments[0] === '(auth)'

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user.user?.firebaseUID &&
      !inAuthGroup &&
      !getIsSignedIn()
    ) {
      // Redirect to the sign-in page.
      router.replace('/welcome')
    } else if (user.user?.firebaseUID && inAuthGroup) {
      // Redirect away from the sign-in page.
      chosenPlugins.length > 0 ? router.replace('/root') : router.replace('/(onboarding)')
    }
  }, [user.user?.firebaseUID, segments, router, chosenPlugins, loading, rootNavigationState])
*/
}

const SafeScreenProvider = ({ children }: PropsWithChildren) => {
  const user = useUser()

  useProtectedRoute(user)

  return <>{children}</>
}

export default SafeScreenProvider
