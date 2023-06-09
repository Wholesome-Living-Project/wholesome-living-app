import { Stack } from 'expo-router'
import React from 'react'
import BackButton from '../../../src/components/ui/BackButton'
import { COLORS } from '../../../src/theme/theme'

// layout for customizing mobile navigation
export default function Layout() {
  return (
    <Stack
      initialRouteName={'index'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.SECONDARY },
        headerTitleStyle: { color: COLORS.PRIMARY },
        headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
      <Stack.Screen
        name={'personal'}
        options={{ title: 'Personal Information', headerShown: false }}
      />
      <Stack.Screen name={'privacy'} options={{ title: 'Privacy', headerShown: false }} />
      <Stack.Screen name={'security'} options={{ title: 'Security', headerShown: false }} />
      <Stack.Screen name={'academy'} options={{ title: 'Academy', headerShown: false }} />
    </Stack>
  )
}
