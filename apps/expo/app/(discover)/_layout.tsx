import { Stack, useSearchParams } from 'expo-router'
import React from 'react'

// layout for customizing mobile navigation
export default function Layout() {
  const params = useSearchParams()
  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
      <Stack.Screen name={'plugin/[name]'} options={{ title: params.name as string }} />
    </Stack>
  )
}
