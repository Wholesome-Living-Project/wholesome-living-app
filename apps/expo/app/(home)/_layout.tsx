import { useAuth } from 'app/hooks/useAuth'
import { Stack } from 'expo-router'
import React from 'react'

// layout for customizing mobile navigation
export default function Layout() {
  const user = useAuth()
  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen name={'index'} options={{ title: 'Dashboard' }} />
      <Stack.Screen name={'user/[id]'} options={{ title: 'User' }} />
    </Stack>
  )
}
