import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'
import CoachExplanationModal from '../../src/components/modals/CoachExplanationModal'
import BackButton from '../../src/components/ui/BackButton'
import { useUser } from '../../src/hooks/useUser'
import { useOnboarding } from '../../src/provider/OnboardingProvider'
import { COLORS } from '../../src/theme/theme'

export default function Layout() {
  const { user } = useUser()
  const { chosenPlugins } = useOnboarding()

  if (!user?.firebaseUID) {
    return <Redirect href={'(auth)/welcome'} />
  } else if (chosenPlugins.length > 0) {
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
