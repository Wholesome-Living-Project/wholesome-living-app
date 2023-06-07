import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import Discover from '../../components/dashboard/Discover'
import Forest from '../../components/dashboard/Forest'
import PluginCards from '../../components/dashboard/PluginCards'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS } from '../../theme/theme'

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
          backgroundColor: COLORS.WHITE,
        }}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}>
        <Forest />
        <Spacer x={2} />
        <PluginCards />
        <Spacer x={2} />
        <Discover />
        <Spacer x={25} />
      </ScrollView>
    </View>
  )
}
