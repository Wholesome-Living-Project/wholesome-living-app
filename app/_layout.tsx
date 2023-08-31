import { Stack } from 'expo-router'
import React from 'react'
import 'react-native-url-polyfill/auto'
import TimePickerModal from '../src/components/dashboard/plugins/TimePickerModal'
import { Providers } from '../src/provider/Providers'

export default function Layout() {
  return (
    <Providers>
      <Stack
        initialRouteName={'(onboarding)'}
        screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
        <Stack.Screen name={'(auth)/welcome'} options={{ gestureEnabled: false }} />
        <Stack.Screen name={'(onboarding)'} options={{ gestureEnabled: false }} />
        <Stack.Screen name={'root'} options={{ gestureEnabled: false }} />
      </Stack>
      <TimePickerModal title={'Until what time do you want to mediate?'} />
    </Providers>
  )
}
