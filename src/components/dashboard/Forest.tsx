import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { IO_COMPONENT_WIDTH_PERCENT, SPACING } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import { Flex } from '../ui/Flex'
import { Background, levelComponents } from './Levels'
import { SectionTitleContainer } from './SharedStyles'

const Wrapper = styled(Flex)<{ width: number }>`
  height: 250px;
  width: ${(p) => p.width}px;
  overflow: hidden;
  position: relative;
`

const LevelsContainer = styled(Flex)`
  height: 100%;
  padding: ${SPACING * 2}px;
`

const LevelContainer = styled(Flex)<{ width: number }>`
  width: ${(p) => p.width}%;
`

// TODO change with actual plugin levels
const levels = [4, 2, 6]

const Forest = () => {
  const { windowWidth } = useWindowDimensions()

  const width = useMemo(() => windowWidth * IO_COMPONENT_WIDTH_PERCENT, [windowWidth])

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Garden</Heading4>
      </SectionTitleContainer>
      <Wrapper width={width}>
        <Background source={require('../../../assets/images/background_2.jpg')} />
        <LevelsContainer row align={'flex-end'}>
          {levels.map((level, index) => (
            <LevelContainer width={100 / levels.length} justify={'center'} row>
              {levelComponents[level - 1]}
            </LevelContainer>
          ))}
        </LevelsContainer>
      </Wrapper>
    </Fragment>
  )
}

export default Forest
