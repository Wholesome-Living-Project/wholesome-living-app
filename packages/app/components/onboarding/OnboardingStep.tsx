import Button from 'app/components/ui/Button'
import { Flex } from 'app/components/ui/Flex'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { SPACING } from 'app/theme/theme'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native'
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
  children,
}: Props) => {
  const { windowHeight } = useWindowDimensions()

  return (
    <SafeAreaView>
      <Wrapper style={{ height: windowHeight }} column justify={'space-between'}>
        {children}
        <Footer>
          <Button small onPress={onPressPrimary ?? (() => {})} disabled={primaryDisabled}>
            {primaryText}
          </Button>
        </Footer>
      </Wrapper>
    </SafeAreaView>
  )
}

export default OnboardingStep
