import { COLORS } from 'app/theme/theme'
import { Stack, useSearchParams } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import BackButton from '../../../components/BackButton'

const BackButtonContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

// layout for customizing mobile navigation
export default function Layout() {
  const params = useSearchParams()

  return (
    <Stack
      initialRouteName={'index'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.HEADER },
        headerTitleStyle: { color: COLORS.PRIMARY },
        headerLeft: ({ canGoBack }) => canGoBack && <BackButton />,
      }}>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
    </Stack>
  )
}
