import { Providers } from 'app/provider/ProvidersMobile'
import { Stack } from 'expo-router'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function Layout() {
  return (
    <Providers>
      <Stack initialRouteName={'root'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'(auth)/welcome'} />
        <Stack.Screen name={'root'} />
      </Stack>
    </Providers>
  )
}
