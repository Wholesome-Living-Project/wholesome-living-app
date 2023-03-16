import { Stack } from 'expo-router'
import React from 'react'

// layout for customizing mobile navigation
export default function Root() {
  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
      <Stack.Screen name={'personal'} options={{ title: 'Personal Information' }} />
      <Stack.Screen name={'privacy'} options={{ title: 'Privacy' }} />
      <Stack.Screen name={'security'} options={{ title: 'Security' }} />
    </Stack>
  )
}
