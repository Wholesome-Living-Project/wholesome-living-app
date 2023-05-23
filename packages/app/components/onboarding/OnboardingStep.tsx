import OnboardingStepHeader from 'app/components/onboarding/OnboardingStepHeader'
import Button from 'app/components/ui/Button'
import { Flex } from 'app/components/ui/Flex'
import { PLUGINS, plugins } from 'app/helpers/pluginList'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { SPACING } from 'app/theme/theme'
import React, { PropsWithChildren, useMemo } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  padding: ${SPACING * 2}px;
`

const Footer = styled(Flex)`
  padding: ${SPACING * 10}px 0;
`

type Props = {
  onPressPrimary?: () => void
  onPressSecondary?: () => void
  primaryText: string
  secondaryText?: string
  infoText?: string
  primaryDisabled?: boolean
  plugin?: plugins
  secondaryDisabled?: boolean
} & PropsWithChildren

const OnboardingStep = ({
  onPressPrimary,
  onPressSecondary,
  primaryText,
  secondaryText,
  infoText,
  secondaryDisabled,
  primaryDisabled,
  plugin,
  children,
}: Props) => {
  const { windowHeight } = useWindowDimensions()
  const { finishedOnboardingSteps, chosenPlugins, finishedPlugins, setFinishedOnboardingSteps } =
    useOnboarding()

  const navigation = useNavigation()

  const nextStep: string | undefined = useMemo(() => {
    const firstChosen = chosenPlugins[0]
    if (finishedPlugins.length === 0 && finishedOnboardingSteps.length === 0 && firstChosen)
      return PLUGINS[firstChosen].route + '/' + PLUGINS[firstChosen].onboardingSubRoutes?.[0]
    if (!plugin) return

    const steps = PLUGINS[plugin].onboardingSubRoutes
    const route = PLUGINS[plugin].route

    const nextStepForCurrentPlugin = steps?.find((step) => !finishedOnboardingSteps.includes(step))

    if (nextStepForCurrentPlugin) return nextStepForCurrentPlugin

    const nextPlugin = Object.values(chosenPlugins).find(
      (plugin) => !finishedPlugins.includes(plugin)
    )

    if (!nextPlugin) return

    return (
      route +
      '/' +
      PLUGINS[nextPlugin].onboardingSubRoutes?.find(
        (step) => !finishedOnboardingSteps.includes(step)
      )
    )
  }, [chosenPlugins, finishedOnboardingSteps, finishedPlugins, plugin])

  console.log('nextStep', nextStep)

  return (
    <SafeAreaView>
      <Wrapper style={{ height: windowHeight }} column justify={'space-between'}>
        <OnboardingStepHeader plugin={plugin} />
        {children}
        <Footer>
          <Button
            small
            onPress={
              onPressPrimary ??
              (() => {
                nextStep && navigation?.navigate(nextStep)
              })
            }
            disabled={primaryDisabled || !nextStep}>
            {primaryText}
          </Button>
        </Footer>
      </Wrapper>
    </SafeAreaView>
  )
}

export default OnboardingStep
