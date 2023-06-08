import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'
import BackButton from '../../src/components/ui/BackButton'
import { COLORS } from '../../src/theme/theme'

export default function Layout() {
  return (
    <>
      <Stack
        initialRouteName={'index'}
        screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
        <Stack.Screen name={'index'} />
        <Stack.Screen name={'choose-plugins'} />
        <Stack.Screen
          name={'chat'}
          options={{
            title: 'Coach',
            headerShown: true,
            headerLeft: ({ canGoBack }) => canGoBack && <BackButton color={COLORS.BLACK} />,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  )
}
