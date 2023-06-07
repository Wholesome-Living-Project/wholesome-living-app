import React from 'react'
import { ScrollView, View } from 'react-native'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import Discover from '../../components/dashboard/Discover'
import Forest from '../../components/dashboard/Forest'
import PluginCards from '../../components/dashboard/PluginCards'
import WelcomeHeader from '../../components/dashboard/WelcomeHeader'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS } from '../../theme/theme'

export function DashboardScreen() {
  const { windowHeight } = useWindowDimensions()

  return (
    <View>
      <DashboardHeader />
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{
          height: windowHeight,
          backgroundColor: COLORS.WHITE,
        }}
        scrollEventThrottle={16}>
        <Spacer x={2} />
        <WelcomeHeader />
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
