import Spacer from 'app/components/ui/Spacer'
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
      <Heading1 color={COLORS.WHITE}>Wholesome Living</Heading1>
    </>
  )
}

export default Landing
