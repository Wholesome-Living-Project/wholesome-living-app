import React from 'react'
import styled from 'styled-components'
import { clamp } from '../../helpers/clamp'
import { COLORS, INNER_BORDER_RADIUS, OUTER_BORDER_RADIUS } from '../../theme/theme'
import { Caption } from '../../theme/typography'
import { Flex } from './Flex'

type Size = 'small' | 'medium' | 'large'

const ExperienceBackground = styled(Flex)<{ size: Size }>`
  width: ${(p) => (p.size === 'small' ? 50 : p.size === 'large' ? 100 : 80)}%;
  height: ${(p) => (p.size === 'small' ? 10 : p.size === 'large' ? 14 : 12)}px;
  background: ${COLORS.BLACK};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  border: 3px solid ${COLORS.BLACK};
  position: relative;
`

const Experience = styled(Flex)<{ progress: number }>`
  width: ${(p) => clamp(p.progress, 0, 100)}%;
  height: 100%;
  border-radius: ${INNER_BORDER_RADIUS}px;
  background: ${COLORS.WHITE};
`

const MaxTag = styled(Caption)<{ size: Size }>`
  margin: 0;
  position: absolute;
  font-size: ${(p) => (p.size === 'small' ? 8 : p.size === 'large' ? 12 : 10)}px;
  width: ${(p) => (p.size === 'small' ? 50 : p.size === 'large' ? 100 : 80)}%;
`

const Container = styled(Flex)<{ size: Size }>`
  position: relative;
  width: 100%;
  height: ${(p) => (p.size === 'small' ? 10 : p.size === 'large' ? 14 : 12)}px;
`

type Props = {
  progress?: number
  size?: Size
  max?: boolean
  center?: boolean
}
const ExperienceBar = ({ progress = 0, size = 'medium', max, center }: Props) => {
  return (
    <Container size={size} row justify={center ? 'center' : 'flex-start'}>
      <ExperienceBackground size={size}>
        {!max && <Experience progress={progress} />}
      </ExperienceBackground>
      {max && (
        <MaxTag center color={COLORS.WHITE} size={size}>
          Max
        </MaxTag>
      )}
    </Container>
  )
}

export default ExperienceBar
