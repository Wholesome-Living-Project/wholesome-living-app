import { alpha } from 'axelra-react-native-utilities'
import { useSegments } from 'expo-router'
import React, { PropsWithChildren, useMemo } from 'react'
import { Button as NativeButton, ScrollView } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'
import OnboardingStepHeader from './OnboardingStepHeader'

const Wrapper = styled(Flex)`
  padding: ${SPACING * 2}px;
`

const Footer = styled(Flex)`
  padding: 0 ${SPACING * 2}px ${SPACING * 3}px;
  position: absolute;
  bottom: 30px;
  width: 100%;
`

const StyledScrollView = styled(ScrollView)`
  height: 70%;
`

type Props = {
  onPressPrimary?: () => void
  onPressSecondary?: () => void
  primaryText: string
  secondaryText?: string
  infoText?: string
  primaryDisabled?: boolean
  plugin?: SettingsPluginName
  secondaryDisabled?: boolean
  nextStep?: string
  canSkip?: boolean
} & PropsWithChildren

const OnboardingStep = ({
  onPressPrimary,
  onPressSecondary,
  primaryText,
  secondaryText,
  infoText,
  secondaryDisabled,
  canSkip = true,
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
        <StyledScrollView>
          <Wrapper column>{children}</Wrapper>
        </StyledScrollView>
      </Flex>
      <Footer>
        <Button
          buttonColor={plugin ? PLUGINS[plugin]?.color : COLORS.BLACK}
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
        <Spacer x={1} />
        {canSkip && (
          <NativeButton
            title={'Skip'}
            onPress={() => {
              nextStep
                ? navigation?.navigate(nextStep)
                : foundNextStep
                ? navigation?.navigate(foundNextStep)
                : navigation?.navigate('root')
            }}
            color={alpha(0.8, COLORS.BLACK)}
          />
        )}
      </Footer>
    </Flex>
  )
}

export default OnboardingStep
