import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import React, { useMemo } from 'react'
import { Image, Pressable, View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(Pressable)<{ width: number }>`
  height: 250px;
  width: ${(p) => p.width}px;
  overflow: hidden;
  position: relative;
`

const AbsoluteImageContainer = styled(View)`
  position: absolute;
  height: 100%;
`

const StyledImage = styled(Image)<{ width: number }>`
  width: ${(p) => p.width}px;
  height: 100%;

  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const Forest = () => {
  const { windowWidth } = useWindowDimensions()

  const width = useMemo(() => windowWidth * IO_COMPONENT_WIDTH_PERCENT, [windowWidth])

  return (
    <Wrapper width={width}>
      <AbsoluteImageContainer>
        <StyledImage
          source={require('../../../assets/images/running_full_size.jpg')}
          width={width}
        />
      </AbsoluteImageContainer>
    </Wrapper>
  )
}

export default Forest
