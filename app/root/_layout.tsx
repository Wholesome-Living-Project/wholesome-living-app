import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import PluginBanner from '../../src/components/discover/PluginBanner'
import LevelModal from '../../src/components/modals/LevelModal'
import LevelExplanationModal from '../../src/components/modals/LevelsExplanationModal'
import BackButton from '../../src/components/ui/BackButton'
import { PLUGINS } from '../../src/helpers/pluginList'
import { useUser } from '../../src/hooks/useUser'
import { COLORS } from '../../src/theme/theme'

// layout for customizing mobile navigation
export default function Layout() {
  const { user } = useUser()

  if (!user?.firebaseUID) {
    return <Redirect href={'(auth)/welcome'} />
  }

  return (
    <>
      <Stack
        initialRouteName={'index'}
        screenOptions={{
          headerLeft: ({ canGoBack }) => canGoBack && <BackButton color={COLORS.BLACK} />,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name={'index'}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'meditation'}
          options={{
            title: PLUGINS.meditation?.title,
            statusBarTranslucent: true,
            headerRight: () => <PluginBanner plugin={'meditation'} size={28} />,
          }}
        />
        <Stack.Screen
          name={'finance'}
          options={{
            title: PLUGINS.finance?.title,
            statusBarTranslucent: true,
            headerRight: () => <PluginBanner plugin={'finance'} size={28} />,
          }}
        />
        <Stack.Screen
          name={'finance-analytics'}
          options={{
            title: 'Invest',
            statusBarTranslucent: true,
            headerRight: () => <PluginBanner plugin={'finance'} size={28} />,
          }}
        />
        <Stack.Screen
          name={'settings'}
          options={{
            title: '',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name={'notifications'}
          options={{
            title: 'Notifications',
          }}
        />
      </Stack>

      <LevelModal />
      <LevelExplanationModal />
      <StatusBar style={'auto'} />
    </>
  )
}
