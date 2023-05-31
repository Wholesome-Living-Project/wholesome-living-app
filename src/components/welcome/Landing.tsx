import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS } from '../../theme/theme'
import { Heading1 } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import BrushSvg from './BrushSvg'

const AbsoluteContainer = styled(View)`
  position: absolute;
  top: 0;
`

const StyledImage = styled(Image)<{ width: number; height: number }>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
`

const TitleContainer = styled(View)`
  position: absolute;
  top: 30%;
`

const TitleWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Landing = () => {
  const { windowWidth, windowHeight } = useWindowDimensions()
  return (
    <>
      <AbsoluteContainer>
        <StyledImage
          source={require('../../../assets/images/woman_productive_full_size.jpg')}
          width={windowWidth}
          height={windowHeight}
        />
      </AbsoluteContainer>
      <Spacer x={15} />
      <TitleWrapper>
        <BrushSvg />
        <TitleContainer>
          <Heading1 color={COLORS.WHITE}>Wholesome Living</Heading1>
        </TitleContainer>
      </TitleWrapper>
    </>
  )
}

export default Landing
