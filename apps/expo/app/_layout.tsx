import TimePickerModal from 'app/components/dashboard/plugins/TimePickerModal'
import { Providers } from 'app/provider/ProvidersMobile'
import { Stack } from 'expo-router'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function Layout() {
  return (
    <Providers>
      <Stack initialRouteName={'(onboarding)'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'(auth)/welcome'} />
        <Stack.Screen name={'(onboarding)'} />
        <Stack.Screen name={'root'} />
      </Stack>
      <TimePickerModal title={'Until what time do you want to mediate?'} />
    </Providers>
  )
}
