import DashboardHeader from 'app/components/dashboard/DashboardHeader'
import Discover from 'app/components/dashboard/Discover'
import Forest from 'app/components/dashboard/Forest'
import PluginCards from 'app/components/dashboard/PluginCards'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { SPACING } from 'app/theme/theme'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components'

const AppTitleContainer = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 2}px;
`

const SectionTitleContainer = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 2}px;
`

export function DashboardScreen() {
  const { windowHeight } = useWindowDimensions()
  const [scrollY, setScrollY] = useState(0)

  return (
    <View>
      <DashboardHeader showFull={scrollY < 20} />
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{
          height: windowHeight,
        }}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}>
        <Forest />
        <PluginCards />
        <Discover />
        <PluginCards />

        <Spacer x={25} />
      </ScrollView>
    </View>
  )
}
