import { Ionicons } from '@expo/vector-icons'
import { useAuth } from 'app/hooks/useAuth'
import { Stack, Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { Fragment } from 'react'

export default function Layout() {
  const user = useAuth()

  if (!user?.email)
    return (
      <Fragment>
        <Stack initialRouteName={'index'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'index'} />
        </Stack>
        <StatusBar style="dark" />
      </Fragment>
    )

  return (
    <Fragment>
      <Tabs initialRouteName={'(home)'} screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name={'(home)'}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon({ color, size, focused }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            },
          }}
        />
        <Tabs.Screen
          name={'(discover)'}
          options={{
            title: 'Plugins',
            tabBarIcon({ color, size, focused }) {
              return <Ionicons name={focused ? 'eye' : 'eye-outline'} size={size} color={color} />
            },
          }}
        />
        <Tabs.Screen
          name={'settings'}
          options={{
            title: 'Settings',
            tabBarIcon({ color, size, focused }) {
              return (
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />

        <Tabs.Screen
          name={'index'}
          options={{
            href: null,
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </Fragment>
  )
}
