import { useAuth } from 'app/hooks/useAuth'
import { COLORS } from 'app/theme/theme'
import { Stack } from 'expo-router'
import React from 'react'
import BackButton from '../../components/BackButton'

// layout for customizing mobile navigation
export default function Layout() {
  const user = useAuth()
  return (
    <Stack
      initialRouteName={'index'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.SECONDARY },
        headerTitleStyle: { color: COLORS.PRIMARY },
        headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
      }}>
      <Stack.Screen name={'index'} options={{ title: 'Dashboard', headerShown: false }} />
    </Stack>
  )
}
