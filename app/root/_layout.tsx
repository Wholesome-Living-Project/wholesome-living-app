import { Stack, useSearchParams } from 'expo-router'
import React from 'react'
import BackButton from '../../src/components/ui/BackButton'
import { COLORS } from '../../src/theme/theme'

// layout for customizing mobile navigation
export default function Layout() {
  const params = useSearchParams()

  return (
    <Stack
      initialRouteName={'index'}
      screenOptions={{
        headerLeft: ({ canGoBack }) => canGoBack && <BackButton color={COLORS.WHITE} />,
      }}>
      <Stack.Screen
        name={'index'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'meditation'}
        options={{
          title: '',
          headerTransparent: true,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name={'finance'}
        options={{
          title: '',
          headerTransparent: true,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name={'finance-analytics'}
        options={{
          title: '',
          headerTransparent: true,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name={'settings'}
        options={{
          title: '',
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
