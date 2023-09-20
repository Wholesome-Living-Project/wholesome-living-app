import { alpha } from 'axelra-react-native-utilities'
import { useSegments } from 'expo-router'
import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import { Button as NativeButton, Platform, ScrollView, StatusBar } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import useKeyboard from '../../hooks/useKeyboard'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAuthentication } from '../../provider/AuthenticationProvider'
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
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  padding: ${SPACING * 3}px ${SPACING * 2}px ${SPACING * 5}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
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
  canSkip = false,
  nextStep,
  primaryDisabled,
  plugin,
  children,
}: Props) => {
  const { windowHeight } = useWindowDimensions()
  const { chosenPluginSteps } = useOnboarding()
  const { patchUser } = useAuthentication()

  const navigation = useNavigation()
  const segments = useSegments()

  const currentRoute = useMemo(() => {
    return segments[segments.length - 2] + '/' + segments[segments.length - 1]
  }, [segments])

  const foundNextStep = useMemo(() => {
    const ind = chosenPluginSteps.findIndex((route) => currentRoute === route) + 1
    if (ind < chosenPluginSteps.length) return chosenPluginSteps[ind]
  }, [chosenPluginSteps, currentRoute])

  const { keyboardOpen } = useKeyboard()
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    keyboardOpen && setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }, [keyboardOpen])

  return (
    <Flex
      style={{ height: windowHeight + (StatusBar.currentHeight || 0) }}
      column
      justify={'space-between'}>
      <Flex>
        <OnboardingStepHeader plugin={plugin} />
        <StyledScrollView ref={scrollRef}>
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
        <Spacer x={2} />
        {secondaryText && (
          <Button
            onPress={() => {
              onPressPrimary?.()
              nextStep
                ? navigation?.navigate(nextStep)
                : foundNextStep
                ? navigation?.navigate(foundNextStep)
                : navigation?.navigate('root')
            }}
            buttonType={'secondary'}
            disabled={secondaryDisabled}>
            {secondaryText}
          </Button>
        )}
        <Spacer x={0.5} />
        {canSkip && (
          <NativeButton
            title={'Skip'}
            onPress={async () => {
              if (nextStep) navigation?.navigate(nextStep)
              else if (foundNextStep) navigation?.navigate(foundNextStep)
              else {
                await patchUser({ onboardingDone: true })
                navigation?.navigate('root')
              }
            }}
            color={Platform.OS === 'ios' ? alpha(0.2, COLORS.BLACK) : 'grey'}
          />
        )}
      </Footer>
    </Flex>
  )
}

export default OnboardingStep
