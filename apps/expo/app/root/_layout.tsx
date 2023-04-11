import { Ionicons } from '@expo/vector-icons'
import { COLORS } from 'app/theme/theme'
import { IonIconType } from 'app/types/IonIcon'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { Fragment } from 'react'

export default function Layout() {
  return (
    <Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.TAB_BAR,
            height: 100,
            paddingTop: 10,
            paddingBottom: 45,
          },
          tabBarIconStyle: { alignSelf: 'center' },
          tabBarInactiveTintColor: COLORS.TAB_BAR_ICONS,
          tabBarActiveTintColor: COLORS.TAB_BAR_ICONS,
        }}
        initialRouteName={'(dashboard)'}>
        <Tabs.Screen
          name={'(dashboard)'}
          options={{
            title: 'Dashboard',

            tabBarIcon({ color, size, focused }) {
              return (
                <TabBarIcon
                  icon={'home-outline'}
                  focused_icon={'home'}
                  focused={focused}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
        <Tabs.Screen
          name={'(discover)'}
          options={{
            title: 'Discover',
            headerShown: false,
            tabBarIcon({ color, size, focused }) {
              return (
                <TabBarIcon
                  icon={'eye-outline'}
                  focused_icon={'eye'}
                  focused={focused}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
        <Tabs.Screen
          name={'settings'}
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon({ color, size, focused }) {
              return (
                <TabBarIcon
                  icon={'settings-outline'}
                  focused_icon={'settings'}
                  focused={focused}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
      </Tabs>

      <StatusBar style={'auto'} />
    </Fragment>
  )
}

const TabBarIcon = ({
  focused,
  size,
  color,
  focused_icon,
  icon,
}: {
  color: string
  size: number
  focused: boolean
  focused_icon: IonIconType
  icon: IonIconType
}) => {
  return <Ionicons name={focused ? focused_icon : icon} size={size} color={color} />
}
