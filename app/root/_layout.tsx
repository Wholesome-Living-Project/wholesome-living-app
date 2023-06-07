import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import PluginBanner from '../../src/components/discover/PluginBanner'
import LevelModal from '../../src/components/modals/LevelModal'
import BackButton from '../../src/components/ui/BackButton'
import { PLUGINS } from '../../src/helpers/pluginList'
import { COLORS } from '../../src/theme/theme'

// layout for customizing mobile navigation
export default function Layout() {
  return (
    <>
      <Stack
        initialRouteName={'index'}
        screenOptions={{
          headerLeft: ({ canGoBack }) => canGoBack && <BackButton color={COLORS.BLACK} />,
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
            title: PLUGINS.finance?.title,
            statusBarTranslucent: true,
            headerRight: () => <PluginBanner plugin={'finance'} size={28} />,
          }}
        />
        <Stack.Screen
          name={'finance-analytics'}
          options={{
            title: 'Invest',

            headerRight: () => <PluginBanner plugin={'finance'} size={28} />,
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

      <LevelModal />
      <StatusBar style={'dark'} />
    </>
  )
}
