import React from 'react'
import styled from 'styled-components'
import { clamp } from '../../helpers/clamp'
import { COLORS, OUTER_BORDER_RADIUS } from '../../theme/theme'
import { Flex } from './Flex'

type Size = 'small' | 'medium' | 'large'

const ExperienceBackground = styled(Flex)<{ size: Size }>`
  width: ${(p) => (p.size === 'small' ? 50 : p.size === 'large' ? 100 : 80)}%;
  background: ${COLORS.BLACK};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: ${(p) => (p.size === 'small' ? 10 : p.size === 'large' ? 14 : 12)}px;
  border: 3px solid ${COLORS.BLACK};
  position: relative;
`

const Experience = styled(Flex)<{ progress: number }>`
  width: ${(p) => clamp(p.progress, 0, 100)}%;
  height: 100%;
  background: ${COLORS.WHITE};
`

type Props = {
  progress?: number
  size?: Size
}
const ExperienceBar = ({ progress = 0, size = 'medium' }: Props) => {
  return (
    <ExperienceBackground size={size}>
      <Experience progress={progress} />
    </ExperienceBackground>
  )
}

export default ExperienceBar
