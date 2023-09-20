import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'
import CoachExplanationModal from '../../src/components/modals/CoachExplanationModal'
import BackButton from '../../src/components/ui/BackButton'
import { useUser } from '../../src/hooks/useUser'
import { COLORS } from '../../src/theme/theme'

export default function Layout() {
  const { user } = useUser()

  if (!user?.firebaseUID) {
    return <Redirect href={'(auth)/welcome'} />
  } else if (user.onboardingDone) {
    return <Redirect href={'root'} />
  }

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
            gestureEnabled: false,
            title: 'Coach',
            headerShown: true,
            headerLeft: ({ canGoBack }) => canGoBack && <BackButton color={COLORS.BLACK} />,
          }}
        />
      </Stack>
      <CoachExplanationModal />
      <StatusBar style="auto" />
    </>
  )
}
