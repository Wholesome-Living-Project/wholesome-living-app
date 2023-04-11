import Spacer from 'app/components/ui/Spacer'
import BrushSvg from 'app/components/welcome/BrushSvg'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { COLORS } from 'app/theme/theme'
import { Heading1 } from 'app/theme/typography'
import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components'

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
          source={require('../../../assets/images/woman_productive_full_size.png')}
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
