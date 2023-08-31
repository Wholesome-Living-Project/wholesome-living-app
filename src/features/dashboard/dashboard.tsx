import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import AcademyBanner from '../../components/dashboard/AcademyBanner'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import Discover from '../../components/dashboard/Discover'
import Forest from '../../components/dashboard/Forest'
import PluginCards from '../../components/dashboard/PluginCards'
import WelcomeHeader from '../../components/dashboard/WelcomeHeader'
import { levelExplanationModalRef } from '../../components/refs/modal-refs'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useLevels } from '../../provider/LevelProvider'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS } from '../../theme/theme'
import DataPopulator from "../../components/dashboard/DataPopulator";

export function DashboardScreen() {
  const { windowHeight } = useWindowDimensions()
  const { experienceMap, levelMap, getLevels } = useLevels()
  const { closedLevelExplanation } = useOnboarding()

  useEffect(() => {
    if (!levelMap && !experienceMap && !closedLevelExplanation) {
      setTimeout(() => levelExplanationModalRef.current?.expand(), 1000)
    }
  }, [closedLevelExplanation, experienceMap, levelMap])

  useEffect(() => {
    getLevels()
  }, [getLevels])

  return (
    <View>
      <DashboardHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        style={{
          height: windowHeight,
          backgroundColor: COLORS.WHITE,
        }}
        scrollEventThrottle={16}>
        <Spacer x={3} />
        <WelcomeHeader />
        <Forest />
        <Spacer x={3} />
        <PluginCards />
        <Discover />
        <Spacer x={3} />
        <AcademyBanner />
        <DataPopulator/>
        <Spacer x={22} />
      </ScrollView>
    </View>
  )
}
