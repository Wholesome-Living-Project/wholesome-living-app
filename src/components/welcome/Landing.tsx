import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Spacer from '../ui/Spacer'

const AbsoluteContainer = styled(View)`
  position: absolute;
  top: 0;
`

const Logo = styled(Image)`
  width: 320px;
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
          source={require('../../../assets/images/meditation_full_size_1.jpg')}
          width={windowWidth}
          height={windowHeight}
        />
      </AbsoluteContainer>
      <Spacer x={15} />
      <TitleWrapper>
        <TitleContainer>
          <Logo source={require('../../../assets/images/logo.png')} resizeMode={'contain'} />
        </TitleContainer>
      </TitleWrapper>
    </>
  )
}

export default Landing
