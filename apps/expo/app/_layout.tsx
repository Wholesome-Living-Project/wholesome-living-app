import { useAuth } from 'app/hooks/useAuth'
import { Stack, useRootNavigation } from 'expo-router'
import React, { Fragment, useEffect, useMemo } from 'react'

export default function Layout() {
  const user = useAuth()
  const navigation = useRootNavigation()

  const userLoggedIn = useMemo(() => Boolean(user), [user])

  useEffect(() => {
    if (userLoggedIn) {
      navigation?.navigate('root' as never)
    } else {
      navigation?.navigate('welcome' as never)
    }
  }, [userLoggedIn])

  return (
    <Fragment>
      <Stack initialRouteName={'root'} screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name={'welcome'} />
        <Stack.Screen name={'root'} />
      </Stack>
    </Fragment>
  )
}
