import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSplashShowing } from '../../../app/_layout'
import AcademyBanner from '../../components/dashboard/AcademyBanner'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DataPopulator from '../../components/dashboard/DataPopulator'
import Discover from '../../components/dashboard/Discover'
import Forest from '../../components/dashboard/Forest'
import LoadingOverlayContainer from '../../components/dashboard/LoadingOverlayContainer'
import PluginCards from '../../components/dashboard/PluginCards'
import WelcomeHeader from '../../components/dashboard/WelcomeHeader'
import { levelExplanationModalRef } from '../../components/refs/modal-refs'
import Button from '../../components/ui/Button'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { useFinance } from '../../provider/FinanceContentProvider'
import { useLevels } from '../../provider/LevelProvider'
import { useMeditate } from '../../provider/MeditationContentProvider'
import { schedulePushNotification } from '../../provider/NotificationProvider'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS } from '../../theme/theme'

export function DashboardScreen() {
  const { windowHeight } = useWindowDimensions()
  const { experienceMap, levelMap, getLevels } = useLevels()
  const { closedLevelExplanation } = useOnboarding()
  const [refreshing, setRefreshing] = useState(false)
  // this means the app is loading data in the bg
  const splashShowing = useSplashShowing()

  const { getSpendings } = useFinance()
  const { getMeditations } = useMeditate()
  const { getUser } = useAuthentication()

  useEffect(() => {
    if (!levelMap && !experienceMap && !closedLevelExplanation && !splashShowing) {
      setTimeout(() => levelExplanationModalRef.current?.expand(), 1000)
    }
  }, [closedLevelExplanation, experienceMap, levelMap, splashShowing])

  const refresh = useCallback(async () => {
    await getSpendings()
    await getMeditations()
    await getUser()
    await getLevels()
  }, [getLevels, getMeditations, getSpendings, getUser])

  const refreshAndLoad = useCallback(async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }, [refresh])

  useEffect(() => {
    refresh()
  }, [getLevels, refresh])

  return (
    <LoadingOverlayContainer>
      <View>
        <DashboardHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          refreshControl={<RefreshControl onRefresh={refreshAndLoad} refreshing={refreshing} />}
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
          <DataPopulator />
          <Spacer x={2} />
          <Button onPress={() => schedulePushNotification()}>Send notification</Button>
          <Spacer x={22} />
        </ScrollView>
      </View>
    </LoadingOverlayContainer>
  )
}
