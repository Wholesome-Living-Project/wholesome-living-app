import { COLORS } from 'app/theme/theme'
import { Stack, useSearchParams } from 'expo-router'
import React from 'react'
import BackButton from '../../../components/BackButton'

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
    </Stack>
  )
}
