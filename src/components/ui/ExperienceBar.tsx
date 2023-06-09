import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import styled from 'styled-components'
import { clamp } from '../../helpers/clamp'
import {
  COLORS,
  INNER_BORDER_RADIUS,
  OUTER_BORDER_RADIUS,
  SECONDARY_TINTS,
} from '../../theme/theme'
import { Caption } from '../../theme/typography'
import { Flex } from './Flex'

type Size = 'small' | 'medium' | 'large'

const ExperienceBackground = styled(Flex)<{ size: Size }>`
  width: ${(p) => (p.size === 'small' ? 50 : p.size === 'large' ? 100 : 80)}%;
  height: ${(p) => (p.size === 'small' ? 12 : p.size === 'large' ? 14 : 12)}px;
  background: ${COLORS.BLACK};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  border: 2.5px solid ${COLORS.BLACK};
  position: relative;
`

const Experience = styled(LinearGradient)<{ progress: number }>`
  width: ${(p) => clamp(p.progress, 0, 100)}%;
  height: 100%;
  border-radius: ${INNER_BORDER_RADIUS}px;
`

const MaxTag = styled(Caption)<{ size: Size }>`
  margin: 0;
  position: absolute;
  font-size: ${(p) => (p.size === 'small' ? 7 : p.size === 'large' ? 12 : 7)}px;
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
    <Container size={size} row justify={center ? 'center' : 'flex-start'} align={'center'}>
      <ExperienceBackground size={size}>
        <Experience
          progress={max ? 100 : progress}
          colors={
            max
              ? [COLORS.LIGHT_GOLD, COLORS.GOLD]
              : [SECONDARY_TINTS['400'], SECONDARY_TINTS['800']]
          }
          start={[0, 0]}
        />
      </ExperienceBackground>
      {max && (
        <MaxTag center color={COLORS.BLACK} size={size}>
          Max
        </MaxTag>
      )}
    </Container>
  )
}

export default ExperienceBar
