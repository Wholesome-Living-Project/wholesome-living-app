import { FullUserType, useUser } from 'app/hooks/useUser'
import { useRouter, useSegments } from 'expo-router'
import React, { PropsWithChildren, useEffect } from 'react'

const useProtectedRoute = (user: FullUserType) => {
  const segments = useSegments()
  const router = useRouter()

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
      router.replace('/(onboarding)')
    }
  }, [user.user?.firebaseUID, segments, router])
}

const SafeScreenProvider = ({ children }: PropsWithChildren) => {
  const user = useUser()

  useProtectedRoute(user)

  return <>{children}</>
}

export default SafeScreenProvider
