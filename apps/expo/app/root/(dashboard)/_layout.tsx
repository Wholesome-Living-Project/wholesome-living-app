import { COLORS, SCREEN_PADDING } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import { Stack, useSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import BackButton from '../../../components/BackButton'

const HomeHeaderTitle = styled(View)`
  padding-left: ${SCREEN_PADDING}px;
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
      <Stack.Screen
        name={'index'}
        options={{
          headerLeft: () => (
            <HomeHeaderTitle>
              <Heading3>Dashboard</Heading3>
            </HomeHeaderTitle>
          ),
          title: '',
          headerStyle: {
            borderBottomColor: COLORS.PRIMARY,
            backgroundColor: COLORS.GREY,
            height: 130,
          },
        }}
      />
      <Stack.Screen name={'plugin'} options={{ title: params.name as string }} />
    </Stack>
  )
}
