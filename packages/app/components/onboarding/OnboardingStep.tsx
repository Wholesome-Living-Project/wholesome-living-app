import OnboardingStepHeader from 'app/components/onboarding/OnboardingStepHeader'
import Button from 'app/components/ui/Button'
import { Flex } from 'app/components/ui/Flex'
import { PLUGINS, plugins } from 'app/helpers/pluginList'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { COLORS, SPACING } from 'app/theme/theme'
import { useSegments } from 'expo-router'
import React, { PropsWithChildren, useMemo } from 'react'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  padding: ${SPACING * 2}px;
`

const Footer = styled(Flex)`
  padding: ${SPACING * 10}px ${SPACING * 2}px;
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
  nextStep?: string
} & PropsWithChildren

const OnboardingStep = ({
  onPressPrimary,
  onPressSecondary,
  primaryText,
  secondaryText,
  infoText,
  secondaryDisabled,
  nextStep,
  primaryDisabled,
  plugin,
  children,
}: Props) => {
  const { windowHeight } = useWindowDimensions()
  const { chosenPluginSteps } = useOnboarding()

  const navigation = useNavigation()
  const segments = useSegments()

  const currentRoute = useMemo(() => {
    return segments[segments.length - 2] + '/' + segments[segments.length - 1]
  }, [segments])

  const foundNextStep = useMemo(() => {
    const ind = chosenPluginSteps.findIndex((route) => currentRoute === route) + 1
    if (ind < chosenPluginSteps.length) return chosenPluginSteps[ind]
  }, [chosenPluginSteps, currentRoute])

  return (
    <Flex style={{ height: windowHeight }} column justify={'space-between'}>
      <Flex>
        <OnboardingStepHeader plugin={plugin} />
        <Wrapper column>{children}</Wrapper>
      </Flex>
      <Footer>
        <Button
          small
          buttonColor={plugin ? PLUGINS[plugin]?.color : COLORS.PRIMARY}
          onPress={() => {
            onPressPrimary?.()
            nextStep
              ? navigation?.navigate(nextStep)
              : foundNextStep
              ? navigation?.navigate(foundNextStep)
              : navigation?.navigate('root')
          }}
          disabled={primaryDisabled}>
          {primaryText}
        </Button>
      </Footer>
    </Flex>
  )
}

export default OnboardingStep