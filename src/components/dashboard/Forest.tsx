import React, { Fragment, useMemo } from 'react'
import { Image, Pressable, View } from 'react-native'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import { SectionTitleContainer } from './SharedStyles'

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
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Forest</Heading4>
      </SectionTitleContainer>
      <Wrapper width={width}>
        <AbsoluteImageContainer>
          <StyledImage
            source={require('../../../assets/images/running_full_size.jpg')}
            width={width}
          />
        </AbsoluteImageContainer>
      </Wrapper>
    </Fragment>
  )
}

export default Forest
