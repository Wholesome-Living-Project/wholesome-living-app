import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function Layout() {
  return (
    <>
      <Stack initialRouteName={'index'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'index'} />
      </Stack>
      <StatusBar style="dark" />
    </>
  )
}
