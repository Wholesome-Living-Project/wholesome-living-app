import React from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components'
import { COLORS } from '../../theme/theme'
import { FadeIn } from './FadeIn'

const SplashImage = styled(FadeIn)``

const StyledImage = styled(Animated.Image)`
  width: 100%;
  height: 100%;
  z-index: 1000;
`

export const CustomSplash = () => {
  return (
    <SplashImage duration={300} background={COLORS.WHITE} justify="center" align="center">
      <StyledImage source={require('../../../assets/images/splash.png')} />
    </SplashImage>
  )
}
