import { COLORS } from 'app/theme/theme'
import { Stack, useSearchParams } from 'expo-router'
import React from 'react'

// layout for customizing mobile navigation
export default function Layout() {
  const params = useSearchParams()

  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen
        name={'index'}
        options={{
          headerShown: false,

          title: '',
          headerStyle: { backgroundColor: COLORS.GREY },
        }}
      />
      <Stack.Screen name={'plugin'} options={{ title: params.name as string }} />
    </Stack>
  )
}
