import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { createContext, useContext, useMemo, useState } from 'react'
import 'react-native-url-polyfill/auto'
import TimePickerModal from '../src/components/dashboard/plugins/TimePickerModal'
import { CustomSplash } from '../src/components/ui/CustomSplash'
import { useTimeout } from '../src/hooks/useTimeout'
import { useUser } from '../src/hooks/useUser'
import { useAuthentication } from '../src/provider/AuthenticationProvider'
import { Providers } from '../src/provider/Providers'

const APP_MIN_LOADING_TIME_IN_MS = 2000

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const SplashContext = createContext(true)
export const useSplashShowing = () => useContext(SplashContext)

export default function Layout() {
  const user = useUser()
  const { loading } = useAuthentication()

  const [minLoadingTime, setMinLoadingTime] = useState(true)
  const { loading: loadingUser } = useAuthentication()

  const showSplash = useMemo(() => {
    return loadingUser || loading || minLoadingTime
  }, [loading, loadingUser, minLoadingTime])

  useTimeout(() => setMinLoadingTime(false), APP_MIN_LOADING_TIME_IN_MS)

  return (
    <Providers>
      <SplashContext.Provider value={showSplash}>
        {showSplash && <CustomSplash />}
        <Stack
          initialRouteName={'(onboarding)'}
          screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
          <Stack.Screen name={'(auth)/welcome'} options={{ gestureEnabled: false }} />
          <Stack.Screen name={'(onboarding)'} options={{ gestureEnabled: false }} />
          <Stack.Screen name={'root'} options={{ gestureEnabled: false }} />
        </Stack>
        <TimePickerModal title={'Until what time do you want to mediate?'} />
      </SplashContext.Provider>
    </Providers>
  )
}
